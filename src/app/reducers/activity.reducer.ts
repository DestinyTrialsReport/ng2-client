/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Activity } from "../models/activity.model";
import * as activityActions from "../actions/activity.actions";


export interface ActivitiesState {
  player1: Activity[];
  player2: Activity[];
  player3: Activity[];
}


const initialState: ActivitiesState = {
  player1: [],
  player2: [],
  player3: []
};

export function activityReducer(state = initialState, action: Action): ActivitiesState {
  switch (action.type) {

    case activityActions.ActionTypes.SEARCH_ACTIVITY: {

      const playerId: string = action.payload[1];

      const activities: Activity[] = action.payload[0]
        .map(activity => Object.assign({}, {
          period: activity.period,
          activityDetails: {
            referenceId: activity.activityDetails.referenceId,
            instanceId: activity.activityDetails.instanceId,
            mode: activity.activityDetails.mode
          },
          values: {
            assists: activity.values.assists,
            kills: activity.values.kills,
            deaths: activity.values.deaths,
            team: activity.values.team,
            standing: activity.values.standing
          }
        }));

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? [...activities] : state.player1,
        player2: playerId == 'player2' ? [...activities] : state.player2,
        player3: playerId == 'player3' ? [...activities] : state.player3
      });
    }

    default: {
      return state;
    }
  }
}
