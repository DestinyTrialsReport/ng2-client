/* tslint:disable: no-switch-case-fall-through */
import {MapInfo, WeaponUsage, CurrentMap} from "../models/map-stats.model";
import * as mapActions from "../actions/maps.actions";
import {CRUCIBLE_MAPS, BUCKET_NAMES, TYPE_BUCKETS} from "../services/constants";


export interface WeaponTotals {
  sum: number;
  bucketSum: number;
}

export interface MapsState {
  currentMap: CurrentMap;
  mapInfo: MapInfo;
  weaponStats: WeaponUsage[];
  weaponTotals: {
    primary: WeaponTotals,
    special: WeaponTotals
  }
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
  weaponTotals: null,
  loading: false,
  loaded: true
};

export function mapsReducer(state = initialState, action: mapActions.Actions): MapsState {
  switch (action.type) {

    case mapActions.ActionTypes.SAVE_CURRENT_MAP: {
      const payload:any = action.payload;

      if (!payload) {
        return {
          currentMap: state.currentMap,
          mapInfo: state.mapInfo,
          weaponStats: state.weaponStats,
          weaponTotals: state.weaponTotals,
          loading: false,
          loaded: false
        };
      }

      return Object.assign({}, state, {
        currentMap: Object.assign({}, state.currentMap, action.payload),
        mapInfo: state.mapInfo,
        weaponStats: state.weaponStats,
        weaponTotals: state.weaponTotals,
        loading: true,
        loaded: false
      });
    }

    case mapActions.ActionTypes.LOAD_MAP_DATA: {
      const payload: any = action.payload;

      if (!payload) {
        return {
          currentMap: state.currentMap,
          mapInfo: state.mapInfo,
          weaponStats: state.weaponStats,
          weaponTotals: state.weaponTotals,
          loading: false,
          loaded: false
        };
      }

      const weaponUsage: WeaponUsage[] = payload.weapon_stats.map(weapon => {
        const bucketHash:number = TYPE_BUCKETS[weapon.weapon_type];
        return {
          bucketHash: bucketHash,
          bucketName: String(BUCKET_NAMES[bucketHash]),
          file_name: '/assets/img/weapon-icons/' + weapon.file_name,
          kills: parseInt(weapon.kills),
          sum_kills: parseInt(weapon.sum_kills)
        }
      });

      const primaries: WeaponUsage[] = weaponUsage.filter(w => w.bucketName == 'primary');
      const specials: WeaponUsage[] = weaponUsage.filter(w => w.bucketName == 'special');

      const primary:WeaponTotals = {
        sum: primaries.map(w => w.kills).reduce((acc, x) => acc + x, 0),
        bucketSum: primaries.map(w => w.sum_kills).reduce((acc, x) => acc + x, 0)
      };

      const special:WeaponTotals = {
        sum: specials.map(w => w.kills).reduce((acc, x) => acc + x, 0),
        bucketSum: specials.map(w => w.sum_kills).reduce((acc, x) => acc + x, 0)
      };

      return Object.assign({}, state, {
        currentMap: state.currentMap,
        mapInfo: Object.assign({}, payload.map_info[0], CRUCIBLE_MAPS[payload.map_info[0].referenceId]),
        weaponStats: weaponUsage,
        weaponTotals: {
          primary: primary,
          special: special
        },
        loading: true,
        loaded: false
      });
    }

    default: {
      return state;
    }
  }
}

