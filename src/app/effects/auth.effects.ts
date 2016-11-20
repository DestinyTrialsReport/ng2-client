/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";
import * as auth from '../actions/auth.actions';
import * as fromRoot      from '../reducers';
import { LocalStorageService } from "ng2-webstorage";
import {Router} from "@angular/router";

@Injectable()

export class AuthEffects {

  authState: string;
  accessToken: string;
  refreshToken: string;

  constructor(private actions$: Actions,
              private authService: AuthService,
              public storage: LocalStorageService,
              private store: Store<fromRoot.State>,
              private router: Router) {
    this.authState = this.storage.retrieve('authState');
    this.accessToken = this.storage.retrieve('accessToken');
    this.refreshToken = this.storage.retrieve('refreshToken');
  }

  @Effect()
  redirectToAuth: Observable<string> = this.actions$
    .ofType(auth.ActionTypes.REDIRECT_TO_AUTH)
    .map((action: auth.RedirectToAuth) => action.payload)
    .switchMap(state =>
      Observable.combineLatest(
        Observable.of(state).map(token => this.storage.store('authState', token)).take(1),
        () => window.location.href = `https://www.bungie.net/en/Application/Authorize/10670?state=${state}`
      ));

  @Effect()
  loadAuth$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOAD_TOKENS)
    .startWith(new auth.LoadTokens())
    .mergeMap(() => Observable.of(
      new auth.StoreToken({
        authState: this.authState,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      })
    ));

  @Effect()
  storeToLocal$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.STORE_TOKEN)
    .map((action: auth.StoreToken) => action.payload)
    .switchMap(res => {
        return Observable.combineLatest(
          Observable.of(res.accessToken).map(token => this.storage.store('accessToken', token)).take(1),
          Observable.of(res.refreshToken).map(token => this.storage.store('refreshToken', token)).take(1),
          (a,r) => {
            let currentTimestamp: number = new Date().valueOf();
            let lastAuthTimeAgo: number = parseInt(currentTimestamp.toString()) - parseInt(res.authState);
            if ( res.refreshToken && (lastAuthTimeAgo > 1800000) ) {
              return new auth.RefreshTokens(res.refreshToken);
            } else {
              return new auth.StoreTokenSuccess();
            }
          }
        )
    });

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
    .withLatestFrom(this.store.let(fromRoot.getStateFromAuth))
    .map(([payload, store]) => {
      return {
        payload: payload,
        state: store
      }
    })
    .mergeMap(response => {
      if (response.state === response.payload.state) {
        return this.authService.getTokensFromCode(response.payload.code)
          .map(tokens => new auth.StoreToken({
            authState: this.authState,
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
    .mergeMap(payload => {
      return this.authService.getTokensFromRefreshToken(payload)
        .map(tokens => new auth.StoreToken({
          authState: this.authState,
          accessToken: tokens.accessToken.value,
          refreshToken: tokens.refreshToken.value
        }))
        .catch((err) => Observable.of(new auth.ValidateFailed(err)));
    });
}
