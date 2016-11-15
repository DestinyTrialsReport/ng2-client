/* tslint:disable: no-switch-case-fall-through */
import 'rxjs/add/observable/of';
import { Activity } from "../models/activity.model";
import * as activity from "../actions/activity.actions";
import {Observable} from "rxjs";


export interface State {
  player1: Activity[];
  player2: Activity[];
  player3: Activity[];
}


const initialState: State = {
  player1: [],
  player2: [],
  player3: []
};

export function reducer(state = initialState, action: activity.Actions): State {
  switch (action.type) {

    case activity.ActionTypes.SEARCH_ACTIVITY: {

      const playerId: string = action.payload[1];

      const activities = action.payload[0]
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

export function getActivities(playerIndex: string, amount: number) {
  return (state$: Observable<State>) => {
    return state$.select(state => {
      if (state[playerIndex]) {
        return state[playerIndex].slice(0, amount ? amount : state[playerIndex].length)
      } else {
        return Observable.of([]);
      }
    });
  }
}
