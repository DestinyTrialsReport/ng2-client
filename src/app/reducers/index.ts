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
import * as fromPGCR from './pgcr.reducer';
import {Observable} from "rxjs";
import {PGCR} from "../models/pgcr.model";
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
  map: fromMaps.State;
  search: fromSearch.State;
  players: fromPlayers.State;
  activities: fromActivities.State;
  inventory: fromInventories.State;
  stats: fromStats.State;
  pgcr: fromPGCR.State;
}

export const reducers = {
  map: fromMaps.reducer,
  search: fromSearch.reducer,
  players: fromPlayers.reducer,
  activities: fromActivities.reducer,
  inventory: fromInventories.reducer,
  stats: fromStats.reducer,
  pgcr: fromPGCR.reducer
};

export function getPlayerState(state$: Observable<State>) {
  return state$.select(s => s.activities);
}

export function getPgcrState(state$: Observable<State>) {
  return state$.select(s => s.pgcr);
}

export const getPgcrCollection = compose(fromPGCR.getCollection, getPgcrState);

export function getActivityState(state$: Observable<State>) {
  return state$.select(s => s.activities);
}

export const getRecentActivities = function (playerIndex: string, amount: number) {
  return (state$: Observable<State>) => {
    return state$.let(compose(fromActivities.getActivities(playerIndex, amount), getActivityState));
  }
};

export const getCharacter = function (playerIndex: string) {
  return (state$: Observable<State>) => {
    return state$.let(compose(fromPlayers.getCharacter(playerIndex), getPlayerState));
  }
};

export const getPgcrFromRecent = function (playerIndex: string, amount: number) {
  return (state$: Observable<State>) => {
    return combineLatest<{ [id: string]: PGCR }, string[]>(
      state$.let(getPgcrCollection),
      state$.let(compose(fromActivities.getActivities(playerIndex, amount), getActivityState))
    )
      .map(([ collection, ids ]) => ids.map(id => collection[id]));
  }
};

export const getNewMatches = function (matches: string[]) {
  return (state$: Observable<State>) => {
      return state$.let(getPgcrCollection)
        .map(collection => matches.filter(instanceId => !collection[instanceId]));
  }
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

// const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const developmentReducer: ActionReducer<State> = compose(storeFreeze, storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);
// const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
