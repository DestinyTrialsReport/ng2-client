import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {TypeaheadMatch} from "ng2-bootstrap";
import {Store} from "@ngrx/store";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-players',
  host: {
    'class': 'row'
  },
  styleUrls: ['./leaderboards.component.css'],
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
  <div class="col-xs-12 col-sm-8 select-container">
    <div class="select">
      <input [ngModel]="selectedWeaponName"
             [typeahead]="weaponList"
             [typeaheadOptionField]="'name'"
             (typeaheadOnSelect)="getPlayerForWeapon($event)"
             placeholder="Enter Weapon Name">
    </div>
    <div class="stat-label">Weapon Name</div>
  </div>
  
  <div class="stat-table col-xs-12">
    <div class="col-xs-12">
      <div class="row" style="padding-bottom: 1em;text-align: center;">
        <div class="col-xs-6">
          <div class="stat-label" style="font-size: 1em;">This weeks ranking for: </div>
        </div>
        <div class="col-xs-6">
          <div class="stat-label" style="font-size: 1em;" [innerHtml]="selectedWeaponName"></div>
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
        <div class="stat-header">Player</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Headshots</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let player of players | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }; let i = index;'>
      <div class="col-xs-2">
        <span [innerHtml]="(i + (itemsPerPage * (currentPage - 1))) + 1 | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="player?.kills | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-4">
        <img [src]="'/assets/img/' + (player?.platform == 1 ? 'xbox.svg' : 'ps.svg')"
             [alt]="player?.platform == 1 ? 'xbox' : 'psn'"
             style="float: right;height: 1rem;max-width: 1rem;">
        <a [innerHtml]="player?.name" [routerLink]="['/']" [queryParams]="{gamertag: player?.name, platform: player?.platform}"></a>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="player?.headshots | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="player?.matches | number:'1.0-0'"></span>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardPlayerComponent implements OnInit {
  @Input() players: any[];
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Input() selectedWeaponName: string;
  @Input() weaponList: Array<{ id: number; name: string; }>;
  @Input() leaderboardType: number;
  @Input() leaderboardTypes: Array<any>;
  @Input() currentWeek: number;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new leaderboardActions.GetWeaponListAction({week: this.currentWeek}));
  }

  setLeaderboard(type: string) {
    this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: type}));
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      this.store.dispatch(new leaderboardActions.GetPlayersAction({ weaponId: weapon.id, week: this.currentWeek}));
    }
  }
}
