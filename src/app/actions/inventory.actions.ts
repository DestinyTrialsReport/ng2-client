/* tslint:disable: member-ordering */
import { Action }     from '@ngrx/store';
import { type }       from '../util';
import { Inventory } from "../models/inventory.model";

export const ActionTypes = {
  SEARCH_INVENTORY:  type('[Inventory] Inventory Search')
};

export class InventoryActions implements Action {
  type = ActionTypes.SEARCH_INVENTORY;

  constructor(public payload: [Inventory[], string]) { }
}

export type Actions
  = InventoryActions;
