/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { PlayerService } from '../services/player.service';

import * as stats from '../actions/stats.actions';
import * as player from '../actions/player.actions';
import {DTRStats, GGGStats} from "../models/stats.model";

@Injectable()

export class StatsEffects {

  constructor(private actions$: Actions,
              private playerService: PlayerService) {}

  @Effect()
  stats$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE_PLAYER1)
    .map((action: player.SearchPlayer1CompleteAction) => action.payload)
    .switchMap((payload: any) => {
      let trialsReport$ = this.playerService.dtrStats(payload.membershipId);
      let guardianGG$ = this.playerService.gggStats(payload.membershipId);
      return Observable.forkJoin(trialsReport$, guardianGG$);
    })
    .mergeMap((results: [DTRStats, GGGStats]) => {

      return of(new stats.StatsPlayer1SuccessAction(results));
    });

  @Effect()
  stats2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER2)
    .map((action: player.AccountPlayer2Success) => action.payload)
    .switchMap((payload: any) => {
      let trialsReport$ = this.playerService.dtrStats(payload.membershipId);
      let guardianGG$ = this.playerService.gggStats(payload.membershipId);
      return Observable.forkJoin(trialsReport$, guardianGG$);
    })
    .mergeMap((results: [DTRStats, GGGStats]) => {

      return of(new stats.StatsPlayer2SuccessAction(results));
    });

  @Effect()
  stats3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER3)
    .map((action: player.AccountPlayer3Success) => action.payload)
    .switchMap((payload: any) => {
      let trialsReport$ = this.playerService.dtrStats(payload.membershipId);
      let guardianGG$ = this.playerService.gggStats(payload.membershipId);
      return Observable.forkJoin(trialsReport$, guardianGG$);
    })
    .mergeMap((results: [DTRStats, GGGStats]) => {

      return of(new stats.StatsPlayer3SuccessAction(results));
    });

  @Effect()
  bngStats$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER1)
    .map((action: player.AccountPlayer1Success) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
        return empty();
      }

      return this.playerService.bngStats(payload.membershipType, payload.membershipId, payload.characters[0].characterBase.characterId)
        .map((res: any) => new stats.BngStatPlayer1SuccessActions(res))
        .catch((err) => of(new stats.BngStatFailedActions(err)))
    });

  @Effect()
  bngStats2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER2)
    .map((action: player.AccountPlayer2Success) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
        return empty();
      }

      return this.playerService.bngStats(payload.membershipType, payload.membershipId, payload.characters[0].characterBase.characterId)
        .map((res: any) => new stats.BngStatPlayer2SuccessActions(res))
        .catch((err) => of(new stats.BngStatFailedActions(err)))
    });

  @Effect()
  bngStats3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER3)
    .map((action: player.AccountPlayer3Success) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
        return empty();
      }

      return this.playerService.bngStats(payload.membershipType, payload.membershipId, payload.characters[0].characterBase.characterId)
        .map((res: any) => new stats.BngStatPlayer3SuccessActions(res))
        .catch((err) => of(new stats.BngStatFailedActions(err)))
    });

  @Effect() recentActivity$: Observable<Action> = this.actions$
    .ofType(stats.ActionTypes.STATS_PLAYER1_SUCCESS)
    .map((action: stats.StatsPlayer1SuccessAction) => action.payload)

    .mergeMap(payload => {
      const trialsReport = payload[0];
      return [
        new player.SearchPlayer1Account({
          membershipType: trialsReport.membershipType,
          membershipId: trialsReport.membershipId,
          displayName: trialsReport.displayName
        }),
        new player.SearchPlayer2Account({
          membershipType: trialsReport.recentTeammates[0].membershipType,
          membershipId: trialsReport.recentTeammates[0].membershipId,
          displayName: trialsReport.recentTeammates[0].displayName
        }),
        new player.SearchPlayer3Account({
          membershipType: trialsReport.recentTeammates[1].membershipType,
          membershipId: trialsReport.recentTeammates[1].membershipId,
          displayName: trialsReport.recentTeammates[1].displayName
        })
      ]
    });
}
