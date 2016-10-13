import {Component, ChangeDetectionStrategy}  from '@angular/core';
import {MapsService}          from "../services/maps.service";
import {AppState}             from "../reducers/index";
import {Store}                from "@ngrx/store";
import {Observable}           from "rxjs/Observable";
import * as mapActions        from "../actions/maps.actions";
import {CurrentMap, MapInfo}  from "../models/map-stats.model";

@Component({
  selector: '[maps]',
  templateUrl: 'maps.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent {
  maxWeek:number;
  currentMap$: Observable<CurrentMap>;
  mapInfo$: Observable<MapInfo>;
  isLastMap: number = .2;
  isFirstMap: number = 1;
  mapName: string;
  mapImage: string;
  mapRef: string;
  mapWeek: number;

  constructor(public mapService: MapsService,
              private store: Store<AppState>) {
    this.mapInfo$ = store.select(state => state.map.mapInfo);
    store.select(state => state.map.currentMap).subscribe(map => {
      this.mapName = map.activityName;
      this.mapImage = 'https://www.bungie.net' + map.pgcrImage;
      this.mapWeek = parseInt(map.week);
      this.maxWeek = parseInt(map.week);
      this.mapRef = map.referenceId;
      this.store.dispatch(new mapActions.SearchMapAction(43));
    });
  }

  previousMap() {
    let prevWeek:number = this.maxWeek - 1;
    if (prevWeek > 1) {
      this.store.dispatch(new mapActions.SearchMapAction(prevWeek));
    } else {
      this.isFirstMap = 1;
    }
  }

  nextMap() {
    let nextWeek:number = this.maxWeek + 1;
    if (nextWeek < 46) {
      this.store.dispatch(new mapActions.SearchMapAction(nextWeek));
    } else {
      this.isLastMap = .2;
    }
  }
}
