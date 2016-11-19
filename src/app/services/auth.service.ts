import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBase } from './request-base';
import { BUNGIE_BASE_URL } from "./constants";
import { Observable } from "rxjs";
import { AuthResponse } from "../models/auth.model";
import {LocalStorageService} from "ng2-webstorage";

@Injectable()
export class AuthService extends RequestBase {
  accessToken:any;
  refreshToken:any;

  constructor(public http: Http,
              public storage: LocalStorageService) {
    super(http);
    storage.observe('accessToken').subscribe(token => {
      if (token) {
        return this.optionsNoPre.headers.append('Authorization', `Bearer ${token}`)
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
        // res.headers.set('Access-Control-Max-Age', '600');
        // res.headers.append('Access-Control-Max-Age', '600');
        return res.json()
      })
  }

}
