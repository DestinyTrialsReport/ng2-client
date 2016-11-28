/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from "ng2-webstorage";
import { PlayerService } from '../services/player.service';

import { Player } from "../models/player.model";
import { ItemDefinitions, TalentDefinitions, StepsDefinitions } from "../models/manifest.model";

import * as inventories from '../actions/inventory.actions';
import * as player from '../actions/player.actions';
import * as fromRoot      from '../reducers';

@Injectable()

export class PlayerEffects {

  itemDefs: ItemDefinitions;
  talentDefs: TalentDefinitions;
  stepsDefs: StepsDefinitions;

  constructor(private actions$: Actions,
              private playerService: PlayerService,
              public storage: LocalStorageService,
              private store: Store<fromRoot.State>) {
    this.itemDefs = this.storage.retrieve('manifestItems');
    this.talentDefs = this.storage.retrieve('manifestTalents');
    this.stepsDefs = this.storage.retrieve('manifestSteps');
    this.storage.observe('manifestItems').subscribe(definitions => this.itemDefs = definitions);
    this.storage.observe('manifestTalents').subscribe(definitions => this.talentDefs = definitions);
    this.storage.observe('manifestSteps').subscribe(definitions => this.stepsDefs = definitions);
  }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_PLAYER)
    .debounceTime(300)
    .map((action: player.SearchPlayer) => action.payload)
    .mergeMap(query => {
      if (query[1] === '') {
        return Observable.from([]);
      }

      return this.playerService.search(query[0], query[1])
        .map(searched => new player.SearchCompleteAction([searched, query[2]]))
        .catch(() => of(new player.SearchFailed(new Error('error'))));
    });

  @Effect()
  account$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return Observable.from([]);
      }

      return this.playerService.account(payload[0].membershipType, payload[0].membershipId)
        .map(searched => new player.SearchAccount([searched, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect()
  teammates$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_TEAMMATES)
    .withLatestFrom(this.store)
    .map(([, store]) => {
      return {
        membershipId: store.players.player1.membershipId,
        activity: store.activities.player1[0]
      }
    })
    .mergeMap(payload => {

      return this.playerService.pgcr(payload.activity.activityDetails.instanceId)
        .map((res: any) => {
          const teammates:Player[] = res.entries
              .filter(entry => entry.values.team.basic.value === payload.activity.values.team.basic.value && entry.player.destinyUserInfo.membershipId != payload.membershipId)
              .map(entry => entry.player.destinyUserInfo);

          this.store.dispatch(new player.SearchCompleteAction([teammates[0], 'player2']));
          return IntervalObservable.create(1000)
            .take(1)
            .subscribe(() => {
              this.store.dispatch(new player.SearchCompleteAction([teammates[1], `player3`]));
              // this.store.dispatch(new pgcr.SearchPGCR([res]));
            });
          }
        )
        .catch((err) => of(new player.SearchFailed(err)))
    });

  @Effect()
  inventory$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map((action: inventories.InventoryActions) => action.payload)
    .mergeMap(payload =>
      this.playerService.inventory(payload[0].membershipType, payload[0].membershipId, payload[0].characters[0].characterBase.characterId)
        .map((res: any) => {
          const weapons = res.map(weapon => weapon.items[0]);
          const weaponIds = weapons.map(weapon => weapon.itemHash);
          const talentIds = weapons.map(weapon => weapon.talentGridHash);
          return new inventories.InventoryActions({
            inventory: res,
            player: payload[1],
            itemDefs: weaponIds.reduce((definitions, id) => Object.assign(definitions, {[id]: this.itemDefs[id]}), {}),
            talentDefs: talentIds.reduce((definitions, id) => Object.assign(definitions, {[id]: this.talentDefs[id]}), {}),
            stepsDefs: this.stepsDefs
          })
        })
        .catch((err) => of(new player.SearchFailed(err)))
    );
}
