/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import * as leaderboard from "../actions/leaderboard.actions";
import { LBWeaponPercentage } from "../models/leaderboard.model";
import {
  BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON, MEDALS_REF, WEAPON_TYPE_REF, WEAPON_TIERS,
  MEDAL_DEFINITIONS
} from "../services/constants";


export interface State {
  items: any[];
  searchedPlayer: string;
  leaderboardType: string;
  title: string;
  selectedIcon: string;
  selectedType: any;
  selectedPlatform: number;
  selectedTier: number;
  primary: LBWeaponPercentage[];
  special: LBWeaponPercentage[];
  typeSelection: Array<{id: any, statId?: string, text: string}>;
  weaponList: Array<{id: any, statId?: string, name: string}>;
  currentPage: number;
  loading: boolean;
  error: boolean;
  queryParams: {
    [id:string]: string
  }
}

const initialState: State = {
  items: [],
  searchedPlayer: null,
  leaderboardType: 'weapons',
  title: null,
  selectedIcon: null,
  selectedType: null,
  selectedPlatform: 0,
  selectedTier: 0,
  primary: [],
  special: [],
  typeSelection: [],
  weaponList: [],
  currentPage: 1,
  loading: false,
  error: false,
  queryParams: null,
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.GET_MEDAL:
    case leaderboard.ActionTypes.GET_WEAPON_LIST:
    case leaderboard.ActionTypes.GET_WEAPON_TYPE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        selectedType: payload.type || state.selectedType,
        loading: true,
      });
    }

    case leaderboard.ActionTypes.SET_LEADERBOARD_TYPE: {
      const payload: any = action.payload;
      let typeSelection: any = WEAPON_TYPE_REF;
      if (payload.type === 'medals') {
        typeSelection = MEDALS_REF;
      }

      return Object.assign({}, state, {
        leaderboardType: payload.type,
        typeSelection: [...typeSelection],
        loading: true,
      });
    }

    case leaderboard.ActionTypes.GET_SELECTED_TYPE: {
      const payload: any = action.payload;
      let title = `Most Used ${payload.type || 'Weapon'}s`;
      return Object.assign({}, state, {
        selectedType: payload.type,
        title: title,
        loading: true
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
      const medal = MEDALS_REF.filter(medal => medal.id == state.selectedType);
      const medalId = medal.map(medal => medal.statId);
      const medalName = medal.map(medal => medal.text);
      const definition = MEDAL_DEFINITIONS[String(medalId)];
      const icon = definition && definition['iconImage'] ? `https://www.bungie.net/${definition['iconImage']}` : null;
      let title = `Most ${medalName} Medals Received`;

      return Object.assign({}, state, {
        items: [...payload],
        leaderboardType: 'medals',
        title: title,
        selectedIcon: icon,
        loading: false,
      });
    }

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      let payload = action.payload;

      return Object.assign({}, state, {
        items: [...payload],
        selectedIcon: null,
        loading: false,
      });
    }

    case leaderboard.ActionTypes.UPDATE_FILTER: {
      const payload = action.payload;
      const tier = (payload.tier > 0 && payload.tier < 7) ? payload.tier : 0;
      const types = WEAPON_TYPE_REF.map(weapon => weapon.id);
      const type = types.indexOf(payload.type) > -1 ? payload.type : state.selectedType;
      // const platform = payload.platform > 0 ? payload.platform : 0;

      let tierName = WEAPON_TIERS
        .filter(t => t.value == tier)
        .map(obj => obj.text);

      let title = 'Most Used ';

      if (type !== 'All' && tier < 1) {
        title = title + type + 's';
      } else if (tier > 0 && type === 'All') {
        title = title + tierName + 's ';
      } else {
        title = title + tierName + ' ' + type + 's';
      }

      return Object.assign({}, state, {
        selectedTier: tier,
        selectedType: type,
        // selectedPlatform: platform,
        title: title
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
      let payload = action.payload;

      return Object.assign({}, state, {
        weaponList: [...payload]
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER: {
      const payload: any = action.payload;
      let title = `This Week's Rankings for ${payload.name}`;

      return Object.assign({}, state, {
        searchedPlayer: payload.name,
        selectedIcon: null,
        leaderboardType: 'searched',
        title: title,
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.GET_PLAYERS: {
      const payload: any = action.payload;
      let weapon, icon, title;

      if (payload.definition) {
        weapon = payload.definition.n;
        icon = `https://www.bungie.net/common/destiny_content/icons/${payload.definition.i}`;
        title = `Most ${weapon} Kills`;
      } else if (payload.type == 'All') {
        title = `Most Kills`;
      } else {
        title = `Most ${payload.type} Kills`;
      }

      return Object.assign({}, state, {
        title: title,
        selectedType: payload.type,
        selectedIcon: icon,
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.CHANGE_PAGE: {
      const payload: number = action.payload;

      return Object.assign({}, state, {
        currentPage: payload,
      });
    }

    case leaderboard.ActionTypes.PLAYERS_SUCCESS: {
      const payload:any[] = action.payload;

      return Object.assign({}, state, {
        items: [...payload],
        selectedTier: 0,
        loading: false,
        leaderboardType: 'players',
      });
    }

    case leaderboard.ActionTypes.SEARCH_PLAYER_SUCCESS: {
      const payload = action.payload;
      const medals = [...payload.medals];
      const weapons = [...payload.weapons];

      return Object.assign({}, state, {
        items: [...weapons, ...medals],
        loading: false,
      });
    }

    default: {
      return state;
    }
  }
}

export const getPrimary = (state: State) => state.primary;

export const getSpecial = (state: State) => state.special;

export const getTypeSelection = (state: State) => state.typeSelection;

export const getWeaponList = (state: State) => state.weaponList;

export const getItems = (state: State) => state.items;

export const getSelectedType = (state: State) => state.selectedType;

export const getSelectedTier = (state: State) => state.selectedTier;

export const getSelectedPlatform = (state: State) => state.selectedPlatform;

export const getCurrentPage = (state: State) => state.currentPage;

export const getLoadingStatus = (state: State) => state.loading;

export const getSelectedIcon = (state: State) => state.selectedIcon;

export const getLeaderboardType = (state: State) => state.leaderboardType;

export const getErrorStatus = (state: State) => state.error;

export const getTitle = (state: State) => state.title;

export const getQueryParams = (state: State) => state.queryParams;
