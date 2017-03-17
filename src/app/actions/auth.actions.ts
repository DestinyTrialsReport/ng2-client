/* tslint:disable: member-ordering */
import { Action }       from '@ngrx/store';
import { type }         from '../util';

export const ActionTypes = {
  REDIRECT_TO_AUTH:     type('[Auth] Redirect'),
  LOAD_TOKENS:          type('[Auth] Load Tokens'),
  STORE_CURRENT_USER:   type('[Auth] Store Current User'),
  REFRESH_TOKENS:       type('[Auth] Refresh Tokens'),
  STORE_TOKEN:          type('[Auth] Store Tokens'),
  STORE_TOKEN_SUCCESS:  type('[Auth] Store Token Success'),
  VALIDATE_TOKEN:       type('[Auth] Validate Token'),
  VALIDATE_FAILED:      type('[Auth] Validate Failed')
};

export class RedirectToAuth implements Action {
  type = ActionTypes.REDIRECT_TO_AUTH;

  constructor(public payload: string) { }
}

export class LoadTokens implements Action {
  type = ActionTypes.LOAD_TOKENS;

  constructor() { }
}

export class StoreCurrentUser implements Action {
  type = ActionTypes.STORE_CURRENT_USER;

  constructor(public payload: any) { }
}

export class RefreshTokens implements Action {
  type = ActionTypes.REFRESH_TOKENS;

  constructor(public payload: string) { }
}

export class StoreToken implements Action {
  type = ActionTypes.STORE_TOKEN;

  constructor(public payload: {
    authState: string,
    accessToken: string,
    refreshToken: string
  }) { }
}

export class StoreTokenSuccess implements Action {
  type = ActionTypes.STORE_TOKEN_SUCCESS;

  constructor() { }
}

export class ValidateToken implements Action {
  type = ActionTypes.VALIDATE_TOKEN;

  constructor(public payload: {code: any, state: string}) { }
}

export class ValidateFailed implements Action {
  type = ActionTypes.VALIDATE_FAILED;

  constructor(public payload: Error) { }
}

export type Actions
  = LoadTokens
  | RedirectToAuth
  | StoreToken
  | StoreCurrentUser
  | RefreshTokens
  | StoreTokenSuccess
  | ValidateToken
  | ValidateFailed;
