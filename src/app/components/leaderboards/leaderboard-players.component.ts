import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'leaderboard-players',
  host: {
    'class': 'stat-table col-xs-12'
  },
  template: `
    <div class="stat-table__row row row--small-gutter">
      <div class="col-xs-2">
        <div class="stat-header">Place</div>
      </div>
      <div class="col-xs-2">
        <div class="stat-header">Kills</div>
      </div>
      <div class="col-xs-4 stat">
        <div class="stat-header">Player</div>
      </div>
      <div class="col-xs-2 stat">
        <div class="stat-header">Headshots</div>
      </div>
      <div class="col-xs-2 stat">
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
        <span [innerHtml]="player?.name"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="player?.headshots | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="player?.matches | number:'1.0-0'"></span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardPlayerComponent {
  @Input() players: any[];
  @Input() itemsPerPage: number;
  @Input() currentPage: number;

  constructor() { }
}
