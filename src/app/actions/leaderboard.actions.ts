/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";
import { type }       from '../util';

export const ActionTypes = {
  GET_WEAPON_TYPE:            type('[Leaderboard] Get Weapon Type'),
  FILTER_BY_TIER:             type('[Leaderboard] Filter By Tier'),
  GET_PLAYERS:                type('[Leaderboard] Get Players'),
  SEARCH_PLAYER:              type('[Leaderboard] Search Player'),
  SEARCH_PLAYER_WEAPONS:      type('[Leaderboard] Search Player Weapons'),
  CHANGE_PAGE:                type('[Leaderboard] Change Page'),
  GET_WEAPON_IDS:             type('[Leaderboard] Get Weapon Ids'),
  PLAYERS_SUCCESS:            type('[Leaderboard] Players Successful'),
  SEARCH_PLAYER_SUCCESS:      type('[Leaderboard] Search Player Successful'),
  WEAPON_IDS_SUCCESS:         type('[Leaderboard] Weapon Ids Successful'),
  WEAPON_TYPE_SUCCESS:        type('[Leaderboard] Weapon Type Successful'),
  WEAPON_PERCENTAGE_SUCCESS:  type('[Leaderboard] Weapon Percentage Successful'),
  REQUEST_FAILED:             type('[Leaderboard] Request Failed'),
};

export class GetWeaponTypeAction implements Action {
  type = ActionTypes.GET_WEAPON_TYPE;

  constructor(public payload: {type: string, week: number}) { }
}

export class GetWeaponIdsAction implements Action {
  type = ActionTypes.GET_WEAPON_IDS;

  constructor(public payload: number) { }
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

  constructor(public payload: {weaponId: string, week: number}) { }
}

export class ChangePageAction implements Action {
  type = ActionTypes.CHANGE_PAGE;

  constructor(public payload: number) { }
}

export class FilterByTierAction implements Action {
  type = ActionTypes.FILTER_BY_TIER;

  constructor(public payload: number) { }
}

export class PlayersSuccessAction implements Action {
  type = ActionTypes.PLAYERS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class SearchPlayerSuccessAction implements Action {
  type = ActionTypes.SEARCH_PLAYER_SUCCESS;

  constructor(public payload: any[]) { }
}

export class WeaponTypeSuccessAction implements Action {
  type = ActionTypes.WEAPON_TYPE_SUCCESS;

  constructor(public payload: LBWeaponType[]) { }
}

export class WeaponIdsSuccessAction implements Action {
  type = ActionTypes.WEAPON_IDS_SUCCESS;

  constructor(public payload: string[]) { }
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
  | GetWeaponIdsAction
  | GetPlayersAction
  | SearchPlayerWeaponsAction
  | SearchPlayerAction
  | ChangePageAction
  | SearchPlayerSuccessAction
  | PlayersSuccessAction
  | WeaponIdsSuccessAction
  | FilterByTierAction
  | LeaderboardRequestFailedAction
  | WeaponTypeSuccessAction
  | WeaponPercentageSuccessAction;
