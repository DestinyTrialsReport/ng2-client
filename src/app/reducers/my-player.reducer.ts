/* tslint:disable: no-switch-case-fall-through */
import { Player, Character } from "../models/player.model";
import * as myPlayer from "../actions/my-player.actions";


export interface State {
  player: Player;
  characters: {[id:string]: Character};
  characterIds: string[];
  loaded: boolean;
}

const initialState: State = {
  player: null,
  characters: {},
  characterIds: [],
  loaded: false
};

export function reducer(state = initialState, action: myPlayer.Actions): State {
  switch (action.type) {

    case myPlayer.ActionTypes.SEARCH_MY_COMPLETE: {
      const player = action.payload[0];
      if (!player) {
        return state;
      }

      return Object.assign({}, state, {
        player: player,
        characters: {}
      });
    }

    case myPlayer.ActionTypes.SEARCH_MY_ACCOUNT: {
      const player = action.payload[0];
      const characters: Character[] = player['characters'];

      const newCharacters = characters.reduce((characters: { [id: string]: Character }, character: Character) => {
        return Object.assign(characters, {
          [character.characterBase.characterId]: {
            characterBase: {
              characterId: character.characterBase.characterId,
              powerLevel: character.characterBase.powerLevel,
              grimoireScore: character.characterBase.grimoireScore,
              stats: character.characterBase.stats
            },
            emblemPath: character.emblemPath,
            backgroundPath: character.backgroundPath,
            membershipId: state.player.membershipId,
            membershipType: state.player.membershipType,
            displayName: state.player.displayName
          }
        });
      }, {});

      return {
        player: state.player,
        characters: Object.assign({}, newCharacters),
        characterIds: [...characters.map(character => character.characterBase.characterId)],
        loaded: true
      };
    }

    default: {
      return state;
    }
  }
}
