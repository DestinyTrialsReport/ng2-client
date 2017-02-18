/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { LeaderboardService } from '../services/leaderboard.service';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from "../services/player.service";
import { YEAR_ONE_DUPLICATES } from "../services/constants";
import { ItemDefinitions } from "../models/manifest.model";
import { LocalStorageService } from "ng2-webstorage";

import * as leaderboard from '../actions/leaderboard.actions';
import * as maps from '../actions/maps.actions';

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
  setLeaderboard$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.SET_LEADERBOARD_TYPE)
    .map((action: leaderboard.SetLeaderboardAction) => action.payload)
    .switchMap(payload => of(
      new leaderboard.GetSelectedTypeAction({
        leaderboard: payload.type,
        type: payload.selected,
        week: payload.week,
        tier: payload.tier
      })
    ));

  @Effect()
  getSelectedType$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_SELECTED_TYPE)
    .map((action: leaderboard.GetSelectedTypeAction) => action.payload)
    .switchMap(payload => {
      let type = payload.type;
      let tier;
      if (!type) {type = "All"}
      if (tier) {tier = {tier: payload.tier}}
      if (payload) {
        switch (payload.leaderboard) {
          case 'medals': {
            if (!type || type == "All") {
              type = 1;
            }
            return of(new leaderboard.GetMedalAction({type: type, week: payload.week}));
          }
          case 'players': {
            let actionParams = {type: type, week: payload.week};
            let definition = this.itemDefinitions[parseInt(type)];
            if (definition) {
              return of(new leaderboard.GetPlayersAction(Object.assign({}, actionParams, {definition: definition}, tier)));
            } else {
              return of(new leaderboard.GetPlayersAction(Object.assign({}, actionParams, tier)));
            }
          }
          case 'searched': {
            return empty();
          }
          default: {
            let actionParams = {type: type, week: payload.week};
            return of(new leaderboard.GetWeaponTypeAction(Object.assign({}, actionParams, tier)));
          }
        }
      } else {
        return empty();
      }
    });

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
  getMedal$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_MEDAL)
    .map((action: leaderboard.GetMedalAction) => action.payload)
    .mergeMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.getMedal(payload.type, payload.week)
        .map(result => new leaderboard.GetMedalSuccessAction(result))
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  @Effect()
  getPlayers$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.GET_PLAYERS)
    .map((action: leaderboard.GetPlayersAction) => action.payload)
    .mergeMap(payload => {
      if (!payload.type) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      } else if (!payload.definition) {
        return this.leaderboardService.playerWeaponTypes(payload.type, payload.week)
          .map(result => new leaderboard.PlayersSuccessAction(result))
          .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
      } else {
        return this.leaderboardService.playerWeapons(payload.type, payload.week)
          .map(result => new leaderboard.PlayersSuccessAction(result))
          .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
      }
    });

  @Effect()
  searchPlayer$: Observable<Action> = this.actions$
    .ofType(leaderboard.ActionTypes.SEARCH_PLAYER)
    .map((action: leaderboard.SearchPlayerAction) => action.payload)
    .mergeMap(payload => {
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
    .mergeMap(payload => {
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
    .mergeMap(payload => {
      if (!payload) {
        return of(new leaderboard.LeaderboardRequestFailedAction(''));
      }

      return this.leaderboardService.getWeaponIds(payload.week)
        .map(res => {
          const weapons = res
            .map(weapon => {
              let definition = this.itemDefinitions[parseInt(weapon.itemHash)];
              if (definition) {
                let isDuplicate = YEAR_ONE_DUPLICATES.indexOf(weapon.itemHash) > -1;
                return {
                  id: parseInt(weapon.itemHash),
                  name: isDuplicate ? definition.n + ' (Year 1)' : definition.n,
                  itemType: weapon.itemTypeName
                }
              }
            });
          return new leaderboard.WeaponListSuccessAction(weapons)
        })
        .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
    });

  // @Effect()
  // weaponPercentage$: Observable<Action> = this.actions$
  //   .ofType(maps.ActionTypes.SEARCH_COMPLETE)
  //   .map((action: maps.SearchCompleteAction) => action.payload)
  //   .switchMap(payload => {
  //     if (!payload) {
  //       return Observable.from([]);
  //     }
  //
  //     return this.leaderboardService.weaponPercentage(payload)
  //       .map(result => new leaderboard.WeaponPercentageSuccessAction(result))
  //       .catch((err) => of(new leaderboard.LeaderboardRequestFailedAction(err)));
  //   });
}
