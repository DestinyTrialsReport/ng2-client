/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import {Player, BNGStats, DTRStats, GGGStats} from "../models/player.model";
import * as playerActions from "../actions/player.actions";
import {Activity} from "../models/activity.model";
import {ItemDefinition} from "../models/manifest.model";


export interface PlayersState {
  player1: Player;
  player2: Player;
  player3: Player;
}

export interface PlayerState {
  player: Player;
  activities: Activity[];
  inventory: ItemDefinition[];
  bungie: BNGStats;
  trials: DTRStats;
  guardian: GGGStats;
}

const initialState: PlayersState = {
  player1: null,
  player2: null,
  player3: null
};

export function playerReducer(state = initialState, action: Action): PlayersState {
  switch (action.type) {

    case playerActions.ActionTypes.SEARCH_COMPLETE: {
      const playerId: string = action.payload[1];
      const player: Player = action.payload[0];
      if (!player) {
        return state;
      }

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? player : state.player1,
        player2: playerId == 'player2' ? player : state.player2,
        player3: playerId == 'player3' ? player : state.player3
      });
    }

    case playerActions.ActionTypes.SEARCH_ACCOUNT: {
      const playerId: string = action.payload[1];
      const player: Player = action.payload[0];
      const updated: Player = Object.assign({}, state[playerId], player.characters[0]);

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
