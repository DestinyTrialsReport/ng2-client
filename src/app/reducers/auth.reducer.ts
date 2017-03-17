/* tslint:disable: no-switch-case-fall-through */
import '@ngrx/core/add/operator/select';
import * as auth from '../actions/auth.actions';
import { Observable } from "rxjs";

export interface State {
  accessToken: string;
  refreshToken: string;
  authState: string;
  currentUser: any;
}

const initialState: State = {
  accessToken: '',
  refreshToken: '',
  authState: '',
  currentUser: null
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

    case auth.ActionTypes.STORE_CURRENT_USER: {
      const body = action.payload;

      const accountsByLastPlayed = body.destinyAccounts
        .sort((accountA: any, accountB: any) => {
          let dateA: any = new Date(accountA.lastPlayed);
          let dateB: any = new Date(accountB.lastPlayed);
          return dateA - dateB;
        })[0];

      return Object.assign({}, state, {
        currentUser: Object.assign({}, accountsByLastPlayed, {
          bungieNetUser: body.bungieNetUser
        })
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
