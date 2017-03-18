/* tslint:disable: member-ordering */
import {Player, Character, Opponent} from '../models/player.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  SEARCH_PLAYER:    type('[Player] Search Player'),
  SEARCH_COMPLETE:  type('[Player] Search Player Complete'),
  SEARCH_ACCOUNT:   type('[Player] Search Account'),
  SEARCH_OPPONENT:   type('[Player] Search Opponent'),
  OPPONENTS_FOUND:   type('[Player] Opponent Found'),
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

export class SearchOpponentAction implements Action {
  type = ActionTypes.SEARCH_OPPONENT;

  constructor(public payload: [string[], string]) { }
}

export class OpponentsFoundAction implements Action {
  type = ActionTypes.OPPONENTS_FOUND;

  constructor(public payload: [Opponent[], string]) { }
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
  | SearchOpponentAction
  | OpponentsFoundAction
  | SearchCompleteAction
  | SearchTeammates;
