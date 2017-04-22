import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {DTR_BASE_URL, GGG_BASE_URL, BUNGIE_BASE_URL, API_KEYS, API_KEY} from './constants';
import { Player } from "../models/player.model";
import { DTRStats, GGGStats } from "../models/stats.model";
import { Inventory } from "../models/inventory.model";
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/retry'

@Injectable()
export class PlayerService {

  constructor(public http: Http) {}

  search(platform: number, name: string): Observable<Player> {
    return this.http.get(`${BUNGIE_BASE_URL}/Destiny/SearchDestinyPlayer/${platform}/${name}/`, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Api-key': API_KEY
      })
    })).map(res => res.json().Response[0]);
  }

  account(platform: number, membershipId: string): Observable<Player> {
    return this.http.get(`${BUNGIE_BASE_URL}/Destiny/${platform}/Account/${membershipId}/`, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Api-key': API_KEY
      })
    })).map(res => res.json().Response.data);
  }

  inventory(platform: number, membershipId: string, characterId: string): Observable<Inventory[]> {
    return this.http.get(`${BUNGIE_BASE_URL}/Destiny/${platform}/Account/${membershipId}/Character/${characterId}/Inventory/`, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Api-key': API_KEY
      })
    })).map(res => res.json().Response.data.buckets.Equippable);
  }

  // activities(platform: number, membershipId: string, characterId: string): Observable<any[]> {
  //   return this.http.get(`${BUNGIE_BASE_URL}/Destiny/Stats/ActivityHistory/${platform}/${membershipId}/${characterId}/?mode=14&count=20`, this.options)
  //     .map(res => res.json().Response.data.activities);
  // }

  dtrStats(membershipId: string): Observable<DTRStats> {
    return this.http.get(`${DTR_BASE_URL}/v2/player/${membershipId}/`)
      .map(res => res.json()[0]);
  }

  gggStats(membershipId: string): Observable<GGGStats> {
    return this.http.get(`${GGG_BASE_URL}/dtr/elo?alpha=${membershipId}/`)
      .map(res => res.json().players);
  }

  bngStats(platform: number, membershipId: string, characterId: string): Observable<any[]> {
    return this.http.get(`${BUNGIE_BASE_URL}/Destiny/Stats/${platform}/${membershipId}/${characterId}/?modes=14`, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Api-key': API_KEY
      })
    })).map(res => res.json().Response.trialsOfOsiris.allTime);
  }

  pgcr(instanceId: string): Observable<any> {
    return this.http.get(`${BUNGIE_BASE_URL}/Destiny/Stats/PostGameCarnageReport/${instanceId}/`, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Api-key': API_KEY
      })
    })).map(res => res.json().Response.data);
  }

  getOpponentHistory(userId: string, opponentId: string): Observable<any> {
    return this.http.get(`${DTR_BASE_URL}/v2/player/${userId}/opponents/${opponentId}/`)
      .map(res => {
        return res.json()
      })
  }

}
