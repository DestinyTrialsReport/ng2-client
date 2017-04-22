/* tslint:disable: member-ordering */
import { Action }       from '@ngrx/store';
import { type }         from '../util';
import { Inventory }    from "../models/inventory.model";
import { ItemDefinitions, TalentDefinitions, StepsDefinitions } from "../models/manifest.model";

export const ActionTypes = {
  SEARCH:             type('[Inventory] Inventory Search'),
  INVENTORY_SUCCESS:  type('[Inventory] Inventory Search Successful'),
  INVENTORY_FAILED:   type('[Inventory] Inventory Search Failed'),
};

export class InventoryActions implements Action {

  type = ActionTypes.SEARCH;

  constructor(public payload: {
    membershipType: number;
    membershipId: string;
    characterId: string;
    playerIndex: string;
  }) { }
}

export class InventorySuccessAction implements Action {

  type = ActionTypes.INVENTORY_SUCCESS;

  constructor(public payload: {
    inventory: Inventory[];
    playerIndex: string;
    membershipType?: number;
    membershipId?: string;
    characterId?: string;
  }) { }
}

export class InventoryFailedAction implements Action {

  type = ActionTypes.INVENTORY_FAILED;

  constructor(public payload: {
    inventory: Inventory[];
    player: string;
    itemDefs: ItemDefinitions;
    talentDefs: TalentDefinitions;
    stepsDefs: StepsDefinitions;
  }) { }
}

export type Actions
  = InventoryActions
  | InventorySuccessAction
  | InventoryFailedAction;
