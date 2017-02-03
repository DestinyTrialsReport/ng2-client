/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';
import { LBWeaponType } from "../models/leaderboard.model";
import { type }       from '../util';

export const ActionTypes = {
  GET_WEAPON_TYPE:      type('[Leaderboard] Get Weapon Type'),
  FILTER_BY_TIER:       type('[Leaderboard] Filter By Tier'),
  WEAPON_TYPE_SUCCESS:  type('[Leaderboard] Weapon Type Successful'),
  REQUEST_FAILED:       type('[Leaderboard] Request Failed'),
};

export class GetWeaponTypeAction implements Action {
  type = ActionTypes.GET_WEAPON_TYPE;

  constructor(public payload: {type: string, week: number}) { }
}

export class FilterByTierAction implements Action {
  type = ActionTypes.FILTER_BY_TIER;

  constructor(public payload: number) { }
}

export class WeaponTypeSuccessAction implements Action {
  type = ActionTypes.WEAPON_TYPE_SUCCESS;

  constructor(public payload: LBWeaponType[]) { }
}

export class LeaderboardRequestFailedAction implements Action {
  type = ActionTypes.REQUEST_FAILED;

  constructor(public payload: any) { }
}

export type Actions
  = GetWeaponTypeAction
  | FilterByTierAction
  | LeaderboardRequestFailedAction
  | WeaponTypeSuccessAction;
