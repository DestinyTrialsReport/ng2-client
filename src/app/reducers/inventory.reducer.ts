/* tslint:disable: no-switch-case-fall-through */
import { Item } from "../models/inventory.model";
import * as inventory from "../actions/inventory.actions";
import { EQUIPPED_BUCKETS, HIDDEN_NODES } from "../services/constants";
import { Talent, ItemDefinition, ItemDefinitions, TalentDefinitions, StepsDefinitions } from "../models/manifest.model";

export interface State {
  player1: Item[];
  player2: Item[];
  player3: Item[];
}

const initialState: State = {
  player1: [],
  player2: [],
  player3: []
};

export function reducer(state = initialState, action: inventory.Actions): State {
  switch (action.type) {

    case inventory.ActionTypes.SEARCH_INVENTORY: {
      // const itemsDef: ItemDefinitions = action.manifestItems;
      // const stepsDef: StepsDefinitions = action.manifestSteps;
      // const talents: TalentDefinitions = action.manifestTalents;
      const itemsDef: ItemDefinitions = action.payload['itemDefs'];
      const talents: TalentDefinitions = action.payload['talentDefs'];
      const stepsDef: StepsDefinitions = action.payload['stepsDefs'];

      const playerId: string = action.payload['player'];
      const items: Item[] = action.payload['inventory']
        .map(inv => Object.assign({}, {
          bucketHash: inv.bucketHash,
          nodes: inv.items[0].nodes.filter(node => node.isActivated),
          tierType: inv.items[0].tierType,
          itemHash: inv.items[0].itemHash,
          itemLevel: inv.items[0].itemLevel,
          stats: inv.items[0].stats,
          perks: inv.items[0].perks,
          talentGridHash: inv.items[0].talentGridHash,
          primaryStat: inv.items[0].primaryStat,
          damage: inv.items[0].damage
        }))
        .filter(item => EQUIPPED_BUCKETS.indexOf(item.bucketHash) > -1)
        .map(item => {
          if (item && itemsDef) {
            const talentTree:Talent[] = talents[item.talentGridHash];
            const itemDefinition:ItemDefinition = itemsDef[item.itemHash];

            return Object.assign({}, item, {
              n: itemDefinition.n,
              i: itemDefinition.i,
              tT: itemDefinition.tT,
              steps: item.nodes.map(node => {
                const talentNode:Talent = talentTree[node.nodeHash];
                return Object.assign({}, stepsDef[talentNode.s[node.stepIndex]], {
                  h: talentNode.s[node.stepIndex],
                  r: talentNode.r,
                  c: talentNode.c
                });
              })
                .filter(step => step.c > -1)
                .filter(step => HIDDEN_NODES.indexOf(step.h) < 0)
            });
          }
        });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? items : state.player1,
        player2: playerId == 'player2' ? items : state.player2,
        player3: playerId == 'player3' ? items : state.player3
      });
    }

    default: {
      return state;
    }
  }
}
