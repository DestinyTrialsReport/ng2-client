/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import {Activity} from "../models/activity.model";
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
      const activities: Activity[] = action.payload[0];
      const playerId: string = action.payload[1];

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
