/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import * as leaderboard from "../actions/leaderboard.actions";
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";
import {BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON} from "../services/constants";


export interface State {
  weapons: LBWeaponType[];
  collection: LBWeaponType[];
  primary: LBWeaponPercentage[];
  special: LBWeaponPercentage[];
}

const initialState: State = {
  weapons: [],
  collection: [],
  primary: [],
  special: []
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      const payload: LBWeaponType[] = action.payload;
      return Object.assign({}, state, {
        weapons: payload,
        collection: payload
      });
    }

    case leaderboard.ActionTypes.WEAPON_PERCENTAGE_SUCCESS: {
      const payload: LBWeaponPercentage[] = action.payload;

      const primary: LBWeaponPercentage[] = payload.filter(w => w.bucketTypeHash == BUCKET_PRIMARY_WEAPON);
      const special: LBWeaponPercentage[] = payload.filter(w => w.bucketTypeHash == BUCKET_SPECIAL_WEAPON);

      return Object.assign({}, state, {
        primary: [...primary],
        special: [...special]
      });
    }

    case leaderboard.ActionTypes.FILTER_BY_TIER: {
      const payload:number = action.payload;

      const filtered:any = payload > 0 ? state.collection.filter(c => c.tier === payload) : state.collection;

      return Object.assign({}, state, {
        weapons: [...filtered]
      });
    }

    default: {
      return state;
    }
  }
}

export const getPrimary = (state: State) => state.primary;

export const getSpecial = (state: State) => state.special;
