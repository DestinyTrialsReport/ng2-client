import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {API_KEY} from "./constants";

@Injectable()
export class RequestBase {
  accessToken:any;
  refreshToken:any;
  headers = new Headers();
  options = new RequestOptions({
    headers: this.headers
  });
  optionsNoPre = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Api-key', API_KEY);
  }
}
