import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DTR_BASE_URL } from './constants';
import { Step, Talent } from "../models/manifest.model";
import { Item } from "../models/inventory.model";
import { MapsService } from "./maps.service";
import { LocalStorageService } from "ng2-webstorage";
import { AppState } from "../reducers/index";
import { Store } from "@ngrx/store";
import * as mapActions from "../actions/maps.actions";
import {CurrentMap} from "../models/map-stats.model";

@Injectable()
export class ManifestService {

  manifestVersion:string;
  manifestItems:any;
  manifestTalents:any;
  manifestSteps:any;

  constructor(public http: Http,
              public storage: LocalStorageService,
              public store: Store<AppState>,
              public mapService: MapsService) {
    this.manifestVersion = this.storage.retrieve('manifestVersion');
    this.manifestItems = this.storage.retrieve('manifestItems');
    this.manifestTalents = this.storage.retrieve('manifestTalents');
    this.manifestSteps = this.storage.retrieve('manifestSteps');
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

  // Ugly but it works! D:

  public _loadManifest: () => Promise<Object> = () => {
    return new Promise((resolve) => {
      this.version().toPromise().then((data: any) => {
        if (this.manifestVersion != data.version || !this.manifestItems) {
          return Observable.forkJoin(
            this.items().map(res => this.storage.store('manifestItems', res)),
            this.talent().map(res => this.storage.store('manifestTalents', res)),
            this.steps().map(res => this.storage.store('manifestSteps', res)),
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
}
