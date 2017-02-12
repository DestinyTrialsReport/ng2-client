import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-search',
  host: {
    'class': 'row'
  },
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
  
  <div class="stat-table col-xs-12">
    <div class="col-xs-12">
      <div class="row" style="padding-bottom: 1em;text-align: center;">
        <div class="col-xs-6">
          <div class="stat-label" style="font-size: 1em;">This weeks weapon ranking for player: </div>
        </div>
        <div class="col-xs-6">
          <div class="stat-label" style="font-size: 1em;" [innerHtml]="searchedPlayer"></div>
        </div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter">
     <div class="col-xs-2">
        <div class="stat-header">Place</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Kills</div>
      </div>
      <div class="col-xs-4">
        <div class="stat-header">Weapon</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Headshots</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let weapon of weapons | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }; let i = index;'>
     <div class="col-xs-2">
        <span [innerHtml]="weapon?.rank || ((i + (itemsPerPage * (currentPage - 1))) + 1) | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.kills | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-4">
        <img [src]="weapon?.icon"
             [alt]="weapon?.name"
             class="weapon-icon__small">
        <span [innerHtml]="weapon?.name"></span>
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

export class LeaderboardSearchComponent {
  @Input() weapons: any[];
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Input() searchedPlayer: string;
  @Input() leaderboardType: number;
  @Input() leaderboardTypes: Array<any>;

  constructor(private store: Store<fromRoot.State>) { }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type}));
  }
}
