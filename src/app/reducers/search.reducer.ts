/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as players from '../actions/player.actions';
import * as activities from '../actions/activity.actions';
import * as inventory from '../actions/inventory.actions';
import {Action} from "@ngrx/store";

export interface SearchState {
  player1: Search;
  player2: Search;
  player3: Search;
}

export interface Search {
  player: boolean;
  account: boolean;
  activities: boolean;
  inventory: boolean;
  stats: boolean;
}


const initialState: SearchState = {
  player1: {
    player: false,
    account: false,
    activities: false,
    inventory: false,
    stats: false,
  },
  player2: {
    player: false,
    account: false,
    activities: false,
    inventory: false,
    stats: false,
  },
  player3: {
    player: false,
    account: false,
    activities: false,
    inventory: false,
    stats: false,
  }
};

export function reducer(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case players.ActionTypes.SEARCH_COMPLETE: {
      const playerId: string = action.payload[1];

      const newState: Search = Object.assign({}, state[playerId], {
        player: true,
        account: false,
        activities: false,
        inventory: false,
        stats: false,
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? newState : state.player1,
        player2: playerId == 'player2' ? newState : state.player2,
        player3: playerId == 'player3' ? newState : state.player3
      });
    }

    case players.ActionTypes.SEARCH_ACCOUNT: {
      const playerId: string = action.payload[1];

      const newState: boolean = Object.assign({}, state[playerId], {
        account: true
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? newState : state.player1,
        player2: playerId == 'player2' ? newState : state.player2,
        player3: playerId == 'player3' ? newState : state.player3
      });
    }

    case activities.ActionTypes.SEARCH_ACTIVITY: {
      const playerId: string = action.payload[1];

      const newState: boolean = Object.assign({}, state[playerId], {
        activities: true
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? newState : state.player1,
        player2: playerId == 'player2' ? newState : state.player2,
        player3: playerId == 'player3' ? newState : state.player3
      });
    }

    case inventory.ActionTypes.SEARCH_INVENTORY: {
      const playerId: string = action.payload[1];

      const newState: boolean = Object.assign({}, state[playerId], {
        inventory: true
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? newState : state.player1,
        player2: playerId == 'player2' ? newState : state.player2,
        player3: playerId == 'player3' ? newState : state.player3
      });
    }

    default: {
      return state;
    }
  }
}
