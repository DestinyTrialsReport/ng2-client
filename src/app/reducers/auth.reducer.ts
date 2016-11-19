/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as auth from '../actions/auth.actions';
import { Observable } from "rxjs";
import { AuthToken } from "../models/auth.model";

export interface State {
  accessToken: string;
  refreshToken: string;
  authState: string;
}

const initialToken: AuthToken = {
  value: '',
  readyin: -1,
  expires: -1
};

const initialState: State = {
  accessToken: '',
  refreshToken: '',
  authState: ''
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {

    case auth.ActionTypes.REDIRECT_TO_AUTH: {
      const authState: string = action.payload;

      return Object.assign({}, state, {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        authState: authState
      });
    }

    case auth.ActionTypes.STORE_TOKEN: {
      console.log(action)
      const authResponse: any = action.payload;
      console.log(authResponse);
      const authState: string = authResponse.authState;
      const accessToken: string = authResponse.accessToken;
      const refreshToken: string = authResponse.refreshToken;

      return Object.assign({}, state, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        authState: authState
      });
    }

    default: {
      return Object.assign({}, state, {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        authState: state.authState
      });
    }
  }
}

export function getState(state$: Observable<State>) {
  return state$.select(state => state.authState);
}
