import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBase } from './request-base';
import { BUNGIE_BASE_URL } from "./constants";
import { Observable } from "rxjs";
import { AuthResponse } from "../models/auth.model";
import {Store} from "@ngrx/store";
import * as fromRoot      from '../reducers';

@Injectable()
export class AuthService extends RequestBase {

  constructor(public http: Http,
              private store: Store<fromRoot.State>) {
    super(http);
    store.let(fromRoot.getAuthState).subscribe(state => {
      if (state.accessToken) {
        return this.optionsNoPre.headers.append('Authorization', `Bearer ${state.accessToken}`)
      }
    });
  }

  getTokensFromCode(code: string): Observable<AuthResponse> {
    let body = {code: code};
    return this.http.post(`${BUNGIE_BASE_URL}/App/GetAccessTokensFromCode/`, body, this.options)
      .map(res => res.json().Response)
  }

  getTokensFromRefreshToken(refreshToken: string): Observable<AuthResponse> {
    let body = {refreshToken: refreshToken};
    return this.http.post(`${BUNGIE_BASE_URL}/App/GetAccessTokensFromRefreshToken/`, body, this.options)
      .map(res => res.json().Response)
  }

  getBnetUser(): Observable<any> {
    return this.http.get(`${BUNGIE_BASE_URL}/User/GetBungieNetUser/`, this.optionsNoPre)
      .map(res => {
        // res.headers.append('Access-Control-Max-Age', '600');
        return res.json()
      })
  }

}
