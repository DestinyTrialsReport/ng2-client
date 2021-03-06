import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DTR_BASE_URL } from './constants';
import { RequestBase } from './request-base';
import {LBWeaponType, LBWeaponPercentage} from "../models/leaderboard.model";

@Injectable()
export class LeaderboardService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  weaponType(type: string, week: number): Observable<LBWeaponType[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/weapons/${week}/${type}/`)
      .map(res => res.json());
  }

  getMedal(medalId: any, week: number): Observable<any[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/medals/${week}/${medalId}/`)
      .map(res => res.json());
  }

  playerWeapons(weaponId: string, week: number): Observable<LBWeaponType[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/players/${weaponId}/${week}/`)
      .map(res => res.json());
  }

  playerWeaponTypes(type: string, week: number): Observable<LBWeaponType[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/players/types/${week}/${type}/`)
      .map(res => res.json());
  }

  searchPlayer(membershipId: string, week: number): Observable<{medals: Array<any>, weapons: Array<any>}> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/search/${membershipId}/${week}/`)
      .map(res => res.json());
  }

  weaponPercentage(week: number): Observable<LBWeaponPercentage[]> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/percentage/${week}/`)
      .map(res => res.json());
  }

  getWeaponIds(week: number): Observable<Array<{itemHash: any, itemTypeName: any}>> {
    return this.http.get(`${DTR_BASE_URL}/leaderboard/weaponIds/${week}/`)
      .map(res => res.json());
  }
}
