/* tslint:disable: member-ordering */
import {Player, Character, Opponent} from '../models/player.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';
import {ItemDefinition} from "../models/manifest.model";
import {Item, Inventory} from "../models/inventory.model";

export const ActionTypes = {
  SEARCH_PLAYER1_ACTION:      type('[Player] Search Player1'),
  SEARCH_PLAYER2_ACTION:      type('[Player] Search Player2'),
  SEARCH_PLAYER3_ACTION:      type('[Player] Search Player3'),
  SEARCH_COMPLETE_PLAYER1:    type('[Player] Search Player1 Complete'),
  SEARCH_COMPLETE_PLAYER2:    type('[Player] Search Player2 Complete'),
  SEARCH_COMPLETE_PLAYER3:    type('[Player] Search Player3 Complete'),
  ACCOUNT_SUCCESS_PLAYER1:    type('[Player] Search Player1 Account'),
  ACCOUNT_SUCCESS_PLAYER2:    type('[Player] Search Player2 Account'),
  ACCOUNT_SUCCESS_PLAYER3:    type('[Player] Search Player3 Account'),
  ACCOUNT_PLAYER1:            type('[Player] Account Player1'),
  ACCOUNT_PLAYER2:            type('[Player] Account Player2'),
  ACCOUNT_PLAYER3:            type('[Player] Account Player3'),
  INVENTORY_PLAYER1:          type('[Inventory] Inventory Player1 Search'),
  INVENTORY_PLAYER2:          type('[Inventory] Inventory Player2 Search'),
  INVENTORY_PLAYER3:          type('[Inventory] Inventory Player3 Search'),
  INVENTORY_PLAYER1_SUCCESS:  type('[Inventory] Inventory Player1 Successful'),
  INVENTORY_PLAYER2_SUCCESS:  type('[Inventory] Inventory Player2 Successful'),
  INVENTORY_PLAYER3_SUCCESS:  type('[Inventory] Inventory Player3 Successful'),

  SEARCH_OPPONENT:   type('[Player] Search Opponent'),
  OPPONENTS_FOUND:   type('[Player] Opponent Found'),
  SEARCH_FAILED:    type('[Player] Search Players Failed'),
  SEARCH_PLAYER_FAILED:    type('[Player] Search Player Failed'),
  SEARCH_TEAMMATES: type('[Player] Search Teammates'),
  INSERT_ITEM:                 type('[Player] Insert Item'),
  LOAD:                 type('[Player] Load'),
  LOAD_SUCCESS:         type('[Player] Load Success'),
  LOAD_FAIL:            type('[Player] Load Fail'),
};

export class SearchPlayer1Action implements Action {
  type = ActionTypes.SEARCH_PLAYER1_ACTION;

  constructor(public payload: {platform: number, name: string}) { }
}

export class SearchPlayer2Action implements Action {
  type = ActionTypes.SEARCH_PLAYER2_ACTION;

  constructor(public payload: {platform: number, name: string}) { }
}

export class SearchPlayer3Action implements Action {
  type = ActionTypes.SEARCH_PLAYER3_ACTION;

  constructor(public payload: {platform: number, name: string}) { }
}

export class SearchPlayer1CompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE_PLAYER1;

  constructor(public payload: Player) { }
}

export class SearchPlayer2CompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE_PLAYER2;

  constructor(public payload: Player) { }
}

export class SearchPlayer3CompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE_PLAYER3;

  constructor(public payload: Player) { }
}

export class SearchPlayer1Account implements Action {
  type = ActionTypes.ACCOUNT_PLAYER1;

  constructor(public payload: {
    membershipType: number,
    membershipId: string,
    displayName?: string
  }) { }
}

export class SearchPlayer2Account implements Action {
  type = ActionTypes.ACCOUNT_PLAYER2;

  constructor(public payload: {
    membershipType: number,
    membershipId: string,
    displayName?: string
  }) { }
}

export class SearchPlayer3Account implements Action {
  type = ActionTypes.ACCOUNT_PLAYER3;

