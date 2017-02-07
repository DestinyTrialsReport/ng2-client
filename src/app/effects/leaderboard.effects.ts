/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { LeaderboardService } from '../services/leaderboard.service';
import { Observable } from 'rxjs/Observable';
import * as leaderboard from '../actions/leaderboard.actions';
import * as maps from '../actions/maps.actions';
import {PlayerService} from "../services/player.service";

@Injectable()

export class LeaderboardEffects {

  constructor(private actions$: Actions,
              private playerService: PlayerService,
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
    });

  @Effect()
  getPlayers$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_PLAYERS)
    .map((action: leaderboard.GetPlayersAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.playerWeapons(payload.weaponId, payload.week)
        .map(result => new leaderboard.PlayersSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  searchPlayer$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.SEARCH_PLAYER)
    .map((action: leaderboard.SearchPlayerAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.playerService.search(payload.platform, payload.name)
        .map(result => new leaderboard.SearchPlayerWeaponsAction({membershipId: result.membershipId, week: payload.week}))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  searchPlayerWeapons$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.SEARCH_PLAYER_WEAPONS)
    .map((action: leaderboard.SearchPlayerWeaponsAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.searchPlayer(payload.membershipId, payload.week)
        .map(result => new leaderboard.SearchPlayerSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  getWeaponIds$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_WEAPON_IDS)
    .map((action: leaderboard.GetWeaponIdsAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.getWeaponIds(payload)
        .map(result => new leaderboard.WeaponIdsSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  weaponPercentage$: Observable<Action> = this.actions$
    .ofType(maps.ActionTypes.SEARCH_COMPLETE)
    .map((action: maps.SearchCompleteAction) => action.payload)
    .delay(200)
    .switchMap(payload => {
      if (!payload) {
        return Observable.from([]);
      }

      return this.leaderboardService.weaponPercentage(payload)
        .map(result => new leaderboard.WeaponPercentageSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });
}
