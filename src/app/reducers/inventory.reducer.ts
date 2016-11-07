/* tslint:disable: no-switch-case-fall-through */
import { Item } from "../models/inventory.model";
import * as inventoryActions from "../actions/inventory.actions";
import { EQUIPPED_BUCKETS } from "../services/constants";

export interface InventoriesState {
  player1: Item[];
  player2: Item[];
  player3: Item[];
}

const initialState: InventoriesState = {
  player1: [],
  player2: [],
  player3: []
};


export function inventoryReducer(state = initialState, action: inventoryActions.Actions): InventoriesState {
  switch (action.type) {

    case inventoryActions.ActionTypes.SEARCH_INVENTORY: {
      const playerId: string = action.payload[1];
      const items: Item[] = action.payload[0].map(inv => Object.assign({}, {
        bucketHash: inv.bucketHash,
        nodes: inv.items[0].nodes.filter(node => node.isActivated),
        tierType: inv.items[0].tierType,
        itemHash: inv.items[0].itemHash,
        itemLevel: inv.items[0].itemLevel,
        stats: inv.items[0].stats,
        perks: inv.items[0].perks,
        talentGridHash: inv.items[0].talentGridHash,
        damage: inv.items[0].damage
      }))
        .filter(item => EQUIPPED_BUCKETS.indexOf(item.bucketHash) > -1);

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
