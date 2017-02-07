/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import * as leaderboard from "../actions/leaderboard.actions";
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";
import {BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON} from "../services/constants";


export interface State {
  searchedPlayer: string;
  weapons: LBWeaponType[];
  collection: LBWeaponType[];
  primary: LBWeaponPercentage[];
  special: LBWeaponPercentage[];
  players: any[];
  playerWeapons: any[];
  weaponIds: string[];
  currentPage: number;
}

const initialState: State = {
  searchedPlayer: null,
  weapons: [],
  collection: [],
  primary: [],
  special: [],
  players: [],
  playerWeapons: [],
  weaponIds: [],
  currentPage: 1,
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      const payload: LBWeaponType[] = action.payload;
      return Object.assign({}, state, {
        weapons: payload,
        collection: payload,
        currentPage: 1,
        playerWeapons: []
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

    case leaderboard.ActionTypes.WEAPON_IDS_SUCCESS: {
      const payload: string[] = action.payload;

      return Object.assign({}, state, {
        weaponIds: [...payload]
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER: {
      const payload: any = action.payload;

      return Object.assign({}, state, {
        searchedPlayer: payload.name,
        playerWeapons: []
      });
    }

    case leaderboard.ActionTypes.CHANGE_PAGE: {
      const payload: number = action.payload;

      return Object.assign({}, state, {
        currentPage: payload
      });
    }

    case leaderboard.ActionTypes.PLAYERS_SUCCESS: {
      const payload:any[] = action.payload;

      return Object.assign({}, state, {
        players: [...payload],
        playerWeapons: []
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER_SUCCESS: {
      const payload:any[] = action.payload;

      return Object.assign({}, state, {
        playerWeapons: [...payload]
      });
    }

    case leaderboard.ActionTypes.FILTER_BY_TIER: {
      const payload:number = action.payload;

      const filtered:any = payload > 0 ? state.collection.filter(c => c.tier === payload) : state.collection;

      return Object.assign({}, state, {
        weapons: [...filtered],
        currentPage: 1,
        playerWeapons: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getPrimary = (state: State) => state.primary;

export const getSpecial = (state: State) => state.special;

export const getWeaponIds = (state: State) => state.weaponIds;

export const getPlayers = (state: State) => state.players;

export const getSearchedPlayer = (state: State) => state.searchedPlayer;

export const getPlayerWeapons = (state: State) => state.playerWeapons;

export const getCurrentPage = (state: State) => state.currentPage;
