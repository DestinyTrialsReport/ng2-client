/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { PlayerService } from '../services/player.service';

import { Player } from "../models/player.model";
import * as player from '../actions/player.actions';
import * as myPlayer from '../actions/my-player.actions';
import * as stats from '../actions/stats.actions';
import * as fromRoot      from '../reducers';
import { empty } from 'rxjs/observable/empty';

@Injectable()

export class StatsEffects {

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>,
              private playerService: PlayerService) {}

  @Effect()
  dtrStats$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE || myPlayer.ActionTypes.SEARCH_MY_COMPLETE)
    .map((action: player.SearchCompleteAction) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return Observable.from([]);
      }

      return this.playerService.dtrStats(payload[0].membershipId)
        .map((res: any) => new stats.DtrStatActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    });

  @Effect()
  gggStats$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE || myPlayer.ActionTypes.SEARCH_MY_COMPLETE)
    .map((action: player.SearchCompleteAction) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return empty();
      }

      return this.playerService.gggStats(payload[0].membershipId)
        .map((res: any) => new stats.GggStatActions([res, payload[1], payload[0].membershipId]))
        .catch((err) => of(new player.SearchFailed(err)))
    });

  @Effect()
  bngStats$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map((action: player.SearchAccount) => action.payload)
    .withLatestFrom(this.store.select(fromRoot.getPlayerState))
    .map(([payload, state]) => {
      return {
        character: payload[0],
        player: state[payload[1]] ? state[payload[1]] : state['player1'],
        playerIndex: payload[1]
      }
    })
    .mergeMap(payload =>
      this.playerService.bngStats(payload.player.membershipType, payload.player.membershipId, payload.character.characterBase.characterId)
        .map((res: any) => new stats.BngStatActions([res, payload.playerIndex]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

}
