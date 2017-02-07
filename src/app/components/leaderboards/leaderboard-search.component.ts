import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'leaderboard-search',
  host: {
    'class': 'stat-table col-xs-12'
  },
  template: `
    <div class="col-xs-12">
      <div class="row">
        <div class="col-xs-6">
          <div class="stat-label">This weeks weapon ranking for player: </div>
        </div>
        <div class="col-xs-6">
          <div class="stat-label" [innerHtml]="searchedPlayer"></div>
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
      <div class="col-xs-4 stat">
        <div class="stat-header">Weapon</div>
      </div>
      <div class="col-xs-2 stat">
        <div class="stat-header">Headshots</div>
      </div>
      <div class="col-xs-2 stat">
        <div class="stat-header">Matches</div>
      </div>
    </div>
    <div class="stat-table__row row row--small-gutter middle-xs" *ngFor='let weapon of weapons | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }'>
     <div class="col-xs-2">
        <span [innerHtml]="weapon?.place | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.kills | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-4">
        <img [src]="weapon?.icon"
             [alt]="weapon?.name"
             style="height: 1rem;max-width: 1rem;">
        <span [innerHtml]="weapon?.name"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.headshots | number:'1.0-0'"></span>
      </div>
      <div class="col-xs-2">
        <span [innerHtml]="weapon?.matches | number:'1.0-0'"></span>
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

  constructor() { }
}
