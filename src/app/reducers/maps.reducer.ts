/* tslint:disable: no-switch-case-fall-through */
import {MapInfo, WeaponUsage, CurrentMap} from "../models/map-stats.model";
import * as mapActions from "../actions/maps.actions";

export interface MapsState {
  currentMap: CurrentMap;
  mapInfo: MapInfo;
  weaponStats: WeaponUsage[];
  loading: boolean;
  loaded: boolean;
}

const initialState: MapsState = {
  currentMap: {
    referenceId: '',
    start_date: '',
    week: '',
    activityName: '',
    pgcrImage: ''
  },
  mapInfo: null,
  weaponStats: [],
  loading: false,
  loaded: true
};

export function mapsReducer(state = initialState, action: mapActions.Actions): MapsState {
  switch (action.type) {

    case mapActions.ActionTypes.SAVE_CURRENT_MAP: {
      console.log(action.payload)
      const payload:any = action.payload;

      if (!payload) {
        return {
          currentMap: state.currentMap,
          mapInfo: state.mapInfo,
          weaponStats: state.weaponStats,
          loading: false,
          loaded: false
        };
      }

      return Object.assign({}, state, {
        currentMap: Object.assign({}, state.currentMap, action.payload),
        mapInfo: state.mapInfo,
        weaponStats: state.weaponStats,
        loading: true,
        loaded: false
      });
    }

    case mapActions.ActionTypes.SEARCH_MAP: {
      const payload:any = action.payload;

      if (!payload) {
        return {
          currentMap: state.currentMap,
          mapInfo: state.mapInfo,
          weaponStats: state.weaponStats,
          loading: false,
          loaded: false
        };
      }

      return Object.assign({}, state, {
        currentMap: state.currentMap,
        mapInfo: {},
        weaponStats: [],
        loading: true,
        loaded: false
      });
    }

    case mapActions.ActionTypes.SEARCH_COMPLETE: {
      const payload: any = action.payload;

      if (!payload) {
        return {
          currentMap: state.currentMap,
          mapInfo: state.mapInfo,
          weaponStats: state.weaponStats,
          loading: false,
          loaded: false
        };
      }

      return Object.assign({}, state, {
        currentMap: state.currentMap,
        mapInfo: payload.map_info[0],
        weaponStats: payload.weapon_stats,
        loading: true,
        loaded: false
      });
    }

    default: {
      return state;
    }
  }
}

