/* tslint:disable: no-switch-case-fall-through */
import {MapInfo, WeaponUsage, CurrentMap, MapRef} from "../models/map-stats.model";
import * as map from "../actions/maps.actions";
import {CRUCIBLE_MAPS, BUCKET_NAMES, TYPE_BUCKETS} from "../services/constants";


export interface WeaponTotals {
  sum: number;
  bucketSum: number;
}

export interface State {
  currentMap: CurrentMap;
  mapInfo: MapInfo;
  previousMap: MapRef;
  nextMap: MapRef;
  weaponStats: WeaponUsage[];
  weaponTotals: {
    primary: WeaponTotals,
    special: WeaponTotals
  }
  primaryAvg: WeaponUsage[];
  specialAvg: WeaponUsage[];
  slideMap: string;
}

const initialState: State = {
  currentMap: {
    referenceId: '',
    start_date: '',
    week: '',
    activityName: '',
    pgcrImage: '',
    leaderboards: [],
  },
  mapInfo: null,
  previousMap: null,
  nextMap: null,
  weaponStats: [],
  weaponTotals: null,
  primaryAvg: [],
  specialAvg: [],
  slideMap: 'idle'
};

export function reducer(state = initialState, action: map.Actions): State {
  switch (action.type) {

    case map.ActionTypes.SLIDE_MAP: {
      const payload:any = action.payload;

      if (!payload) {
        return Object.assign({}, state, {
          slideMap: 'idle'
        });
      }

      return Object.assign({}, state, {
        slideMap: action.payload.direction
      });
    }

    case map.ActionTypes.SEARCH_COMPLETE: {
      const payload = action.payload;

      if (payload > 99) {
        return Object.assign({}, state, {
          slideMap: 'idle',
          mapInfo: Object.assign({}, state.mapInfo, {
            week: payload
          })
        });
      }

      return Object.assign({}, state, {
        currentMap: state.currentMap,
        mapInfo: state.mapInfo,
        weaponStats: state.weaponStats,
        weaponTotals: state.weaponTotals,
        slideMap: state.slideMap === 'left' ? 'right' : (state.slideMap === 'right' ? 'left' : 'idle')
      });
    }

    case map.ActionTypes.SAVE_CURRENT_MAP: {
      const payload: any = action.payload;
      const currentMap:CurrentMap = Object.assign({}, payload, {
        year: payload.week < 45 ? 'Year 2' : (payload.week > 99 ? 'Year 1' : 'Year 3'),
        weekInYear: (payload.week > 44 && payload.week < 99) ? payload.week - 44 : payload.week
      });

      return Object.assign({}, state, {
        currentMap: Object.assign({}, state.currentMap, currentMap),
        slideMap: 'idle'
      });
    }

    case map.ActionTypes.LOAD_MAP_DATA: {
      const payload: any = action.payload;

      const weaponUsage: WeaponUsage[] = payload.weapon_stats
        .map(weapon => {
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

      const primaryAvg: WeaponUsage[] = weaponUsage.filter(w => w.bucketName == 'primary').map(w => {
        const avgPercentage:number = 100 * (w.sum_kills / primary.bucketSum);
        const killPercentage:number =  100 * (w.kills / primary.sum);
        return Object.assign({}, w, {
          killPercentage: killPercentage,
          diffPercentage: killPercentage - avgPercentage
        });
      });

      const specialAvg: WeaponUsage[] = weaponUsage.filter(w => w.bucketName == 'special').map(w => {
        const avgPercentage:number = 100 * (w.sum_kills / special.bucketSum);
        const killPercentage:number =  100 * (w.kills / special.sum);
        return Object.assign({}, w, {
          killPercentage: killPercentage,
          diffPercentage: killPercentage - avgPercentage
        });
      });

      let week = parseInt(payload.map_info[0].week);
      let isYearOne = parseInt(payload.map_info[0].isYearOne);

      const mapInfo = Object.assign({}, payload.map_info[0], CRUCIBLE_MAPS[payload.map_info[0].referenceId], {
        year: isYearOne && isYearOne == 1 ? 'Year 1' : (week > 44 ? 'Year 3' : 'Year 2'),
        weekInYear: (week > 44 && week < 99) ? week - 44 : week
      });

      const mapRef: MapRef[] = payload.map_ref;

      return Object.assign({}, state, {
        currentMap: state.currentMap,
        mapInfo: mapInfo,
        previousMap: mapRef[week - 2],
        nextMap: mapRef[week],
        weaponStats: weaponUsage,
        weaponTotals: {
          primary: primary,
          special: special
        },
        primaryAvg: primaryAvg,
        specialAvg: specialAvg,
        slideMap: 'idle'
      });
    }

    default: {
      return state;
    }
  }
}

export const getCurrentMap = (state: State) => state.currentMap;

export const getMap = (state: State) => state.mapInfo;

export const previousMap = (state: State) => state.previousMap;

export const nextMap = (state: State) => state.nextMap;
