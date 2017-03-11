/* tslint:disable: no-switch-case-fall-through */
import { Player, Character } from "../models/player.model";
import * as myPlayer from "../actions/my-player.actions";
import * as player from "../actions/player.actions";
import {Observable} from "rxjs";


export interface State {
  player1: Player;
  player2: Player;
  player3: Player;
}

const initialState: State = {
  player1: null,
  player2: null,
  player3: null
};

export function reducer(state = initialState, action: player.Actions | myPlayer.Actions): State {
  switch (action.type) {

    case myPlayer.ActionTypes.SEARCH_MY_COMPLETE:
    case player.ActionTypes.SEARCH_COMPLETE: {
      const playerId = action.payload[1];
      const player = action.payload[0];
      if (!player) {
        return state;
      }

      // if (playerId == 'player1') {
      //   return Object.assign({}, state, {
      //     player1: player,
      //     player2: playerId == 'player2' ? player : null,
      //     player3: playerId == 'player3' ? player : null
      //   });
      // }
      // else {
        return Object.assign({}, state, {
          player1: playerId == 'player1' ? player : state.player1,
          player2: playerId == 'player2' ? player : state.player2,
          player3: playerId == 'player3' ? player : state.player3
        });
      // }
    }

    case player.ActionTypes.SEARCH_ACCOUNT: {
      const playerId: string = action.payload[1];
      const character: Character = action.payload[0];
      // const character: Character = player.characters[0];

      const updated: Player = Object.assign({}, state[playerId], {
        characterBase: {
          characterId: character.characterBase.characterId,
          powerLevel: character.characterBase.powerLevel,
          grimoireScore: character.characterBase.grimoireScore,
          stats: character.characterBase.stats
        },
        emblemPath: character.emblemPath,
        backgroundPath: character.backgroundPath,
        membershipId: character.membershipId ? character.membershipId : state[playerId].membershipId,
        membershipType: character.membershipType ? character.membershipType : state[playerId].membershipType,
        displayName: character.displayName ? character.displayName : state[playerId].displayName
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

export function getCharacter(playerIndex: string) {
  return (state$: Observable<State>) => {
    return state$.select(state => state[playerIndex].characterBase);
  }
}
