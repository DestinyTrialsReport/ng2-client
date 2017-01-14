import { Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger } from '@angular/core';
import { DTRStats, GGGStats, BNGStats } from "../../models/stats.model";
import { Activity } from "../../models/activity.model";

@Component({
  selector: 'player-intro',
  templateUrl: './player-intro.component.html',
  styleUrls: ['./player-intro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerIntroComponent {
  @Input() statsDtr: DTRStats;
  @Input() statsGgg: GGGStats;
  @Input() statsBng: BNGStats;
  @Input() activities: Activity[];

  activityStanding(activity): boolean {
    let standing: number = 0;
    if (activity && activity.values) {
      standing = activity.values.standing.basic.value;
    }
    return standing === 0; //? 'match--win' : 'match--loss'
  }
}
