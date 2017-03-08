/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as auth from '../actions/auth.actions';
import { Observable } from "rxjs";

export interface State {
  accessToken: string;
  refreshToken: string;
  authState: string;
}

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
      const authResponse: any = action.payload;
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

export const getAuthState = (state: State) => state.authState;

export const getRefreshToken = (state: State) => state.refreshToken;
