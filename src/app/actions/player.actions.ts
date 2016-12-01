/* tslint:disable: member-ordering */
import {Player, Character} from '../models/player.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  SEARCH_PLAYER:    type('[Player] Search Player'),
  SEARCH_COMPLETE:  type('[Player] Search Player Complete'),
  SEARCH_ACCOUNT:   type('[Player] Search Account'),
  SEARCH_FAILED:    type('[Player] Search Players Failed'),
  SEARCH_PLAYER_FAILED:    type('[Player] Search Player Failed'),
  SEARCH_TEAMMATES: type('[Player] Search Teammates'),
};

export class SearchPlayer implements Action {
  type = ActionTypes.SEARCH_PLAYER;

  constructor(public payload: {platform: number, name: string, playerIndex: string}) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: [Player, string]) { }
}

export class SearchAccount implements Action {
  type = ActionTypes.SEARCH_ACCOUNT;

  constructor(public payload: [Character, string]) { }
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

export type Actions
  = SearchPlayer
  | SearchAccount
  | SearchFailed
  | SearchCompleteAction
  | SearchTeammates;
