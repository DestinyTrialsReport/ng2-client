import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ManifestService} from "./services/manifest.service";
import {MapsService} from "./services/maps.service";
import {DOMEvents} from "./dom.events";
import {AppState} from "./reducers/index";
import {Store} from "@ngrx/store";
import * as mapActions from "./actions/maps.actions";
import {LocalStorageService} from "./ng2-webstorage/services/localStorage";

@Injectable()
export class AppResolver implements Resolve<any> {
  manifestVersion:string;
  manifestItems:any;
  manifestTalents:any;
  manifestSteps:any;
  constructor(private manifestService: ManifestService,
              public mapService: MapsService,
              private domEvents: DOMEvents,
              private store: Store<AppState>,
              private storage: LocalStorageService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.manifestService.version()
      .map(res => {
        // this.manifestVersion = this.storage.retrieve('manifestVersion');
        // this.manifestItems = this.storage.retrieve('manifestItems');
        // this.manifestTalents = this.storage.retrieve('manifestTalents');
        // this.manifestSteps = this.storage.retrieve('manifestSteps');

        if (this.manifestVersion == res.version && !!this.manifestItems) {
          return this.domEvents.triggerOnDocument( "appready" );
        } else {
          return Observable.forkJoin(
            // this.manifestService.maps(),
            this.manifestService.items(),
            this.manifestService.talent(),
            this.manifestService.steps(),
            this.mapService.currentMap()
          )
            .subscribe((manifest) => {
              this.domEvents.triggerOnDocument( "appready" );
              this.storage.store('manifestItems', manifest[0]);
              this.storage.store('manifestTalents', manifest[1]);
              this.storage.store('manifestSteps', manifest[2]);
              this.store.dispatch(new mapActions.SaveCurrentMapAction(manifest[3]));
              this.storage.store('manifestVersion', res.version);
            })
        }
    });
  }

}
