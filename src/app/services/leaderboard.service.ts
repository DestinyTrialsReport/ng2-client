import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DTR_BASE_URL } from './constants';
import { RequestBase } from './request-base';
import { LBWeaponType } from "../models/leaderboard.model";

@Injectable()
export class LeaderboardService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  weaponType(type: string, week: number): Observable<LBWeaponType[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/weapons/${week}/${type}/`)
      .map(res => res.json());
  }
}
