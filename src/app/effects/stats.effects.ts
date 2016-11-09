/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { PlayerService } from '../services/player.service';

import { Player } from "../models/player.model";
import * as player from '../actions/player.actions';
import * as stats from '../actions/stats.actions';

@Injectable()

export class StatsEffects {

  constructor(private actions$: Actions,
              private playerService: PlayerService) {}

  @Effect()
  dtrStats$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return empty();
      }

      return this.playerService.dtrStats(payload[0].membershipId)
        .map((res: any) => new stats.DtrStatActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    });

  @Effect()
  gggStats$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return empty();
      }

      return this.playerService.gggStats(payload[0].membershipId)
        .map((res: any) => new stats.GggStatActions([res, payload[1], payload[0].membershipId]))
        .catch((err) => of(new player.SearchFailed(err)))
    });

  @Effect()
  bngStats$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload =>
      this.playerService.bngStats(payload[0].membershipType, payload[0].membershipId, payload[0].characters[0].characterBase.characterId)
        .map((res: any) => new stats.BngStatActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

}