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
import {PGCR} from "../models/pgcr.model";
import {Action} from "@ngrx/store";

@Injectable()

export class ActivityEffects {

  constructor(private actions$: Actions,
              private playerService: PlayerService) { }

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
    .map<string[]>(action => action.payload)
    .mergeMap(payload => {
      let matches = [];

      payload.forEach(match => {
        matches.push(
          this.playerService.pgcr(match)
          .catch((err) => of(new player.SearchFailed(err)))
        );
      });
      return Observable.forkJoin( matches )
        .map((res: PGCR[]) => new pgcr.StorePGCR(res))
    });

}
