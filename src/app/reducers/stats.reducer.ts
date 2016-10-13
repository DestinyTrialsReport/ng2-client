/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import {BNGStats, DTRStats, GGGStats} from "../models/player.model";
import * as statsActions from "../actions/stats.actions";


export interface StatsState {
  player1: StatState;
  player2: StatState;
  player3: StatState;
}

export interface StatState {
  bungie: BNGStats;
  trials: DTRStats;
  guardian: GGGStats;
}

const initialState: StatsState = {
  player1: {
    bungie: null,
    trials: null,
    guardian: null,
  },
  player2: {
    bungie: null,
    trials: null,
    guardian: null,
  },
  player3: {
    bungie: null,
    trials: null,
    guardian: null,
  }
};

export function statsReducer(state = initialState, action: Action): StatsState {
  switch (action.type) {

    case statsActions.ActionTypes.BNG_STATS: {
      const bngStats: BNGStats = action.payload[0];
      const playerId: string = action.payload[1];

      const updated: StatState = Object.assign({}, state[playerId], {
        bungie: bngStats,
        trials: state[playerId].trials,
        guardian: state[playerId].guardian
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    case statsActions.ActionTypes.DTR_STATS: {
      const dtrStats: DTRStats = action.payload[0];
      const playerId: string = action.payload[1];

      const updated: StatState = Object.assign({}, state[playerId], {
        bungie: state[playerId].bungie,
        trials: dtrStats,
        guardian: state[playerId].guardian
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    case statsActions.ActionTypes.GGG_STATS: {
      const membershipId:string = action.payload[2];
      const gggStats: GGGStats = action.payload[0][membershipId];
      const playerId: string = action.payload[1];

      const updated: StatState = Object.assign({}, state[playerId], {
        bungie: state[playerId].bungie,
        trials: state[playerId].trials,
        guardian: gggStats
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    default: {
      return state;
    }
  }
}
