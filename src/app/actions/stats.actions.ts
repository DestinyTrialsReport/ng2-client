/* tslint:disable: member-ordering */
import { DTRStats, BNGStats, GGGStats } from '../models/stats.model';
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  STATS_PLAYER1_SUCCESS:      type('[Stats] Player1 Success'),
  STATS_PLAYER2_SUCCESS:      type('[Stats] Player2 Success'),
  STATS_PLAYER3_SUCCESS:      type('[Stats] Player3 Success'),
  BNG_STATS_PLAYER1_SUCCESS:  type('[Stats] BNG Player1 Success'),
  BNG_STATS_PLAYER2_SUCCESS:  type('[Stats] BNG Player2 Success'),
  BNG_STATS_PLAYER3_SUCCESS:  type('[Stats] BNG Player3 Success'),
  BNG_STATS_FAILED:           type('[Stats] Load BNG Failed'),
  STATS_FAILED:               type('[Stats] Load Stats Failed'),
};

export class StatsPlayer1SuccessAction implements Action {
  type = ActionTypes.STATS_PLAYER1_SUCCESS;

  constructor(public payload: [DTRStats, GGGStats]) { }
}

export class StatsPlayer2SuccessAction implements Action {
  type = ActionTypes.STATS_PLAYER2_SUCCESS;

  constructor(public payload: [DTRStats, GGGStats]) { }
}

export class StatsPlayer3SuccessAction implements Action {
  type = ActionTypes.STATS_PLAYER3_SUCCESS;

  constructor(public payload: [DTRStats, GGGStats]) { }
}

export class BngStatPlayer1SuccessActions implements Action {
  type = ActionTypes.BNG_STATS_PLAYER1_SUCCESS;

  constructor(public payload: BNGStats) { }
}

export class BngStatPlayer2SuccessActions implements Action {
  type = ActionTypes.BNG_STATS_PLAYER2_SUCCESS;

  constructor(public payload: BNGStats) { }
}

export class BngStatPlayer3SuccessActions implements Action {
  type = ActionTypes.BNG_STATS_PLAYER3_SUCCESS;

  constructor(public payload: BNGStats) { }
}

export class BngStatFailedActions implements Action {
  type = ActionTypes.BNG_STATS_FAILED;

  constructor(public payload: any) { }
}

export class StatsFailedAction implements Action {
  type = ActionTypes.STATS_FAILED;

  constructor(public payload: any) { }
}

export type Actions
  = BngStatPlayer1SuccessActions
  | BngStatPlayer2SuccessActions
  | BngStatPlayer3SuccessActions
  | StatsPlayer1SuccessAction
  | StatsPlayer2SuccessAction
  | StatsPlayer3SuccessAction
  | StatsFailedAction
  | BngStatFailedActions;
