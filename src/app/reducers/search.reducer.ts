/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as playerActions from '../actions/player.actions';
import {Action} from "@ngrx/store";


export interface SearchState {
  id: string;
  name: string,
  loading: boolean;
  loaded: boolean;
  query: string;
};

const initialState: SearchState = {
  id: '',
  name: '',
  loading: false,
  loaded: false,
  query: ''
};

export function reducer(state = initialState, action: Action): SearchState {
  switch (action.type) {
    // case playerActions.ActionTypes.SEARCH_PLAYER: {
    //   const query = action.payload;
    //
    //   if (query === '') {
    //     return {
    //       id: null,
    //       name: null,
    //       loading: false,
    //       loaded: false,
    //       query
    //     };
    //   }
    //
    //   return Object.assign({}, state, {
    //     query,
    //     loading: true,
    //     loaded: false
    //   });
    // }
    //
    // case playerActions.ActionTypes.SEARCH_COMPLETE: {
    //   const searched: any = action.payload;
    //
    //   if (!searched) {
    //     return {
    //       id: null,
    //       name: null,
    //       loading: false,
    //       loaded: false,
    //       query: state.query
    //     };
    //   }
    //
    //   return {
    //     id: searched.membershipId,
    //     name: searched.displayName,
    //     loading: false,
    //     loaded: true,
    //     query: state.query
    //   };
    // }

    default: {
      return state;
    }
  }
}

export function getStatus(state$: Observable<SearchState>) {
  return state$.select(state => state.loaded);
}

export function getSearchedId(state$: Observable<SearchState>) {
  return state$.select(state => state.id);
}

export function getQuery(state$: Observable<SearchState>) {
  return state$.select(state => state.query);
}

export function getLoading(state$: Observable<SearchState>) {
  return state$.select(state => state.loading);
}
