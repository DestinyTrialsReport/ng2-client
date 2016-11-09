/* tslint:disable: member-ordering */
import { DTRStats, BNGStats, GGGStats } from '../models/stats.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  BNG_STATS:  type('[Stats] BNG'),
  DTR_STATS:  type('[Stats] DTR'),
  GGG_STATS:  type('[Stats] GGG'),
};

export class BngStatActions implements Action {
  type = ActionTypes.BNG_STATS;

  constructor(public payload: [BNGStats, string]) { }
}

export class DtrStatActions implements Action {
  type = ActionTypes.DTR_STATS;

  constructor(public payload: [DTRStats, string]) { }
}

export class GggStatActions implements Action {
  type = ActionTypes.GGG_STATS;

  constructor(public payload: [GGGStats, string, string]) { }
}

export type Actions
  = BngStatActions
  | DtrStatActions
  | GggStatActions;
