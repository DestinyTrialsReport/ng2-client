/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import * as leaderboard from "../actions/leaderboard.actions";
import {LBWeaponPercentage, SelectedLeaderboardItems, LeaderboardSelectList} from "../models/leaderboard.model";
import {
  BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON, MEDALS_REF, WEAPON_TYPE_REF, WEAPON_TIERS,
  MEDAL_DEFINITIONS, YEAR_ONE_DUPLICATES
} from "../services/constants";


export interface State {
  items: any[];
  title: string;
  selected: SelectedLeaderboardItems;
  primary: LBWeaponPercentage[];
  special: LBWeaponPercentage[];
  typeSelection: Array<LeaderboardSelectList>;
  weaponList: Array<LeaderboardSelectList>;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  items: [],
  title: null,
  selected: {
    leaderboard: 'weapons',
    icon: null,
    type: null,
    player: null,
    platform: 0,
    tier: 0,
    page: 1,
  },
  primary: [],
  special: [],
  typeSelection: [],
  weaponList: [],
  loading: false,
  error: false,
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.GET_MEDAL:
    case leaderboard.ActionTypes.GET_WEAPON_LIST:
    case leaderboard.ActionTypes.GET_WEAPON_TYPE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        selected: Object.assign({}, state.selected, {
          type: payload.type || state.selected.type,
          player: null,
        }),
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
        selected: Object.assign({}, state.selected, {
          leaderboard: payload.type
        }),
        typeSelection: [...typeSelection],
        loading: true,
      });
    }

    case leaderboard.ActionTypes.GET_SELECTED_TYPE: {
      const payload: any = action.payload;
      return Object.assign({}, state, {
        selected: Object.assign({}, state.selected, {
          type: payload.type,
          page: 1
        }),
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
      const medal = MEDALS_REF.filter(medal => medal.id == state.selected.type);
      const medalId = medal.map(medal => medal.statId);
      const medalName = medal.map(medal => medal.text);
      const definition = MEDAL_DEFINITIONS[String(medalId)];
      const icon = definition && definition['iconImage'] ? `https://www.bungie.net/${definition['iconImage']}` : null;
      let title = `Most ${medalName} Medals Received`;

      return Object.assign({}, state, {
        items: [...payload],
        title: title,
        selected: Object.assign({}, state.selected, {
          icon: icon
        }),
        loading: false,
      });
    }

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      let payload = action.payload;
      let selectedType = state.selected.type;

      let title = `Most Used ${selectedType == 'All' ? 'Weapons' : selectedType}`;

      return Object.assign({}, state, {
        items: [...payload],
        title: title,
        selected: Object.assign({}, state.selected, {
          icon: null
        }),
        loading: false,
      });
    }

    case leaderboard.ActionTypes.UPDATE_FILTER: {
      const payload = action.payload;
      const tier = (payload.tier > 0 && payload.tier < 7) ? payload.tier : 0;
      const types = WEAPON_TYPE_REF.map(weapon => weapon.id);
      const type = types.indexOf(payload.type) > -1 ? payload.type : state.selected.type;

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
        selected: Object.assign({}, state.selected, {
          tier: tier,
          type: type
        }),
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
        selected: Object.assign({}, state.selected, {
          player: payload.name,
          icon: null
        }),
        title: title,
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.GET_PLAYERS: {
      const payload: any = action.payload;
      let weapon, icon, title;

      if (payload.definition) {
        let isDuplicate = YEAR_ONE_DUPLICATES.indexOf(payload.definition.h) > -1;
        weapon = payload.definition.n;
        icon = `https://www.bungie.net/common/destiny_content/icons/${payload.definition.i}`;
        title = `Most ${isDuplicate ? weapon + ' (Year 1)' : weapon} Kills`;
      } else if (payload.type == 'All') {
        title = `Most Kills`;
      } else {
        title = `Most ${payload.type} Kills`;
      }

      return Object.assign({}, state, {
        title: title,
        selected: Object.assign({}, state.selected, {
          icon: icon,
          type: payload.type,
          player: null,
        }),
        loading: true,
        error: false
      });
    }

    case leaderboard.ActionTypes.CHANGE_PAGE: {
      const payload: number = action.payload;

      return Object.assign({}, state, {
        selected: Object.assign({}, state.selected, {
          page: payload
        }),
      });
    }

    case leaderboard.ActionTypes.PLAYERS_SUCCESS: {
      const payload:any[] = action.payload;
      let selectedType = state.selected.type;

      return Object.assign({}, state, {
        items: [...payload],
        selected: Object.assign({}, state.selected, {
          tier: 0
        }),
        loading: false,
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

export const getSelected = (state: State) => state.selected;

export const getLoadingStatus = (state: State) => state.loading;

export const getErrorStatus = (state: State) => state.error;

export const getTitle = (state: State) => state.title;
