import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {MEDALS_REF} from "../../services/constants";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-medals',
  styleUrls: ['./leaderboards.component.css'],
  host: {
    'class': 'row'
  },
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
  <div class="col-xs-12 col-sm-8 select-container">
    <div class="select">
      <select [ngModel]="selectedMedal" (ngModelChange)="getMedal($event)">
        <option *ngFor='let medal of medalList; let i = index;' value="{{medal.id}}" [innerHtml]="medal.statName"></option>
      </select>
    </div>
    <div class="stat-label">Medal Name</div>
  </div>
    
  <div class="stat-table col-xs-12" [ngClass]="{'loading-container': loading}">
    <div class="stat-table__row row row--small-gutter">
      <div class="col-xs-2">
        <div class="stat-header">Place</div>
      </div>
      <div class="col-xs-3">
        <div class="stat-header">Count</div>
      </div>
      <div class="col-xs-4">
        <div class="stat-header">Player</div>
      </div>
      <div class="col-xs-3">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let player of medals | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }; let i = index;'>
      <div class="col-xs-2">
        <span [innerHtml]="player?.rank | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-3">
        <span [innerHtml]="player?.count | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-4">
        <img [src]="'/assets/img/' + (player?.platform == 1 ? 'xbox.svg' : 'ps.svg')"
             [alt]="player?.platform == 1 ? 'xbox' : 'psn'"
             style="float: right;height: 1rem;max-width: 1rem;">
        <span [innerHtml]="player?.name"></span>
      </div>
      <div class="col-xs-3">
        <span [innerHtml]="player?.matches | number:'1.0-0'"></span>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardMedalsComponent implements OnInit {
  @Input() medals: any[];
  @Input() itemsPerPage: number;
  @Input() leaderboardType: string;
  @Input() leaderboardTypes: Array<any>;
  @Input() loading: boolean;
  @Input() selectedMedal: number;
  @Input() currentPage: number;
  @Input() currentWeek: number;

  medalList: Array<{id: number, statId: string, statName: string}> = MEDALS_REF;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getMedal(this.selectedMedal);
  }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type}));
  }

  getMedal(medalId: number) {
    this.store.dispatch(new leaderboardActions.GetMedalAction({medalId: medalId, week: this.currentWeek}));
  }

}
