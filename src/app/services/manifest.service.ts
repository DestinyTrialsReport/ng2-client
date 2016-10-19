import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { DTR_BASE_URL } from './constants';
import { Step, Talent } from "../models/manifest.model";
import { Item } from "../models/inventory.model";
import { MapsService } from "./maps.service";
import { LocalStorageService } from "ng2-webstorage";
import { AppState } from "../reducers/index";
import { Store } from "@ngrx/store";
import * as mapActions from "../actions/maps.actions";

@Injectable()
export class ManifestService {

  manifestVersion:string;
  manifestItems:any;
  manifestTalents:any;
  manifestSteps:any;

  constructor(public http: Http,
              private storage: LocalStorageService,
              private store: Store<AppState>,
              public mapService: MapsService) {
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

  loadManifest(): Promise<any> {
    this.manifestVersion = this.storage.retrieve('manifestVersion');
    var observable = this.version().map(res => {
      if (this.manifestVersion != res.version || !!this.manifestItems) {
        console.log("manifest updated, reloading: ", res.version);
        return Observable.forkJoin(
          this.items(),
          this.talent(),
          this.steps(),
          Observable.of(res.version),
          this.mapService.currentMap()
        )
      } else {
        console.log('Using stored manifest: ', this.manifestVersion);
        return this.mapService.currentMap().subscribe(map => {
          if (!map) {
            return empty()
          }
          return of(this.store.dispatch(new mapActions.SaveCurrentMapAction(map)));
        });
      }
    });

      observable.subscribe((manifest) => {
        if (manifest) {
          if (manifest[0]) this.storage.store('manifestItems', manifest[0]);
          if (manifest[1]) this.storage.store('manifestTalents', manifest[1]);
          if (manifest[2]) this.storage.store('manifestSteps', manifest[2]);
          if (manifest[3]) this.storage.store('manifestVersion', manifest[3]);
          this.store.dispatch(new mapActions.SaveCurrentMapAction(manifest[4]));
        }
      });

    return observable.toPromise();
  }
}
