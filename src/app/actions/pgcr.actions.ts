/* tslint:disable: member-ordering */
import { Action }       from '@ngrx/store';
import { type }         from '../util';
import {PGCR, Entry} from "../models/pgcr.model";

export const ActionTypes = {
  SEARCH_PGCR:    type('[PGCR] PGCR Search'),
  LOAD_PGCR:      type('[PGCR] PGCR Load'),
  STORE_PGCR:     type('[PGCR] PGCR Store')
};

export class SearchPGCR implements Action {
  type = ActionTypes.SEARCH_PGCR;

  constructor(public payload: {matchId: string, player: string}) { }
}

export class LoadPGCR implements Action {
  type = ActionTypes.LOAD_PGCR;

  constructor(public payload: {matches: PGCR[], player: string}) { }
}

export class StorePGCR implements Action {
  type = ActionTypes.STORE_PGCR;

  constructor(public payload: {entry: Entry, player: string, definitions: any}) { }
}

export type Actions
  = SearchPGCR
  | LoadPGCR
  | StorePGCR;
