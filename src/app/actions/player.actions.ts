/* tslint:disable: member-ordering */
import { Player } from '../models/player.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  SEARCH_PLAYER:    type('[Player] Search Player'),
  SEARCH_COMPLETE:  type('[Player] Search Player Complete'),
  SEARCH_ACCOUNT:   type('[Player] Search Account'),
  SEARCH_FAILED:    type('[Player] Search Player Failed'),
};

export class SearchPlayer implements Action {
  type = ActionTypes.SEARCH_PLAYER;

  constructor(public payload: [number, string, string]) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: [Player, string]) { }
}

export class SearchAccount implements Action {
  type = ActionTypes.SEARCH_ACCOUNT;

  constructor(public payload: [Player, string]) { }
}

export class SearchFailed implements Action {
  type = ActionTypes.SEARCH_FAILED;

  constructor(public payload: Error) { }
}

export type Actions
  = SearchPlayer
  | SearchAccount
  | SearchFailed
  | SearchCompleteAction;
