/* tslint:disable: no-switch-case-fall-through */
import {Player, Character, Opponent} from "../models/player.model";
import * as myPlayer from "../actions/my-player.actions";
import * as player from "../actions/player.actions";
import * as stats from "../actions/stats.actions";
import {Observable} from "rxjs";
import {DTRStats} from "../models/stats.model";


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

export function reducer(state = initialState, action: player.Actions | myPlayer.Actions | stats.Actions): State {
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

    case player.ActionTypes.OPPONENTS_FOUND: {
      const playerId = action.payload[1];
      const opponentHistory = action.payload[0];
      if (opponentHistory.length < 1) {
        return state;
      }

      const matches = opponentHistory.map(opponent => {
        return {
          id: opponent.instanceId,
          standing: parseInt(opponent.standing) > 0 ? 'Lost' : 'Won'
        }
      });
      const losses = opponentHistory.reduce((total, current) => {
        return total + parseInt(current.standing);
      }, 0);

      const playerKills = opponentHistory.reduce((total, current) => {
        return total + parseInt(current.pkills);
      }, 0);

      const playerDeaths = opponentHistory.reduce((total, current) => {
        return total + parseInt(current.pdeaths);
      }, 0);

      const opponentKills = opponentHistory.reduce((total, current) => {
        return total + parseInt(current.okills);
      }, 0);

      const opponentDeaths = opponentHistory.reduce((total, current) => {
        return total + parseInt(current.odeaths);
      }, 0);

      const opponents = Object.assign({}, {
        opponentHistory: {
          matches: matches.length,
          instanceIds: matches,
          losses: losses,
          wins: matches.length - losses,
          playerKd: playerKills / Math.max(1, playerDeaths),
          opponentKd: opponentKills / Math.max(1, opponentDeaths)
        }
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? Object.assign({}, state.player1, opponents) : state.player1,
        player2: playerId == 'player2' ? Object.assign({}, state.player2, opponents) : state.player2,
        player3: playerId == 'player3' ? Object.assign({}, state.player3, opponents) : state.player3,
      });
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

    case stats.ActionTypes.DTR_STATS: {
      const dtrStats: DTRStats = action.payload[0];
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        badges: dtrStats.badges,
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
