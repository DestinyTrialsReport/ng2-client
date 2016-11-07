/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import {Player, Character} from "../models/player.model";
import * as playerActions from "../actions/player.actions";


export interface PlayersState {
  player1: Player;
  player2: Player;
  player3: Player;
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
      const character: Character = player.characters[0];

      const updated: Player = Object.assign({}, state[playerId], {
        characterBase: {
          characterId: character.characterBase.characterId,
          powerLevel: character.characterBase.powerLevel,
          grimoireScore: character.characterBase.grimoireScore,
          stats: character.characterBase.stats
        },
        emblemPath: character.emblemPath,
        backgroundPath: character.backgroundPath
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
