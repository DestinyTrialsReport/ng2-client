/* tslint:disable: no-switch-case-fall-through */
import 'rxjs/add/observable/of';
import {Activity, ActivityValue} from "../models/activity.model";
import { Observable } from "rxjs";
import * as activity from "../actions/activity.actions";

export interface State {
  player1: Activity[];
  player2: Activity[];
  player3: Activity[];
}

const initialValue: ActivityValue = {
  statId: null,
  basic: {
    value: null,
    displayValue: null
  }
};

const initialActivity: Activity =  {
  id: null,
  period: null,
  activityDetails: {
    referenceId: null,
    instanceId: null,
    mode: null
  },
  values: {
    assists: initialValue,
    kills: initialValue,
    deaths: initialValue,
    team: initialValue,
    standing: initialValue
  }
};

const initialState: State = {
  player1: [initialActivity],
  player2: [initialActivity],
  player3: [initialActivity]
};


export function reducer(state = initialState, action: activity.Actions): State {
  switch (action.type) {

    case activity.ActionTypes.SEARCH_ACTIVITY: {

      const playerId: string = action.payload[1];

      if (!action.payload[0]) {
        return state;
      }

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
