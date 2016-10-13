import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {DTR_BASE_URL, GGG_BASE_URL} from './constants';
import { RequestBase } from './request-base';
import {MapData, CurrentMap} from "../models/map-stats.model";

@Injectable()
export class MapsService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  onWeek(week: number): Observable<MapData> {
    return this.http.get(`${DTR_BASE_URL}/maps/week/${week}/`)
      .map(res => res.json());
  }

  currentMap(): Observable<CurrentMap> {
    return this.http.get(`${DTR_BASE_URL}/maps/current/`)
      .map(res => res.json().shift());
  }

  getGuardianWeapons(platform: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${GGG_BASE_URL}/weapon/top?platform=${platform}&mode=14&start=${startDate}&end=${endDate}`)
      .map(res => res.json());
  }

}
