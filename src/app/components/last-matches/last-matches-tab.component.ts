import {Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import {PGCR} from "../../models/pgcr.model";

@Component({
  selector: '[last-matches-tab]',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
<div class="player-tab--last-matches">
  <div class="player-tab__section">
    <div class="row">
      <div class="last-match__result col-xs-4" *ngFor="let match of matches">
        <span class="match" [ngClass]="{'match--win': match?.standing === 0, 'match--loss': match?.standing === 1}"></span>
        <span class="last-match__score">
          <span class="last-match__score--team"  [innerHtml]="match?.values?.teamScore?.basic?.value"></span>
          -
          <span class="last-match__score--opponents" [innerHtml]="match?.values?.enemyScore?.basic?.value"></span>
        </span>
        <span class="last-match__date" [innerHtml]="match?.values?.dateAgo"></span>
      </div>
    </div>
  </div>
  <!--<div match-stats="player.activities.lastMatches"-->
       <!--player-abilities="player.inventory.subclass.build"-->
       <!--ng-if="player.activities.lastMatches">-->
  <!--</div>-->
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastMatchesTabComponent {
  @Input() matches: PGCR[];
  @Input() characterId: string;
}
