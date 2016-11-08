import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import * as fromMaps from './maps.reducer';
import * as fromPlayers from './player.reducer';
import * as fromActivities from './activity.reducer';
import * as fromInventories from './inventory.reducer';
import * as fromStats from './stats.reducer';
import * as fromSearch from './search.reducer';


export interface AppState {
  map: fromMaps.MapsState;
  search: fromSearch.SearchState;
  players: fromPlayers.PlayersState;
  activities: fromActivities.ActivitiesState;
  inventory: fromInventories.InventoriesState;
  stats: fromStats.StatsState;
}

export const reducers = {
  map: fromMaps.mapsReducer,
  search: fromSearch.reducer,
  players: fromPlayers.playerReducer,
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
