/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import * as leaderboard from "../actions/leaderboard.actions";
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";
import {BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON, MEDALS_REF} from "../services/constants";


export interface State {
  searchedPlayer: string;
  leaderboardType: string;
  selectedWeaponType: string;
  selectedWeaponTier: number;
  selectedMedal: number;
  selectedWeaponId: number;
  weapons: LBWeaponType[];
  collection: LBWeaponType[];
  primary: LBWeaponPercentage[];
  special: LBWeaponPercentage[];
  players: any[];
  playerWeapons: any[];
  medals: any[];
  weaponList: Array<{id: number, name: string}>;
  currentPage: number;
  loading: boolean;
  error: boolean;
  queryParams: {
    [id:string]: string
  }
}

const initialState: State = {
  searchedPlayer: null,
  leaderboardType: 'weapon-types',
  selectedMedal: 1,
  selectedWeaponType: 'All',
  selectedWeaponTier: 0,
  selectedWeaponId: null,
  weapons: [],
  collection: [],
  primary: [],
  special: [],
  players: [],
  playerWeapons: [],
  medals: [],
  weaponList: [],
  currentPage: 1,
  loading: false,
  error: false,
  queryParams: null,
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.GET_PLAYERS:
    case leaderboard.ActionTypes.GET_MEDAL:
    case leaderboard.ActionTypes.GET_WEAPON_LIST:
    case leaderboard.ActionTypes.GET_WEAPON_TYPE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        selectedWeaponId: payload.weaponId || state.selectedWeaponId,
        selectedMedal: payload.medalId || state.selectedMedal,
        selectedWeaponType: payload.type || state.selectedWeaponType,
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.SET_LEADERBOARD_TYPE: {
      const payload: any = action.payload;
      return Object.assign({}, state, {
        leaderboardType: payload.type,
        queryParams: null,
      });
    }

    case leaderboard.ActionTypes.REQUEST_FAILED: {
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    }

    case leaderboard.ActionTypes.GET_MEDAL_SUCCESS: {
      const payload: any = action.payload;
      const medalName = state.selectedMedal === 1 ? null : MEDALS_REF
        .filter(medal => medal.id == state.selectedMedal)
        .map(medal => medal.statId);
      const currentPage = state.currentPage > 1 ? state.currentPage : null;

      return Object.assign({}, state, {
        medals: payload,
        weapons: [],
        playerWeapons: [],
        players: [],
        loading: false,
        error: false,
        leaderboardType: 'medals',
        queryParams: Object.assign({}, {
          medalName: medalName,
          page: currentPage
        })
      });
    }

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      const payload: LBWeaponType[] = action.payload;
      const weaponType = state.selectedWeaponType === 'All' ? null : state.selectedWeaponType;
      const weaponTier = state.selectedWeaponTier === 0 ? null : state.selectedWeaponTier;
      const currentPage = state.currentPage > 1 ? state.currentPage : null;

      return Object.assign({}, state, {
        weapons: payload,
        collection: payload,
        playerWeapons: [],
        players: [],
        medals: [],
        loading: false,
        error: false,
        leaderboardType: 'weapon-types',
        queryParams: Object.assign({}, {
          weaponType: weaponType,
          weaponTier: weaponTier,
          page: currentPage,
        })
      });
    }

    case leaderboard.ActionTypes.FILTER_BY_TIER: {
      const payload:number = action.payload;
      const filtered:any = (payload > 0 && payload < 7) ? state.collection.filter(c => c.tier === payload) : state.collection;
      const weaponType = state.selectedWeaponType === 'All' ? null : state.selectedWeaponType;
      const currentPage = state.currentPage > 1 ? state.currentPage : null;

      return Object.assign({}, state, {
        selectedWeaponTier: payload,
        weapons: [...filtered],
        playerWeapons: [],
        leaderboardType: 'weapon-types',
        queryParams: Object.assign({}, {
          weaponType: weaponType,
          weaponTier: payload,
          page: currentPage,
        })
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

    case leaderboard.ActionTypes.WEAPON_LIST_SUCCESS: {
      const payload = action.payload;

      return Object.assign({}, state, {
        weaponList: [...payload],
        loading: false,
        error: false
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER: {
      const payload: any = action.payload;

      return Object.assign({}, state, {
        searchedPlayer: payload.name,
        playerWeapons: [],
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.CHANGE_PAGE: {
      const payload: number = action.payload;
      const currentPage = payload > 1 ? payload : null;

      return Object.assign({}, state, {
        currentPage: payload,
        queryParams: Object.assign({}, state.queryParams, {
          page: currentPage
        })
      });
    }

    case leaderboard.ActionTypes.PLAYERS_SUCCESS: {
      const payload:any[] = action.payload;
      const currentPage = state.currentPage > 1 ? state.currentPage : null;

      return Object.assign({}, state, {
        players: [...payload],
        weapons: [],
        playerWeapons: [],
        medals: [],
        loading: false,
        error: false,
        leaderboardType: 'players',
        queryParams: Object.assign({}, {
          weaponId: state.selectedWeaponId,
          page: currentPage
        })
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER_SUCCESS: {
      const payload:any[] = action.payload;

      return Object.assign({}, state, {
        playerWeapons: [...payload],
        loading: false,
        error: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getPrimary = (state: State) => state.primary;

export const getSpecial = (state: State) => state.special;

export const getWeaponList = (state: State) => state.weaponList;

export const getSelectedWeaponId = (state: State) => state.selectedWeaponId;

export const getPlayers = (state: State) => state.players;

export const getWeapons = (state: State) => state.weapons;

export const getSearchedPlayer = (state: State) => state.searchedPlayer;

export const getPlayerWeapons = (state: State) => state.playerWeapons;

export const getMedals = (state: State) => state.medals;

export const getSelectedMedal = (state: State) => state.selectedMedal;

export const getSelectedWeaponType = (state: State) => state.selectedWeaponType;

export const getSelectedWeaponTier = (state: State) => state.selectedWeaponTier;

export const getCurrentPage = (state: State) => state.currentPage;

export const getLoadingStatus = (state: State) => state.loading;

export const getLeaderboardType = (state: State) => state.leaderboardType;

export const getErrorStatus = (state: State) => state.error;

export const getQueryParams = (state: State) => state.queryParams;
