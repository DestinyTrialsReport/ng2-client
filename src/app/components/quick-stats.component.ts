import { Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger } from '@angular/core';
import { DTRStats, GGGStats, BNGStats } from "../models/stats.model";
import { Activity } from "../models/activity.model";

@Component({
  selector: '[quick-stats]',
  host: {
    'class': 'player-main-stats'
  },
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
    <div class="row">
      <div class="col-xs-3 stat" [ngClass]="{'loading-spinner-sm': !statsBng}" [@visibilityChanged]="statsBng ? 'shown' : 'hidden'">
        <span [innerHtml]="(statsBng | winPercentage | number:'1.0-0') + '%'"></span>
        <span *ngIf="!statsBng">N/A</span>
        <label>WINS</label>
      </div>
      <div class="col-xs-3 stat" [ngClass]="{'loading-spinner-sm': !activities}" [@visibilityChanged]="activities ? 'shown' : 'hidden'">
        <span [innerHtml]="(activities | streak) || 'N/A'"></span>
        <span class="match player-main-stats__streak" [ngClass]="activities | streakIcon"></span>
        <label>STREAK</label>
      </div>
      
      <div class="col-xs-3 stat" [ngClass]="{'loading-spinner-sm': !statsGgg}" [@visibilityChanged]="statsGgg ? 'shown' : 'hidden'">
        <span [innerHtml]="(statsGgg?.elo | number:'1.0-0') || 'N/A'"></span>
        <span>
          <a href="https://guardian.gg/en/faq" target="_blank">
            <i class="material-icons icon--small">&#xE8FD;</i>
          </a>
        </span>
        <label>ELO</label>
      </div>
      <div class="col-xs-3 stat" [ngClass]="{'loading-spinner-sm': !statsDtr}" [@visibilityChanged]="statsDtr ? 'shown' : 'hidden'">
        <!--<span class="player-main-stats__lighthouse fail">-->
          <!--<i class="material-icons">&#xE14C;</i>-->
        <!--</span>-->
        <span class="player-main-stats__lighthouse success">
          <!--<i class="material-icons" ng-if="player.lighthouse.accountCount">&#xE876;</i>-->
          <span [innerHtml]="(statsDtr | sumFlawless) + 'x'"></span>
        </span>
        <label>FLAWLESS</label>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class QuickStats {
  @Input() statsDtr: DTRStats;
  @Input() statsGgg: GGGStats;
  @Input() statsBng: BNGStats;
  @Input() activities: Activity[];

  constructor() { }
}
