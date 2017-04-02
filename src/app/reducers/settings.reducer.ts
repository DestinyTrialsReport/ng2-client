/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as settings from '../actions/settings.actions';

export interface State {
  stats: {[name: string]: boolean}
}

const initialState: State = {
  stats: {
    overview: false,
    weeklyStats: true,
    kd: false,
    weeklyWeapons: false,
    mapStats: false,
    mapWeapons: false,
    lastMatchesTab: false,
    statsTab: false,
    equippedTab: false
  }
};

export function reducer(state = initialState, action: settings.Actions): State {
  switch (action.type) {

    case settings.ActionTypes.TOGGLE_SETTING: {
      const payload = action.payload;

      const newSettings = Object.assign({}, state.stats, {
        [payload.name]: payload.value
      });

      return Object.assign({}, state, {
        stats: newSettings
      });
    }
    default: {
      return state;
    }
  }
}

export const getStats = (state: State) => state.stats;
