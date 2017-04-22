import { Component, Input } from '@angular/core';
import { PGCR } from "../../../models/pgcr.model";

@Component({
  selector: 'player-tab-recent-matches',
  templateUrl: './player-tab-recent-matches.component.html',
  styleUrls: ['./player-tab-recent-matches.component.css']
})

export class PlayerTabRecentMatchesComponent {
  @Input() matches: PGCR[];
  @Input() pgcr: any;
  @Input() characterId: string;

  objectToArray(val) {
    if (!val) return;
    return Object.keys(val).map(key => val[key]);
  }

  secondsToDisplay(time) {
    if (!time) return;
    let minutes = Math.floor(parseInt(time, 10)/60);
    let seconds = parseInt(time, 10) % 60;
    return `${minutes}:${seconds}`
  }
}
