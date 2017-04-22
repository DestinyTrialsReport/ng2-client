 import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DTR_BASE_URL } from './constants';
import { Step, Talent } from "../models/manifest.model";
import { Item } from "../models/inventory.model";
import { MapsService } from "./maps.service";
import { LocalStorageService } from "ng2-webstorage";
import { State } from "../reducers/index";
import { Store } from "@ngrx/store";
import * as mapActions from "../actions/maps.actions";
import {CurrentMap} from "../models/map-stats.model";

 export type InternalStateType = {
   [key: string]: any
 };

@Injectable()
export class ManifestService {

  manifestVersion:string;

  constructor(public http: Http,
              public storage: LocalStorageService,
              public store: Store<State>,
              public mapService: MapsService) {
    this.manifestVersion = this.storage.retrieve('manifestVersion');
  }

  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
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
    return this.http.get(`${DTR_BASE_URL}/manifest/v2/ng2/DestinyItemsDefinition2.json`)
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

  // Ugly but it works! D:

  public _loadManifest: () => Promise<Object> = () => {
    return new Promise((resolve) => {
      this.version().toPromise().then((data: any) => {
        if (this.manifestVersion != data.version) {
          return Observable.forkJoin(
            this.items().map(res => {
              this.storage.store('subclass', JSON.stringify(res['subclass']));
              this.storage.store('armor', JSON.stringify(res['armor']));
              this.storage.store('weapons', JSON.stringify(res['weapons']));
            }),
            this.talent().map(res => this.storage.store('manifestTalents', JSON.stringify(res))),
            this.steps().map(res => this.storage.store('manifestSteps', JSON.stringify(res))),
            Observable.of(data.version).map(res => this.storage.store('manifestVersion', res)),
            this.mapService.currentMap().map(res => this.store.dispatch(new mapActions.SaveCurrentMapAction(res)))
          )
            .toPromise().then((data: [void, void, void, void, void]) => {
              resolve(data);
            })
        } else {
          return this.mapService.currentMap()
            .toPromise().then((map: CurrentMap) => {
              return Observable.of(this.store.dispatch(new mapActions.SaveCurrentMapAction(map)))
                .toPromise().then((data: any) => {
                  resolve(data);
                });
            });
        }
      })
    });
  };

  public loadManifest(): Promise<Object> {
    return this._loadManifest();
  }

  public init() {
    // this.set('primary', this.storage.retrieve('primary'));
    // this.set('special', this.storage.retrieve('special'));
    // this.set('heavy', this.storage.retrieve('heavy'));
    // this.set('items', this.storage.retrieve('manifestItems'));
    this.set('subclass', this.storage.retrieve('subclass'));
    this.set('weapons', this.storage.retrieve('weapons'));
    this.set('armor', this.storage.retrieve('armor'));
    this.set('talents', this.storage.retrieve('manifestTalents'));
    this.set('steps', this.storage.retrieve('manifestSteps'));
  }
}
