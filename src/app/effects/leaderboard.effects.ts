/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { LeaderboardService } from '../services/leaderboard.service';
import { Observable } from 'rxjs/Observable';
import * as leaderboard from '../actions/leaderboard.actions';

@Injectable()

export class LeaderboardEffects {

  constructor(private actions$: Actions,
              private leaderboardService: LeaderboardService) { }

  @Effect()
  getWeaponType$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_WEAPON_TYPE)
    .map((action: leaderboard.GetWeaponTypeAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.weaponType(payload.type, payload.week)
        .map(result => new leaderboard.WeaponTypeSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
        // .catch((err) => empty());
    });
}