  constructor(public payload: {
    membershipType: number,
    membershipId: string,
    displayName?: string
  }) { }
}

export class AccountPlayer1Success implements Action {
  type = ActionTypes.ACCOUNT_SUCCESS_PLAYER1;

  constructor(public payload: Player) { }
}

export class AccountPlayer2Success implements Action {
  type = ActionTypes.ACCOUNT_SUCCESS_PLAYER2;

  constructor(public payload: Player) { }
}

export class AccountPlayer3Success implements Action {
  type = ActionTypes.ACCOUNT_SUCCESS_PLAYER3;

  constructor(public payload: Player) { }
}

export class SearchOpponentAction implements Action {
  type = ActionTypes.SEARCH_OPPONENT;

  constructor(public payload: [string[], string]) { }
}

export class OpponentsFoundAction implements Action {
  type = ActionTypes.OPPONENTS_FOUND;

  constructor(public payload: [Opponent[], string]) { }
}

export class InventoryPlayer1Action implements Action {

  type = ActionTypes.INVENTORY_PLAYER1;

  constructor(public payload: {
    membershipType: number;
    membershipId: string;
    characterId: string;
  }) { }
}

export class InventoryPlayer2Action implements Action {

  type = ActionTypes.INVENTORY_PLAYER2;

  constructor(public payload: {
    membershipType: number;
    membershipId: string;
    characterId: string;
  }) { }
}

export class InventoryPlayer3Action implements Action {

  type = ActionTypes.INVENTORY_PLAYER3;

  constructor(public payload: {
    membershipType: number;
    membershipId: string;
    characterId: string;
  }) { }
}

export class InventoryPlayer1SuccessAction implements Action {

  type = ActionTypes.INVENTORY_PLAYER1_SUCCESS;

  constructor(public payload: {
    inventory: Inventory[];
    membershipType?: number;
    membershipId?: string;
    characterId?: string;
  }) { }
}

export class InventoryPlayer2SuccessAction implements Action {

  type = ActionTypes.INVENTORY_PLAYER2_SUCCESS;

  constructor(public payload: {
    inventory: Inventory[];
    membershipType?: number;
    membershipId?: string;
    characterId?: string;
  }) { }
}

export class InventoryPlayer3SuccessAction implements Action {

  type = ActionTypes.INVENTORY_PLAYER3_SUCCESS;

  constructor(public payload: {
    inventory: Inventory[];
    membershipType?: number;
    membershipId?: string;
    characterId?: string;
  }) { }
}
export class SearchTeammates implements Action {
  type = ActionTypes.SEARCH_TEAMMATES;

  constructor() { }
}

export class SearchPlayerFailed implements Action {
  type = ActionTypes.SEARCH_PLAYER_FAILED;

  constructor(public payload: Error) { }
}

export class SearchFailed implements Action {
  type = ActionTypes.SEARCH_FAILED;

  constructor(public payload: Error) { }
}

export class InsertItemAction implements Action {
  type = ActionTypes.INSERT_ITEM;

  constructor(public payload: Item[]) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = SearchPlayer1Action
  | SearchPlayer2Action
  | SearchPlayer3Action
  | SearchPlayer1CompleteAction
  | SearchPlayer2CompleteAction
  | SearchPlayer3CompleteAction
  | SearchPlayer1Account
  | SearchPlayer2Account
  | SearchPlayer3Account
  | AccountPlayer1Success
  | AccountPlayer2Success
  | AccountPlayer3Success
  | InventoryPlayer1Action
  | InventoryPlayer2Action
  | InventoryPlayer3Action
  | InventoryPlayer1SuccessAction
  | InventoryPlayer2SuccessAction
  | InventoryPlayer3SuccessAction
  // | SearchAccount
  // | AccountSuccess
  // | SearchFailed
  // | SearchOpponentAction
  // | OpponentsFoundAction
  // | SearchTeammates
  // | LoadAction
  // | LoadSuccessAction
  // | LoadFailAction;
