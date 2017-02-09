import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { LBWeaponType } from "../../models/leaderboard.model";
import {WEAPON_TYPES} from "../../services/constants";
import {Store} from "@ngrx/store";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-weapon-types',
  styleUrls: ['./leaderboards.component.css'],
  host: {
    'class': 'row'
  },
  template: `
  <div class="col-xs-12 col-sm-4 select-container">
    <div class="select">
      <select [ngModel]="leaderboardType" (ngModelChange)="setLeaderboard($event, true)">
        <option value="select-leaderboard" disabled>Select Leaderboard</option>
        <option value="{{type.value}}" *ngFor='let type of leaderboardTypes; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Leaderboard</div>
  </div>
  <div class="col-xs-12 col-sm-4 select-container">
    <div class="select">
      <select [(ngModel)]="weaponType" (ngModelChange)="getType($event)">
        <option value="{{type.value}}" *ngFor='let type of weaponTypes; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Weapon Type</div>
  </div>
  <div class="col-xs-12 col-sm-4 select-container">
    <div class="select">
      <select [(ngModel)]="weaponTier" (ngModelChange)="filterTier($event)">
        <option value="{{type.value}}" *ngFor='let type of weaponTiers; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Tier</div>
  </div>
  
  <div class="stat-table col-xs-12">
    <hr>
    <div class="stat-table__row row row--small-gutter">
      <div class="col-xs-2">
        <div class="stat-header">Kills</div>
      </div>
      <div class="col-xs-6">
        <div class="stat-header">Weapon</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Headshots</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let weapon of weapons | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }'>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.kills | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-6">
        <img [src]="weapon?.icon"
             [alt]="weapon?.name"
             class="weapon-icon__small">
        <a [innerHtml]="weapon?.name" [routerLink]="['/']" [queryParams]="{weaponHash: weapon?.id}"></a>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.headshots | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.matches | number:'1.0-0'"></span>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardWeaponTypesComponent implements OnInit {
  @Input() weapons: LBWeaponType[];
  @Input() itemsPerPage: number;
  @Input() weaponType: string;
  @Input() weaponTier: number;
  @Input() currentPage: number;
  @Input() currentWeek: number;
  @Input() leaderboardType: number;
  @Input() leaderboardTypes: Array<any>;

  weaponTypes: Array<{value: string, text: string}> = [
    {value: "All", text: "All"},
    {value: "Auto Rifle", text: "Auto Rifles"},
    {value: "Scout Rifle", text: "Scout Rifles"},
    {value: "Pulse Rifle", text: "Pulse Rifles"},
    {value: "Hand Cannon", text: "Hand Cannons"},
    {value: "Sniper Rifle", text: "Sniper Rifles"},
    {value: "Fusion Rifle", text: "Fusion Rifles"},
    {value: "Shotgun", text: "Shotguns"},
    {value: "Sidearm", text: "Sidearms"},
  ];

  weaponTiers: Array<{value: number, text: string}> = [
    {value: 0, text: "All"},
    {value: 6, text: "Exotic"},
    {value: 5, text: "Legendary"},
    {value: 4, text: "Rare"},
    {value: 3, text: "Uncommon"},
    {value: 2, text: "Common"},
  ];

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getType(this.weaponType);
  }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type}));
  }

  getType(weaponType: string) {
    if (WEAPON_TYPES.indexOf(weaponType) < 0) {
      weaponType = 'All';
    }

    this.store.dispatch(new leaderboardActions.GetWeaponTypeAction({type: weaponType, week: this.currentWeek}));
  }

  filterTier(tier: number) {
    if (!tier) {
      tier = 0;
    }

    this.store.dispatch(new leaderboardActions.FilterByTierAction(tier));
  }
}
