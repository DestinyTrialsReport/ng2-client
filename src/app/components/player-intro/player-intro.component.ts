import { Component, Input } from '@angular/core';
import { PlayerIntro } from "../../models/player.model";

@Component({
  selector: 'player-intro',
  templateUrl: './player-intro.component.html',
  styleUrls: ['./player-intro.component.css']
})

export class PlayerIntroComponent {
  @Input() settings: any;
  @Input() intro: PlayerIntro;

  activityStanding(activity): boolean {
    let standing: number = 0;
    if (activity && activity.standing) {
      standing = activity.standing;
    }
    return standing === 0; //? 'match--win' : 'match--loss'
  }

  getKdRatio(year): number {
    let kills:number = year.kills;
    let deaths:number = Math.max(1, year.deaths);

    return kills / deaths;
  }

  formatStreak(streak): number {
    return Math.abs(streak);
  }
}
