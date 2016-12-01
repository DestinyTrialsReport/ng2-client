/* tslint:disable: member-ordering */
import {Player, Character} from '../models/player.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  SEARCH_MY_PLAYER:    type('[MyPlayer] Search Player'),
  SEARCH_MY_COMPLETE:  type('[MyPlayer] Search Player Complete'),
  SEARCH_MY_ACCOUNT:   type('[MyPlayer] Search Account'),
  SEARCH_MY_FAILED:    type('[MyPlayer] Search Player Failed'),
  SEARCH_MY_TEAMMATES: type('[MyPlayer] Search Teammates'),
};

export class SearchMyPlayer implements Action {
  type = ActionTypes.SEARCH_MY_PLAYER;

  constructor(public payload: {platform: number, name: string}) { }
}

export class SearchMyCompleteAction implements Action {
  type = ActionTypes.SEARCH_MY_COMPLETE;

  constructor(public payload: [Player, string]) { }
}

export class SearchMyAccount implements Action {
  type = ActionTypes.SEARCH_MY_ACCOUNT;

  constructor(public payload: [Player, string]) { }
}

export class SearchMyFailed implements Action {
  type = ActionTypes.SEARCH_MY_FAILED;

  constructor(public payload: Error) { }
}

export type Actions
  = SearchMyPlayer
  | SearchMyAccount
  | SearchMyFailed
  | SearchMyCompleteAction;
