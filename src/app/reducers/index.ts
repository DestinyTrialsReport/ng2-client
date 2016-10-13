import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/do';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';
import {mapsReducer, MapsState} from "./maps.reducer";
import * as fromPlayerReducer from './player.reducer';
import * as fromActivities from './activity.reducer';
import * as fromInventories from './inventory.reducer';
import * as fromStats from './stats.reducer';
import {Observable} from "rxjs/Observable";
import * as fromSearch from './search.reducer';
import {HIDDEN_NODES, ARMOR_BUCKETS, WEAPON_BUCKETS} from "../services/constants";
import {Item} from "../models/inventory.model";
import {Talent} from "../models/manifest.model";


export interface AppState {
  router: RouterState;
  map: MapsState;
  search: fromSearch.SearchState;
  players: fromPlayerReducer.PlayersState;
  activities: fromActivities.ActivitiesState;
  inventory: fromInventories.InventoriesState;
  stats: fromStats.StatsState;
}

export const reducers = {
  router: routerReducer,
  map: mapsReducer,
  search: fromSearch.reducer,
  players: fromPlayerReducer.playerReducer,
  activities: fromActivities.activityReducer,
  inventory: fromInventories.inventoryReducer,
  stats: fromStats.statsReducer
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export function getPlayerInventory(state$: Observable<AppState>, id: string, itemsDef: any, talents: any, stepsDef: any) {
  // return (state$: Observable<AppState>) => {
    return state$.let(fromInventories.getPlayerInventory(id))
      .map((items: Item[]) => {
        const itemsWithDefinitions: Item[] = items.map(item => Object.assign({}, item, itemsDef[item.itemHash]));
        // const itemsWithSteps: Item[] = itemsWithDefinitions.map(item => {
        return itemsWithDefinitions.map(item => {
          const talentTree:Talent[] = talents[item.talentGridHash];

          return Object.assign({}, item, {
              steps: item.nodes.map(node => {
                const talentNode:Talent = talentTree[node.nodeHash];
                return Object.assign({}, stepsDef[talentNode.s[node.stepIndex]], {
                  h: talentNode.s[node.stepIndex],
                  r: talentNode.r,
                  c: talentNode.c
                });
              })
                .filter(step => step.c > -1)
                .filter(step => HIDDEN_NODES.indexOf(step.h) < 0)
            })
          }
        );

        // return {
        //   weapons: itemsWithSteps.filter(item => WEAPON_BUCKETS.indexOf(item.bucketHash) > -1),
        //   armor: itemsWithSteps.filter(item => ARMOR_BUCKETS.indexOf(item.bucketHash) > -1)
        //     .filter(item => item.tT == 6),
        //   subclass: itemsWithSteps.filter(item => item.bucketHash == 3284755031).shift()
        // }
      });
  // };
}

// export function getPlayerActivities(membershipId:string) {
//   return (state$: Observable<AppState>) => {
//     return Observable.combineLatest<{ [id: string]: Activity }, string[]>(
//     state$.let(getPlayerActivities),
//     state$.let(getPlayerActivitiesById(membershipId)),
//   )
//     .map(([ activities, player ]) => player.map(id => activities[id]));
//     // .map(([ activities, player ]) => console.log(player, activities));
//   };
// }


const DEV_REDUCERS = [stateSetter, storeFreeze];
if (['logger', 'both'].includes(STORE_DEV_TOOLS)) { // set in constants.js file of project root
    DEV_REDUCERS.push(storeLogger());
}

const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function rootReducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
