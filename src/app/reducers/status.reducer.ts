/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as player from '../actions/player.actions';
import * as stats from '../actions/stats.actions';

export interface State {
  player: {
    player1: boolean;
    player2: boolean;
    player3: boolean;
  },
  intro: {
    player1: boolean;
    player2: boolean;
    player3: boolean;
  },
  inventory: {
    player1: boolean;
    player2: boolean;
    player3: boolean;
  }
}

const initialState: State = {
  player: {
    player1: false,
    player2: false,
    player3: false,
  },
  intro: {
    player1: false,
    player2: false,
    player3: false,
  },
  inventory: {
    player1: false,
    player2: false,
    player3: false,
  }
};

export function reducer(state = initialState, action: player.Actions | stats.Actions): State {
  switch (action.type) {

    case player.ActionTypes.ACCOUNT_PLAYER2:
    case player.ActionTypes.ACCOUNT_PLAYER3: {
      const playerIndex = action.type.match(/\d/g);

      const playerState = Object.assign({}, state.player, {
        [`player${playerIndex[0]}`]: false
      });

      const introState = Object.assign({}, state.intro, {
        [`player${playerIndex[0]}`]: false
      });

      const inventoryState = Object.assign({}, state.inventory, {
        [`player${playerIndex[0]}`]: false
      });

      return Object.assign({}, state, {
        player: playerIndex ? playerState : state.player,
        intro: playerIndex ? introState : state.intro,
        inventory: playerIndex ? inventoryState : state.inventory,
      });
    }

    case player.ActionTypes.SEARCH_COMPLETE_PLAYER1: {
      return initialState;
    }

    case player.ActionTypes.ACCOUNT_SUCCESS_PLAYER1:
    case player.ActionTypes.ACCOUNT_SUCCESS_PLAYER2:
    case player.ActionTypes.ACCOUNT_SUCCESS_PLAYER3: {
      const playerIndex = action.type.match(/\d/g);

      const playerState = Object.assign({}, state.player, {
        [`player${playerIndex[0]}`]: true
      });

      return Object.assign({}, state, {
        player: playerIndex ? playerState : state.player
      });
    }

    case stats.ActionTypes.STATS_PLAYER1_SUCCESS:
    case stats.ActionTypes.STATS_PLAYER2_SUCCESS:
    case stats.ActionTypes.STATS_PLAYER3_SUCCESS: {
      const playerIndex = action.type.match(/\d/g);

      const introState = Object.assign({}, state.intro, {
        [`player${playerIndex[0]}`]: true
      });

      return Object.assign({}, state, {
        intro: playerIndex ? introState : state.intro
      });
    }

    case player.ActionTypes.INVENTORY_PLAYER1_SUCCESS:
    case player.ActionTypes.INVENTORY_PLAYER2_SUCCESS:
    case player.ActionTypes.INVENTORY_PLAYER3_SUCCESS: {
      const playerIndex = action.type.match(/\d/g);

      const inventoryState = Object.assign({}, state.inventory, {
        [`player${playerIndex[0]}`]: true
      });

      return Object.assign({}, state, {
        inventory: playerIndex ? inventoryState : state.inventory
      });
    }

    default: {
      return state;
    }
  }
}

export const getPlayerStatus = (state: State) => state.player;

export const getIntroStatus = (state: State) => state.intro;

export const getInventoryStatus = (state: State) => state.inventory;
