import {Component, Input} from '@angular/core';
import {Activity} from "../models/activity.model";
import {BNGStats} from "../models/player.model";

@Component({
  selector: '[activities-chart]',
  host: {
    'class': 'player__content player-quick-look'
  },
  template: `
    <div class="row">
      <div class="player-quick-look__form col-xs-9">
        <div class="player-quick-look__form__matches">
          <i class="player-quick-look__form__match match"
             *ngFor="let activity of activities"
             [ngClass]="activityStanding(activity)"
             [ngStyle]="activity | activityChart: statsBng?.killsDeathsRatio.basic.value"></i>
        </div>
        <label class="data-label">Recent Matches</label>
      </div>
      <div class="player-quick-look__kd col-xs-3" [ngClass]="{'loading-spinner-sm': !statsBng?.killsDeathsRatio}">
        <div class="player-quick-look__kd__nr">
          <span [innerHtml]="statsBng?.killsDeathsRatio.basic.value | number : '1.2-2'"></span>
        </div>
        <label class="data-label text-right">K/D</label>
      </div>
    </div>
  `
})

export class ActivityChartComponent {
  @Input() activities: Activity[];
  @Input() statsBng: BNGStats;

  activityStanding(activity) {
    if (activity && activity.values) {
      let standing: number = activity.values.standing.basic.value;
      return standing === 0 ? 'match--win' : 'match--loss'
    }
  }
}
