/* tslint:disable: member-ordering */
import { Action }     from '@ngrx/store';
import { type }       from '../util';

export const ActionTypes = {
  TOGGLE_SETTING:    type('[Settings] Toggle on/off'),
};

export class ToggleSettingsAction implements Action {
  type = ActionTypes.TOGGLE_SETTING;

  constructor(public payload: {name: string, value: boolean}) { }
}

export type Actions
  = ToggleSettingsAction;
