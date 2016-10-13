import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DTR_BASE_URL } from './constants';
import { RequestBase } from './request-base';
import { Step, Talent } from "../models/manifest.model";
import { Item } from "../models/inventory.model";

export type InternalStateType = {
  [key: string]: any
};


@Injectable()
export class ManifestService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  _state: InternalStateType = { };

  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  version(): Observable<any> {
    return this.http.get(`${DTR_BASE_URL}/manifest/en/version`)
      .map(res => res.json());
  }

  maps(): Observable<any> {
    return this.http.get(`${DTR_BASE_URL}/manifest/en/DestinyCrucibleMapDefinition.json`)
      .map(res => res.json());
  }

  items(): Observable<Item[]> {
    return this.http.get(`${DTR_BASE_URL}/manifest/v2/ng2/DestinyItemsDefinition.json`)
      .map(res => res.json());
  }

  talent(): Observable<Talent[]> {
    return this.http.get(`${DTR_BASE_URL}/manifest/v2/ng2/DestinyTalentGridDefinition.json`)
      .map(res => res.json());
  }

  steps(): Observable<Step[]> {
    return this.http.get(`${DTR_BASE_URL}/manifest/v2/ng2/DestinyStepsDefinition.json`)
      .map(res => res.json());
  }
}
