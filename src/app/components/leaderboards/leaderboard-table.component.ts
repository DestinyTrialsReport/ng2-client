import {
  Component, Input, ChangeDetectionStrategy, OnInit, trigger, state, style, transition,
  animate
} from '@angular/core';
import { Store } from "@ngrx/store";
import { TypeaheadMatch } from "ng2-bootstrap";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-table',
  host: {
    'class': 'row'
  },
  animations: [
    trigger('loading', [
      state('void', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 0 })),
      transition('true => *', animate('200ms ease-in-out, opacity linear')),
      transition('false => *', animate('200ms ease-in-out, opacity linear'))
    ])
  ],
  styleUrls: ['./leaderboards.component.css'],
  template: `
  <div class="col-xs-12 col-sm-4 select-container">
    <div class="select">
      <select [ngModel]="leaderboardType" (ngModelChange)="setLeaderboard($event)">
        <option value="select-leaderboard" disabled>Select Leaderboard</option>
        <option value="{{type.value}}" *ngFor='let type of leaderboardTypes; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Leaderboard</div>
  </div>
  
  <div class="col-xs-12 col-sm-4 select-container" 
       [ngClass]="{'col-sm-8': leaderboardType === 'players', 'col-sm-6': leaderboardType === 'medals'}"
       [ngSwitch]="leaderboardType">
    <div class="select" *ngSwitchCase="'players'">
      <input [ngModel]="selectedType"
             [typeahead]="typeSelection"
             [typeaheadOptionField]="'name'"
             (typeaheadOnSelect)="getPlayerForWeapon($event)"
             placeholder="Enter Weapon Name">
    </div>
    <div class="select" *ngSwitchDefault>
      <select [(ngModel)]="selectedType" (ngModelChange)="getType($event)">
        <option value="{{type.id}}" *ngFor='let type of typeSelection; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label" *ngSwitchCase="'players'">Weapon Name</div>
    <div class="stat-label" *ngSwitchDefault>Weapon Type</div>
  </div>

  <div class="col-xs-12 col-sm-4 select-container" *ngIf="leaderboardType === 'weapon-types'">
    <div class="select">
      <select [(ngModel)]="selectedFilter" (ngModelChange)="filterItems($event)">
        <option value="{{type.value}}" *ngFor='let type of weaponTiers; let i = index;' [innerHtml]="type.text"></option>
      </select>
    </div>
    <div class="stat-label">Tier</div>
  </div>
  
  <div class="stat-table col-xs-12" [ngClass]="{loading__background: loading}">
      <div class="stat-table__row row row--small-gutter">
        <div class="col-xs-2">
          <div class="stat-header">Place</div>
        </div>
        <div class="col-xs-2">
          <div class="stat-header" [innerHtml]="leaderboardType === 'medals' ? 'Count' : 'Kills'"></div>
        </div>
        <div class="col-xs-4">
          <div class="stat-header" [innerHtml]="leaderboardType === 'weapon-types' ? 'Weapon' : 'Player'"></div>
        </div>
        <div class="col-xs-2">
          <div class="stat-header" *ngIf="leaderboardType !== 'medals'">Headshots</div>
        </div>
        <div class="col-xs-2">
          <div class="stat-header">Matches</div>
        </div>
      </div>  
    <hr>
  </div>
  <div class="stat-table col-xs-12" [ngClass]="{loading__background: loading}">
   
    <div class="stat-table__row row row--small-gutter middle-xs"
          *ngFor='let item of items | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }; let i = index;'
          [@loading]="loading">
          
      <div class="col-xs-2">
        <span [innerHtml]="item?.rank || ((i + (itemsPerPage * (currentPage - 1))) + 1) | number:'1.0-0'"></span>
      </div>
      
      <div class="col-xs-2">
        <span [innerHtml]="(item?.kills || item?.count) | number:'1.0-0'"></span>
      </div>
      
      <div class="col-xs-4">
        <img *ngIf="leaderboardType === 'weapon-types' && !loading"
             [src]="item?.icon"
             [alt]="item?.name"
             class="weapon-icon__small">
             
        <img *ngIf="leaderboardType !== 'weapon-types' && !loading"
             [src]="'/assets/img/' + (item?.platform == 1 ? 'xbox.svg' : 'ps.svg')"
             [alt]="item?.platform == 1 ? 'xbox' : 'psn'"
             style="float: right;height: 1rem;max-width: 1rem;">
             
        <a [innerHtml]="item?.name" 
           [routerLink]="['/']" 
           [queryParams]="leaderboardType == 'select-leaderboard' ? {gamertag: item?.name, platform: item?.platform} : {weaponHash: item?.id}"></a>
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

export class LeaderboardTableComponent implements OnInit {
  @Input() loading: boolean;
  @Input() items: any[];
  @Input() selectedType: any;
  @Input() selectedFilter: number;
  @Input() typeSelection: Array<{ id: any; statId?: string; text: string; }>;
  @Input() currentPage: number;
  @Input() currentWeek: number;
  @Input() leaderboardType: string;
  @Input() leaderboardTypes: Array<any>;

  itemsPerPage: number = 10
    ;
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
    console.log('init')
    this.getType(this.selectedType);
  }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type, week: this.currentWeek}));
  }

  getType(type: any) {
    this.store.dispatch(new leaderboardActions.GetSelectedTypeAction({type: type, leaderboard: this.leaderboardType, week: this.currentWeek}));
  }

  filterItems(tier: number) {
    if (!tier) {
      tier = 0;
    }

    this.store.dispatch(new leaderboardActions.FilterByTierAction(tier));
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      this.store.dispatch(new leaderboardActions.GetPlayersAction({type: weapon.id, week: this.currentWeek}));
    }
  }
}
