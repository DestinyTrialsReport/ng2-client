/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import {Item} from "../models/inventory.model";
import * as inventoryActions from "../actions/inventory.actions";
import {Observable} from "rxjs/Observable";
import {AppState} from "./index";
import {EQUIPPED_BUCKETS} from "../services/constants";


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
      const items: Item[] = action.payload[0].map(inv => Object.assign({}, inv.items[0], {
        bucketHash: inv.bucketHash,
        nodes: inv.items[0].nodes.filter(node => node.isActivated)
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

export function getPlayerInventory(id:string) {
  return (state$: Observable<AppState>) => {
    return state$.select(s => s.inventory[id])
  }
}
