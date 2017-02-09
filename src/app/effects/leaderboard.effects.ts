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
import {YEAR_ONE_DUPLICATES} from "../services/constants";
import {ItemDefinitions} from "../models/manifest.model";
import {LocalStorageService} from "ng2-webstorage";

@Injectable()

export class LeaderboardEffects {

  itemDefinitions: ItemDefinitions;

  constructor(private actions$: Actions,
              private playerService: PlayerService,
              public storage: LocalStorageService,
              private leaderboardService: LeaderboardService) {
    this.itemDefinitions = this.storage.retrieve('manifestItems');
    this.storage.observe('manifestItems').subscribe(definitions => this.itemDefinitions = definitions);
  }

  @Effect()
  getWeaponType$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_WEAPON_TYPE)
    .map((action: leaderboard.GetWeaponTypeAction) => action.payload)
    .delay(200)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.weaponType(payload.type, payload.week)
        .map(result => new leaderboard.WeaponTypeSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  getMedal$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_MEDAL)
    .map((action: leaderboard.GetMedalAction) => action.payload)
    .delay(200)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.getMedal(payload.medalId, payload.week)
        .map(result => new leaderboard.GetMedalSuccessAction(result))
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
    .ofType(leaderboard.ActionTypes.GET_WEAPON_LIST)
    .map((action: leaderboard.GetWeaponListAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.getWeaponIds(payload.week)
        .map(res => {
          const weapons = res
            .map(id => {
              let definition = this.itemDefinitions[parseInt(id)];
              if (definition) {
                let isDuplicate = YEAR_ONE_DUPLICATES.indexOf(id) > -1;
                return {
                  id: parseInt(id),
                  name: isDuplicate ? definition.n + ' (Year 1)' : definition.n
                }
              }
            });
          return new leaderboard.WeaponListSuccessAction(weapons)
        })
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
