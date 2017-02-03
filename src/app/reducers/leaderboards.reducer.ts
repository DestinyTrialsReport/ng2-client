/* tslint:disable: no-switch-case-fall-through */
import * as leaderboard from "../actions/leaderboard.actions";
import {LBWeaponType} from "../models/leaderboard.model";


export interface State {
  weapons: LBWeaponType[];
  collection: LBWeaponType[];
}

const initialState: State = {
  weapons: [],
  collection: []
};

export function reducer(state = initialState, action: leaderboard.Actions): State {
  switch (action.type) {

    case leaderboard.ActionTypes.WEAPON_TYPE_SUCCESS: {
      const payload:any = action.payload;

      return Object.assign({}, state, {
        weapons: payload,
        collection: payload
      });
    }

    case leaderboard.ActionTypes.FILTER_BY_TIER: {
      const payload:number = action.payload;
      console.log(payload);
      console.log(state.collection);

      const filtered:any = payload > 0 ? state.collection.filter(c => c.tier === payload) : state.collection;

      return Object.assign({}, state, {
        weapons: [...filtered]
      });
    }

    default: {
      return state;
    }
  }
}

