import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { LBWeaponType } from "../../models/leaderboard.model";
import {WEAPON_TYPES, WEAPON_TYPE_REF, MEDALS_REF} from "../../services/constants";
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
      <select [(ngModel)]="selectedType" (ngModelChange)="getType($event)">
        <option value="{{type.value}}" *ngFor='let type of typeCollection[leaderboardType]; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Weapon Type</div>
  </div>
  <!--<div class="col-xs-12 col-sm-8 select-container" *ngIf="leaderboardType === 'players'">-->
    <!--<div class="select">-->
      <!--<input [ngModel]="selectedType"-->
             <!--[typeahead]="weaponList"-->
             <!--[typeaheadOptionField]="'name'"-->
             <!--(typeaheadOnSelect)="getPlayerForWeapon($event)"-->
             <!--placeholder="Enter Weapon Name">-->
    <!--</div>-->
    <!--<div class="stat-label">Weapon Name</div>-->
  <!--</div>-->
  <div class="col-xs-12 col-sm-4 select-container" *ngIf="leaderboardType === 'weapon-types'">
    <div class="select">
      <select [(ngModel)]="selectedFilter" (ngModelChange)="filterItems($event)">
        <option value="{{type.value}}" *ngFor='let type of weaponTiers; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Tier</div>
  </div>
  
  <div class="stat-table col-xs-12">
    <hr>
    <div class="stat-table__row row row--small-gutter">
      <div class="col-xs-2">
        <div class="stat-header" [innerHtml]="leaderboardType === 'medals' ? 'Count' : 'Kills'"></div>
      </div>
      <div class="col-xs-6">
        <div class="stat-header" [innerHtml]="leaderboardType === 'weapon-types' ? 'Weapon' : 'Player'"></div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header" *ngIf="leaderboardType === 'weapon-types'">Headshots</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let item of items | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }'>
      <div class="col-xs-2">
        <span [innerHtml]="(item?.kills || item?.count) | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-6">
        <img [src]="item?.icon"
             [alt]="item?.name"
             class="weapon-icon__small">
        <a [innerHtml]="item?.name" [routerLink]="['/']" [queryParams]="{weaponHash: item?.id}"></a>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="item?.headshots | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="item?.matches | number:'1.0-0'"></span>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardWeaponTypesComponent implements OnInit {
  @Input() items: any[];
  @Input() itemsPerPage: number;
  @Input() selectedType: string;
  @Input() selectedFilter: number;
  @Input() currentPage: number;
  @Input() currentWeek: number;
  @Input() leaderboardType: string;
  @Input() leaderboardTypes: Array<any>;

  typeCollection: any = [
    {
      'weapon-types': WEAPON_TYPE_REF
    },
    {
      'medals': MEDALS_REF
    }
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
    this.getType(this.leaderboardType);
  }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type}));
    this.selectedType = null;
    this.getType(type);
  }

  getType(type: string) {
    switch (type) {
      case 'weapon-types': {
        if (WEAPON_TYPES.indexOf(this.selectedType) < 0) {
          this.selectedType = 'All';
        }
        this.store.dispatch(new leaderboardActions.GetWeaponTypeAction({type: this.selectedType, week: this.currentWeek}));
        return;
      }
      case 'medals': {
        if (!this.selectedType) {
          this.selectedType = '1';
        }
        this.store.dispatch(new leaderboardActions.GetMedalAction({type: this.selectedType, week: this.currentWeek}));
        return;
      }
      case 'players': {
        this.store.dispatch(new leaderboardActions.GetPlayersAction({type: this.selectedType, week: this.currentWeek}));
        return;
      }
    }
  }

  filterItems(tier: number) {
    if (!tier) {
      tier = 0;
    }

    this.store.dispatch(new leaderboardActions.FilterByTierAction(tier));
  }
}
