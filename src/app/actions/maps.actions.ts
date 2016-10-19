/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';
import {MapData, CurrentMap} from "../models/map-stats.model";
import { type }       from '../util';

export const ActionTypes = {
  CURRENT_MAP:      type('[Map] Current Map'),
  SAVE_CURRENT_MAP: type('[Map] Save Current Map'),
  SEARCH_MAP:       type('[Map] Search Map'),
  SEARCH_COMPLETE:  type('[Map] Search Map Complete'),
  SEARCH_FAILED:    type('[Map] Search Map Failed'),
  LOAD_MAP_DATA:    type('[Map] Load Map Data'),
};

export class CurrentMapAction implements Action {
  type = ActionTypes.CURRENT_MAP;

  constructor(public payload: any) { }
}

export class SaveCurrentMapAction implements Action {
  type = ActionTypes.SAVE_CURRENT_MAP;

  constructor(public payload: CurrentMap) { }
}


export class SearchMapAction implements Action {
  type = ActionTypes.SEARCH_MAP;

  constructor(public payload: number) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: number) { }
}

export class SearchFailedAction implements Action {
  type = ActionTypes.SEARCH_FAILED;

  constructor(public payload: Error) { }
}

export class LoadMapDataAction implements Action {
  type = ActionTypes.LOAD_MAP_DATA;

  constructor(public payload: MapData) { }
}

export type Actions
  = SearchMapAction
  | SaveCurrentMapAction
  | CurrentMapAction
  | SearchCompleteAction
  | SearchFailedAction
  | LoadMapDataAction;
