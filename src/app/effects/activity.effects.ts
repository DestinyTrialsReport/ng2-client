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

@Injectable()

export class ActivityEffects {

  itemDefs: any;

  constructor(private actions$: Actions,
              private playerService: PlayerService,
              public storage: LocalStorageService,
              private store: Store<fromRoot.State>) {
    this.itemDefs = this.storage.retrieve('manifestItems');
  }

  @Effect()
  activities$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload =>
      this.playerService.activities(payload[0].membershipType, payload[0].membershipId, payload[0].characters[0].characterBase.characterId)
        .map((res: any) => new activities.ActivityActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

  @Effect() recentActivity$: Observable<Action> = this.actions$
    .ofType(activities.ActionTypes.SEARCH_ACTIVITY)
    .map<[Activity[], string]>(action => action.payload)
    .mergeMap(payload => {
      if (payload[1] !== 'player1') {
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
            const weaponIds = entry.extended.weapons.map(weapon => weapon.referenceId);
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
