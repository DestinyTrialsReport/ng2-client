/* tslint:disable: no-switch-case-fall-through */
import { PGCR } from "../models/pgcr.model";
import * as pgcr from "../actions/pgcr.actions";
import {Observable} from "rxjs";


export interface State {
  collection: { [instanceId: string]: PGCR };
}

const initialState: State = {
  collection: {}
};

export function reducer(state = initialState, action: pgcr.Actions): State {
  switch (action.type) {

    case pgcr.ActionTypes.STORE_PGCR: {
      const matches = action.payload;
      const newMatches = matches.filter(pgcr => !state.collection[pgcr.activityDetails.instanceId]);

      const newPGCRCollection = newMatches
        .reduce((collection: { [id: string]: PGCR }, pgcr: PGCR) => {
          return Object.assign(collection, {
            [pgcr.activityDetails.instanceId]: pgcr
          });
        }, {});

      return {
        collection: Object.assign({}, state.collection, newPGCRCollection)
      };
    }

    default: {
      return state;
    }
  }
}

export function getCollection(state$: Observable<State>) {
  return state$.select(state => state.collection);
}
