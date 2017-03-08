import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { Observable } from "rxjs";
import { PGCR } from "../models/pgcr.model";
import { combineLatest } from 'rxjs/observable/combineLatest';
import { localStorageSync } from "ngrx-store-localstorage";
import * as fromAuth from './auth.reducer';
import * as fromMaps from './maps.reducer';
import * as fromPlayers from './player.reducer';
import * as fromMyPlayers from './my-player.reducer';
import * as fromActivities from './activity.reducer';
import * as fromInventories from './inventory.reducer';
import * as fromStats from './stats.reducer';
import * as fromSearch from './search.reducer';
import * as fromPGCR from './pgcr.reducer';
import * as fromLeaderboards from './leaderboards.reducer';
import {CRUCIBLE_MAPS} from "../services/constants";

export interface State {
  auth: fromAuth.State;
  map: fromMaps.State;
  search: fromSearch.State;
  players: fromPlayers.State;
  characters: fromMyPlayers.State;
  activities: fromActivities.State;
  inventory: fromInventories.State;
  stats: fromStats.State;
  pgcr: fromPGCR.State;
  leaderboard: fromLeaderboards.State;
}

export const reducers = {
  auth: fromAuth.reducer,
  map: fromMaps.reducer,
  search: fromSearch.reducer,
  players: fromPlayers.reducer,
  characters: fromMyPlayers.reducer,
  activities: fromActivities.reducer,
  inventory: fromInventories.reducer,
  stats: fromStats.reducer,
  pgcr: fromPGCR.reducer,
  leaderboard: fromLeaderboards.reducer
};

export const getSearchState = (state: State, index: string) => state.search[index];

export const getPgcrState = (state: State) => state.pgcr;

export const getMyPlayerState = (state: State) => state.characters;

export const getPlayerState = (state: State) => state.players;

export const getAuthState = (state: State) => state.auth;

export const getLeaderboardState = (state: State) => state.leaderboard;

export const getMapState = (state: State) => state.map;


// export function playerIsLoaded(playerIndex: string) {
//   return createSelector(getSearchState, fromSearch.getPlayer);
// };

export function playerIsLoaded(index: string) {
  return createSelector(
    getSearchState, (searchState) => {
      const player = searchState[index];
      if (player) {
        return player.player
      }
    }
  );
}


export const getLeaderboardPrimary = createSelector(getLeaderboardState, fromLeaderboards.getPrimary);

export const getLeaderboardTypeSelection = createSelector(getLeaderboardState, fromLeaderboards.getTypeSelection);

export const getLeaderboardWeaponList = createSelector(getLeaderboardState, fromLeaderboards.getWeaponList);

export const getLeaderboardSpecial = createSelector(getLeaderboardState, fromLeaderboards.getSpecial);

export const getLeaderboardItemsUnfiltered = createSelector(getLeaderboardState, fromLeaderboards.getItems);

export const getLeaderboardsLoadingStatus = createSelector(getLeaderboardState, fromLeaderboards.getLoadingStatus);

export const getLeaderboardsSelected = createSelector(getLeaderboardState, fromLeaderboards.getSelected);

export const getLeaderboardsErrorStatus = createSelector(getLeaderboardState, fromLeaderboards.getErrorStatus);

export const getLeaderboardTitle = createSelector(getLeaderboardState, fromLeaderboards.getTitle);

export const getPrimaryAndSpecial = createSelector(getLeaderboardPrimary, getLeaderboardSpecial, (primary, special) => {
  return [primary, special];
});

export const getLeaderboardItems = createSelector(getLeaderboardItemsUnfiltered, getLeaderboardsSelected, (items, selected) => {
  let filteredItems = items;
  if (selected.leaderboard == 'weapons') {
    if (selected.type !== 'All') {
      filteredItems = items.filter(c => c.type === selected.type);
    }
    if (selected.tier > 0) {
      filteredItems = filteredItems.filter(c => c.tier === selected.tier);
    }
  }
  return filteredItems;
});

export const getAuthAuthState = createSelector(getAuthState, fromAuth.getAuthState);

export const getRefreshToken = createSelector(getAuthState, fromAuth.getRefreshToken);

export const getPgcrCollection = createSelector(getPgcrState, fromPGCR.getCollection);

export const getCurrentMap = createSelector(getMapState, fromMaps.getCurrentMap);

export const getMap = createSelector(getMapState, fromMaps.getMap);

export const previousMap = createSelector(getMapState, fromMaps.previousMap);

export const nextMap = createSelector(getMapState, fromMaps.nextMap);

export const getUpdatedAt = createSelector(getLeaderboardsSelected, getCurrentMap, (selected, currentMap) => {
  let meta = currentMap.leaderboards.filter(l => l.leaderboard == selected.leaderboard);
  if (meta[0]) {
    // Safari fix
    let dateString = `${meta[0].updated_at} UTC`.replace(/-/g, "/");
    return new Date(dateString).toString();
  }
});

export const getMapInfo = createSelector(getMap, previousMap, nextMap, (current, previous, next) => {
  return {
    current: current,
    previous: previous,
    next: next
  };
});

export const getCurrentWeek = createSelector(getMap, getCurrentMap, (map, currentMap) => {
  let selectedWeek = currentMap.week;
  if (map) {
    selectedWeek = map.week;
  }
  return selectedWeek;
});

export const getPreviousMap = createSelector(previousMap, (map) => {
  if (map) {
    return CRUCIBLE_MAPS[map.referenceId];
  }
});

export const getNextMap = createSelector(nextMap, (map) => {
  if (map) {
    return CRUCIBLE_MAPS[map.referenceId];
  }
});

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
      state$.select(getPgcrCollection),
      state$.let(compose(fromActivities.getActivities(playerIndex, amount), getActivityState))
    )
      .map(([ collection, ids ]) => ids.map(id => collection[id]));
  }
};

export const getNewMatches = function (matches: string[]) {
  return (state$: Observable<State>) => {
      return state$.select(getPgcrCollection)
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
const developmentReducer: ActionReducer<State> = compose(localStorageSync(['auth'], true), storeFreeze, storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);
// const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
