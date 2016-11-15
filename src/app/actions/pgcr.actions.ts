/* tslint:disable: member-ordering */
import { Action }       from '@ngrx/store';
import { type }         from '../util';
import { PGCR } from "../models/pgcr.model";

export const ActionTypes = {
  SEARCH_PGCR:    type('[PGCR] PGCR Search'),
  LOAD_PGCR:      type('[PGCR] PGCR Load'),
  STORE_PGCR:     type('[PGCR] PGCR Store')
};

export class SearchPGCR implements Action {
  type = ActionTypes.SEARCH_PGCR;

  constructor(public payload: string[]) { }
}

export class LoadPGCR implements Action {
  type = ActionTypes.LOAD_PGCR;

  constructor(public payload: PGCR[]) { }
}

export class StorePGCR implements Action {
  type = ActionTypes.STORE_PGCR;

  constructor(public payload: PGCR[]) { }
}

export type Actions
  = SearchPGCR
  | LoadPGCR
  | StorePGCR;
