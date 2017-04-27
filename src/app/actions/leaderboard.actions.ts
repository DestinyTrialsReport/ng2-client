/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";
import { type }       from '../util';
import {ItemDefinitions, ItemDefinition} from "../models/manifest.model";

export const ActionTypes = {
  GET_WEAPON_TYPE:            type('[Leaderboard] Get Weapon Type'),
  GET_SELECTED_TYPE:          type('[Leaderboard] Get Selected Type'),
  UPDATE_FILTER:              type('[Leaderboard] update Filter'),
  GET_PLAYERS:                type('[Leaderboard] Get Players'),
  SEARCH_PLAYER:              type('[Leaderboard] Search Player'),
  SEARCH_PLAYER_WEAPONS:      type('[Leaderboard] Search Player Weapons'),
  CHANGE_PAGE:                type('[Leaderboard] Change Page'),
  GET_MEDAL:                  type('[Leaderboard] Get Medal'),
  SET_LEADERBOARD_TYPE:       type('[Leaderboard] Set Leaderboard Type'),
  GET_MEDAL_SUCCESS:          type('[Leaderboard] Get Medal Success'),
  GET_WEAPON_LIST:            type('[Leaderboard] Get Weapon List'),
  PLAYERS_SUCCESS:            type('[Leaderboard] Players Successful'),
  SEARCH_PLAYER_SUCCESS:      type('[Leaderboard] Search Player Successful'),
  WEAPON_LIST_SUCCESS:        type('[Leaderboard] Weapon List Successful'),
  WEAPON_TYPE_SUCCESS:        type('[Leaderboard] Weapon Type Successful'),
  WEAPON_PERCENTAGE_SUCCESS:  type('[Leaderboard] Weapon Percentage Successful'),
  REQUEST_FAILED:             type('[Leaderboard] Request Failed'),
};

export class GetMedalAction implements Action {
  type = ActionTypes.GET_MEDAL;

  constructor(public payload: {type: number | string, week: number}) { }
}

export class GetSelectedTypeAction implements Action {
  type = ActionTypes.GET_SELECTED_TYPE;

  constructor(public payload: {type?: any, leaderboard: string, week: number, gamertag?: string, platform?: string, tier?: any}) { }
}

export class GetWeaponTypeAction implements Action {
  type = ActionTypes.GET_WEAPON_TYPE;

  constructor(public payload: any) { }
}

export class GetWeaponListAction implements Action {
  type = ActionTypes.GET_WEAPON_LIST;

  constructor(public payload: {type?: string, week: number}) { }
}

export class SearchPlayerAction implements Action {
  type = ActionTypes.SEARCH_PLAYER;

  constructor(public payload: {name: string, platform: number, week: number}) { }
}

export class SearchPlayerWeaponsAction implements Action {
  type = ActionTypes.SEARCH_PLAYER_WEAPONS;

  constructor(public payload: {membershipId: string, week: number}) { }
}

export class GetPlayersAction implements Action {
  type = ActionTypes.GET_PLAYERS;

  constructor(public payload: {type: string, definition?: any, week: number}) { }
}

export class SetLeaderboardAction implements Action {
  type = ActionTypes.SET_LEADERBOARD_TYPE;

  constructor(public payload: {type: string, selected?: string, week: number, gamertag?: string, platform?: string, tier?: any}) { }
}

export class ChangePageAction implements Action {
  type = ActionTypes.CHANGE_PAGE;

  constructor(public payload: number) { }
}

export class UpdateFilterAction implements Action {
  type = ActionTypes.UPDATE_FILTER;

  constructor(public payload: {tier?: number, type?: string, platform?: number, map?: string}) { }
}

export class PlayersSuccessAction implements Action {
  type = ActionTypes.PLAYERS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class SearchPlayerSuccessAction implements Action {
  type = ActionTypes.SEARCH_PLAYER_SUCCESS;

  constructor(public payload: {allKills: Array<any>, medals: Array<any>, weapons: Array<any>}) { }
}

export class WeaponTypeSuccessAction implements Action {
  type = ActionTypes.WEAPON_TYPE_SUCCESS;

  constructor(public payload: LBWeaponType[]) { }
}

export class GetMedalSuccessAction implements Action {
  type = ActionTypes.GET_MEDAL_SUCCESS;

  constructor(public payload: any) { }
}

export class WeaponListSuccessAction implements Action {
  type = ActionTypes.WEAPON_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class WeaponPercentageSuccessAction implements Action {
  type = ActionTypes.WEAPON_PERCENTAGE_SUCCESS;

  constructor(public payload: LBWeaponPercentage[]) { }
}

export class LeaderboardRequestFailedAction implements Action {
  type = ActionTypes.REQUEST_FAILED;

  constructor(public payload: any) { }
}

export type Actions
  = GetWeaponTypeAction
  | GetSelectedTypeAction
  | GetWeaponListAction
  | GetMedalAction
  | GetPlayersAction
  | SetLeaderboardAction
  | SearchPlayerWeaponsAction
  | SearchPlayerAction
  | ChangePageAction
  | SearchPlayerSuccessAction
  | PlayersSuccessAction
  | WeaponListSuccessAction
  | GetMedalSuccessAction
  | UpdateFilterAction
  | LeaderboardRequestFailedAction
  | WeaponTypeSuccessAction
  | WeaponPercentageSuccessAction;
