/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { PlayerService } from '../services/player.service';

import * as inventories from '../actions/inventory.actions';
import * as activities from '../actions/activity.actions';
import * as player from '../actions/player.actions';
import * as stats from '../actions/stats.actions';
import {Player} from "../models/player.model";

@Injectable()

export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  @Effect()
  search$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_PLAYER)
    .debounceTime(300)
    .map<[string, string]>(action => action.payload)
    .mergeMap(query => {
      if (query[0] === '') {
        return empty();
      }

      // const nextSearch$ = this.actions$.ofType(player.ActionTypes.SEARCH_PLAYER).skip(1);

      return this.playerService.search(2, query[0])
        // .takeUntil(nextSearch$)
        .map(searched => new player.SearchCompleteAction([searched, query[1]]))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect() account$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_COMPLETE)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload[0]) {
        return empty();
      }

      return this.playerService.account(payload[0].membershipType, payload[0].membershipId)
        .map(searched => new player.SearchAccount([searched, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect()
  activities$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload =>
      this.playerService.activities(payload[0].membershipType, payload[0].membershipId, payload[0].characters[0].characterBase.characterId)
        // .throttleTime(1000)
        .map((res: any) => new activities.ActivityActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

  @Effect()
  inventory$ = this.actions$
    .ofType(player.ActionTypes.SEARCH_ACCOUNT)
    .map<[Player, string]>(action => action.payload)
    .mergeMap(payload =>
      this.playerService.inventory(payload[0].membershipType, payload[0].membershipId, payload[0].characters[0].characterBase.characterId)
        .map((res: any) => new inventories.InventoryActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    );

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
        // .throttleTime(1000)
        .map((res: any) => new stats.BngStatActions([res, payload[1]]))
        .catch((err) => of(new player.SearchFailed(err)))
    );
}
