import { Action } from '@ngrx/store';
import { type } from '../util';
import {Step, Item} from "../models/inventory.model";


export const ActionTypes = {
  ADD_ITEM_DEFINITION:             type('[Manifest] Add ItemDefinition'),
  ADD_ITEM_DEFINITION_SUCCESS:     type('[Manifest] Add ItemDefinition Success'),
  ADD_ITEM_DEFINITION_FAIL:        type('[Manifest] Add ItemDefinition Fail'),
  REMOVE_ITEM_DEFINITION:          type('[Manifest] Remove ItemDefinition'),
  REMOVE_ITEM_DEFINITION_SUCCESS:  type('[Manifest] Remove ItemDefinition Success'),
  REMOVE_ITEM_DEFINITION_FAIL:     type('[Manifest] Remove ItemDefinition Fail'),
  LOAD:                 type('[Manifest] Load'),
  LOAD_SUCCESS:         type('[Manifest] Load Success'),
  LOAD_FAIL:            type('[Manifest] Load Fail'),
};


/**
 * Add ItemDefinition to Manifest Actions
 */
export class AddItemDefinitionAction implements Action {
  type = ActionTypes.ADD_ITEM_DEFINITION;

  constructor(public payload: Step) { }
}

export class AddItemDefinitionSuccessAction implements Action {
  type = ActionTypes.ADD_ITEM_DEFINITION_SUCCESS;

  constructor(public payload: Step) { }
}

export class AddItemDefinitionFailAction implements Action {
  type = ActionTypes.ADD_ITEM_DEFINITION_FAIL;

  constructor(public payload: Step) { }
}


/**
 * Removje ItemDefinition from Manifest Actions
 */
export class RemoveItemDefinitionAction implements Action {
  type = ActionTypes.REMOVE_ITEM_DEFINITION;

  constructor(public payload: Step) { }
}

export class RemoveItemDefinitionSuccessAction implements Action {
  type = ActionTypes.REMOVE_ITEM_DEFINITION_SUCCESS;

  constructor(public payload: Step) { }
}

export class RemoveItemDefinitionFailAction implements Action {
  type = ActionTypes.REMOVE_ITEM_DEFINITION_FAIL;

  constructor(public payload: Step) { }
}

/**
 * Load Manifest Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload:[any, any]) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: [Item[], any, string]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddItemDefinitionAction
  | AddItemDefinitionSuccessAction
  | AddItemDefinitionFailAction
  | RemoveItemDefinitionAction
  | RemoveItemDefinitionSuccessAction
  | RemoveItemDefinitionFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
