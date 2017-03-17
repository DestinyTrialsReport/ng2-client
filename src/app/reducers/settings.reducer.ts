/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as settings from '../actions/settings.actions';

export interface State {
  stats: {[name: string]: boolean}
}

const initialState: State = {
  stats: {
    weeklyStats: true,
    mapStats: false
  }
};

export function reducer(state = initialState, action: settings.Actions): State {
  switch (action.type) {

    case settings.ActionTypes.TOGGLE_SETTING: {
      const payload = action.payload;

      const newSettings = Object.assign({}, state.stats, {
        [payload.name]: payload.value
      });

      return Object.assign({}, state, newSettings);
    }
    default: {
      return state;
    }
  }
}

export const getStats = (state: State) => state.stats;
