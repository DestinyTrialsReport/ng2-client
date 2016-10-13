/* tslint:disable: member-ordering */
import { Action }     from '@ngrx/store';
import { type }       from '../util';
import {Activity} from "../models/activity.model";

export const ActionTypes = {
  SEARCH_ACTIVITY:  type('[Activity] Activity Search')
};

export class ActivityActions implements Action {
  type = ActionTypes.SEARCH_ACTIVITY;

  constructor(public payload: [Activity[], string]) { }
}

export type Actions
  = ActivityActions;
