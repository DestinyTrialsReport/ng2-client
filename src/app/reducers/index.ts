import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from "ngrx-store-localstorage";

import * as fromSettings from './settings.reducer';
import * as fromAuth from './auth.reducer';
import * as fromMaps from './maps.reducer';
import * as fromPlayer from './player.reducer';
import * as fromMyPlayers from './my-player.reducer';
import * as fromPGCR from './pgcr.reducer';
import * as fromLeaderboards from './leaderboards.reducer';
import * as fromStatus from './status.reducer';
import {PlayerHeader} from "../models/player.model";

export interface State {
  settings: fromSettings.State;
  auth: fromAuth.State;
  map: fromMaps.State;
  player1: fromPlayer.State;
  player2: fromPlayer.State;
  player3: fromPlayer.State;
  status: fromStatus.State;
  characters: fromMyPlayers.State;
  pgcr: fromPGCR.State;
  leaderboard: fromLeaderboards.State;
}

export const reducers = {
  settings: fromSettings.reducer,
  auth: fromAuth.reducer,
  map: fromMaps.reducer,
  player1: fromPlayer.createPlayerWithIndex('PLAYER1'),
  player2: fromPlayer.createPlayerWithIndex('PLAYER2'),
  player3: fromPlayer.createPlayerWithIndex('PLAYER3'),
  status: fromStatus.reducer,
  characters: fromMyPlayers.reducer,
  pgcr: fromPGCR.reducer,
  leaderboard: fromLeaderboards.reducer
};

export const getSettingsState = (state: State) => state.settings;

export const getStatusState = (state: State) => state.status;

export const getPgcrState = (state: State) => state.pgcr;

export const getAuthState = (state: State) => state.auth;

export const getLeaderboardState = (state: State) => state.leaderboard;

export const getMapState = (state: State) => state.map;

export const getPlayerStatus = createSelector(getStatusState, fromStatus.getPlayerStatus);
export const getInventoryStatus = createSelector(getStatusState, fromStatus.getInventoryStatus);
export const getIntroStatus = createSelector(getStatusState, fromStatus.getIntroStatus);

function playerSelectorFactory(index) {
  return createSelector(
    (state: State) => state,
    state => state[`player${index}`]
  );
}

export const getPlayerPgcr = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(getPgcrState, fromPGCR.pgcrSelectorFactory(index));
};

export const getPlayerLastMatches = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getLastMatches);
};

export const getPlayerName = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getName);
};

export const getPlayerHeader = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getHeader);
};

export const getPlayerIntro = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getIntro);
};

export const getPlayerSummarized = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getSummarized);
};

export const getPlayerEquipped = (player: string) => {
  const index = player.match(/\d/g);
  return createSelector(playerSelectorFactory(index), fromPlayer.getEquipped);
};

export function getStatusForPlayer(player: string) {
  return createSelector(
    getInventoryStatus, getIntroStatus, (inventory, intro) => {
      return {
        inventory: inventory[player],
        intro: intro[player]
      };
    }
  );
}

export const getStatsSettings = createSelector(getSettingsState, fromSettings.getStats);

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
const developmentReducer: ActionReducer<State> = compose(localStorageSync(['auth','settings'], true), storeFreeze, storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = compose(localStorageSync(['auth','settings'], true), combineReducers)(reducers);
// const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
