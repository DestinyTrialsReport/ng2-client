/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { PlayerService } from '../services/player.service';

import { Player } from "../models/player.model";
import { Activity } from "../models/activity.model";
import * as activities from '../actions/activity.actions';
import * as player from '../actions/player.actions';
import * as pgcr from '../actions/pgcr.actions';
import {Observable} from "rxjs";
import {PGCR, Entry} from "../models/pgcr.model";
import {Action, Store} from "@ngrx/store";
import * as fromRoot      from '../reducers';
import {LocalStorageService} from "ng2-webstorage";
import {ItemDefinitions} from "../models/manifest.model";

@Injectable()

export class ActivityEffects {

  itemDefs: ItemDefinitions;

  constructor(private actions$: Actions,
              private playerService: PlayerService,
              public storage: LocalStorageService,
              private store: Store<fromRoot.State>) {
    this.itemDefs = this.storage.retrieve('manifestItems');
    this.storage.observe('manifestItems').subscribe(manifestItems => this.itemDefs = manifestItems);
  }

  @Effect()
  activities$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map<[Player, string]>(action => action.payload)
    .withLatestFrom(this.store.let(fromRoot.getPlayerState))
    .map(([payload, state]) => {
      return {
        character: payload[0],
        player: state[payload[1]] ? state[payload[1]] : state['player1'],
        playerIndex: payload[1]
      }
    })
    .mergeMap(payload =>
      this.playerService.activities(payload.player.membershipType, payload.player.membershipId, payload.character.characterBase.characterId)
        .map((res: any) => new activities.ActivityActions([res, payload.playerIndex]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

  @Effect() recentActivity$: Observable<Action> = this.actions$
    .ofType(activities.ActionTypes.SEARCH_ACTIVITY)
    .map<[Activity[], string]>(action => action.payload)
    .withLatestFrom(this.store.let(fromRoot.getMyPlayerState))
    .map(([payload, state]) => {
      return {
        name: payload[1],
        myReport: state.loaded
      }
    })
    .mergeMap(payload => {
      if (payload.name !== 'player1' || payload.myReport) {
        return Observable.from([]);
      }
      return of(new player.SearchTeammates());
    });


  @Effect()
  searchPGCR$: Observable<Action> = this.actions$
    .ofType(pgcr.ActionTypes.SEARCH_PGCR)
    .map((action: pgcr.SearchPGCR) => action.payload)
    .withLatestFrom(this.store.let(fromRoot.getPlayerState))
    .map(([payload, state]) => {
      return {
        payload: payload,
        player: state[payload.player]
      }
    })
    .mergeMap(response =>
        this.playerService.pgcr(response.payload.match.instanceId)
          .map((res: PGCR) => {
            const entry: Entry = res.entries.filter(entry => entry.characterId === response.player.characterBase.characterId).shift();
            const weaponIds = entry.extended.weapons ? entry.extended.weapons.map(weapon => weapon.referenceId) : [0];
            return new pgcr.StorePGCR({
              teams: res.teams,
              match: response.payload.match,
              entry: entry,
              player: response.payload.player,
              definitions: weaponIds.reduce((weaponDefinitions, weaponId) => Object.assign(weaponDefinitions, {[weaponId]: this.itemDefs[weaponId]}), {})
            })
          })
          .catch((err) => of(new player.SearchFailed(err)))
      );

}
