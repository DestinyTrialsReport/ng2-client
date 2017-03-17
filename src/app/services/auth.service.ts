import {Injectable, OnDestroy} from '@angular/core';
import { Http } from '@angular/http';
import { RequestBase } from './request-base';
import { BUNGIE_BASE_URL } from "./constants";
import {Observable, Subscription} from "rxjs";
import { AuthResponse } from "../models/auth.model";
import {Store} from "@ngrx/store";
import * as fromRoot      from '../reducers';

@Injectable()
export class AuthService extends RequestBase implements OnDestroy {

  paramSubscription$: Subscription;
  accessToken: string;

  constructor(public http: Http,
              private store: Store<fromRoot.State>) {
    super(http);
    this.paramSubscription$ = store.select(fromRoot.getAuthState)
      .map(state => {
        if (state.accessToken) {
          return `Bearer ${state.accessToken}`;
        }
      })
      .subscribe(accessToken => {
        return this.optionsNoPre.headers.append('Authorization', accessToken)
    });
  }

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }

  getTokensFromCode(code: string): Observable<AuthResponse> {
    return this.http.post(`${BUNGIE_BASE_URL}/App/GetAccessTokensFromCode/`,
      JSON.stringify({"code": code}), this.options)
      .map(res => res.json().Response);
      // .catch(this.handleErrors);
  }

  getTokensFromRefreshToken(refreshToken: string): Observable<AuthResponse> {
    let body = {refreshToken: refreshToken};
    return this.http.post(`${BUNGIE_BASE_URL}/App/GetAccessTokensFromRefreshToken/`,
      JSON.stringify(body), this.options)
      .map(res => res.json().Response);
  }

  getCurrentBnetUser(): Observable<any> {
    return this.http.get(`${BUNGIE_BASE_URL}/User/GetCurrentBungieAccount/`, this.optionsNoPre)
      .map(res => {
        return res.json().Response
      })
  }

}
