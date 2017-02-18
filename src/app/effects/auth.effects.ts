/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action, Store, Dispatcher } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";
import * as auth from '../actions/auth.actions';
import * as fromRoot      from '../reducers';

@Injectable()

export class AuthEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<fromRoot.State>) {
  }

  @Effect()
  redirectToAuth: Observable<string> = this.actions$
    .ofType(auth.ActionTypes.REDIRECT_TO_AUTH)
    .map((action: auth.RedirectToAuth) => action.payload)
    .switchMap(state =>
      Observable.of(window.location.href = `https://www.bungie.net/en/Application/Authorize/10670?state=${state}`)
    );

  // @Effect()
  // loadAuth$: Observable<Action> = this.actions$
  //   .ofType(Dispatcher.INIT)
  //   .withLatestFrom(this.store.select(fromRoot.getAuthState))
  //   .map(([ , state ]) => {
  //     let currentTimestamp: number = new Date().valueOf();
  //     let lastAuthTimeAgo: number = parseInt(currentTimestamp.toString()) - parseInt(state.authState);
  //     let refreshToken: boolean = state.refreshToken && (lastAuthTimeAgo > 1800000);
  //     return {
  //       action: refreshToken ? new auth.RefreshTokens(state.refreshToken) : new auth.StoreTokenSuccess()
  //     }
  //   })
  //   .mergeMap(({action}) => Observable.of(action));

  // @Effect()
  // storeSuccess: Observable<Action> = this.actions$
  //   .ofType(auth.ActionTypes.STORE_TOKEN_SUCCESS)
  //   .switchMap(res =>
  //     Observable.of(this.router.navigate(['']))
  //   );

  @Effect()
  validateTokens$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.VALIDATE_TOKEN)
    .map((action: auth.ValidateToken) => action.payload)
    .withLatestFrom(this.store.select(fromRoot.getAuthState))
    .map(([payload, state]) => {
      return {
        payload: payload,
        authState: state.authState
      }
    })
    .mergeMap(response => {
      if (response.authState === response.payload.state) {
        return this.authService.getTokensFromCode(response.payload.code)
          .map(tokens => new auth.StoreToken({
            authState: response.authState,
            accessToken: tokens.accessToken.value,
            refreshToken: tokens.refreshToken.value
          }))
          .catch((err) => Observable.of(new auth.ValidateFailed(err)));
      } else {
        return Observable.from([]);
      }
    });

  @Effect()
  refreshTokens$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.REFRESH_TOKENS)
    .map((action: auth.RefreshTokens) => action.payload)
    .withLatestFrom(this.store.select(fromRoot.getAuthAuthState))
    .map(([payload, state]) => {
      return {
        payload: payload,
        authState: state
      }
    })
    .mergeMap(response => {
      return this.authService.getTokensFromRefreshToken(response.payload)
        .map(tokens => new auth.StoreToken({
          authState: response.authState,
          accessToken: tokens.accessToken.value,
          refreshToken: tokens.refreshToken.value
        }))
        .catch((err) => Observable.of(new auth.ValidateFailed(err)));
    });
}
