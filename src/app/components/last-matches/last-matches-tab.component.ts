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
  <div>
    <div class="player-tab__section">
      <div class="row stat-row">
        <div class="col-xs-3 stat">
          <span [innerHtml]="pgcr?.values?.kills || 0"></span>
          <label>Kills</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="pgcr?.values?.deaths || 0"></span>
          <label>Deaths</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="pgcr?.values?.assists || 0"></span>
          <label>Assists</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="pgcr?.values?.precisionKills || 0"></span>
          <label>Headshots</label>
        </div>
      </div>
      <div class="row stat-row">
        <div class="col-xs-3 stat">
          <span [innerHtml]="(pgcr?.values?.killsDeathsAssists / 3 | number : '1.2-2') || 0"></span>
          <label>KA/D</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="(pgcr?.values?.killsDeathsRatio / 3 | number : '1.2-2') || 0"></span>
          <label>K/D</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="pgcr?.values?.resurrectionsPerformed || 0"></span>
          <label>Revives</label>
        </div>
        <div class="col-xs-3 stat">
          <span [innerHtml]="secondsToDisplay((pgcr?.values?.averageLifespan / 3)) || 0"></span>
          <label>Lifespan</label>
        </div>
      </div>
    </div>    
    <div class="player-tab__section">
      <div class="row">
        <div class="last-match-weapon col-xs-12" *ngFor="let weapon of objectToArray(pgcr?.weapons)">
          <div class="row">
            <div class="col-xs-6 last-weapon-weapon__descr">
              <img class="last-match-weapon__img img-responsive" [src]="'https://www.bungie.net/common/destiny_content/icons/' + weapon?.icon" [alt]="weapon?.name" [title]="weapon?.name">
              <span class="last-match-weapon__title" [innerHtml]="weapon?.name"></span>
            </div>
            <div class="col-xs-2 stat">
              <span [innerHtml]="weapon?.uniqueWeaponKills"></span>
              <label translate="kills">Kills</label>
            </div>
            <div class="col-xs-4 stat">
              <span [innerHtml]="weapon?.uniqueWeaponPrecisionKills"></span>
              <label>Headshots</label>
            </div>
          </div>
        </div>
        <!--<div class="last-match-weapon last-match-weapon&#45;&#45;weaponKillsGrenade col-xs-12" ng-repeat="specialWeapon in abilityKills track by $index">-->
          <!--<div class="row">-->
            <!--<div class="col-xs-6 last-weapon-weapon__descr">-->
              <!--<span class="last-match-weapon__img" ng-style="{'background-image':'url(\'https://www.bungie.net' + specialWeapon.icon + '\')'}" style="background-image: url(&quot;https://www.bungie.net/common/destiny_content/icons/651b1f775580b1822fc3671ff5dd5170.png&quot;);"></span>-->
              <!--<span class="last-match-weapon__title" ng-bind="specialWeapon.name">Skip Grenade</span>-->
            <!--</div>-->
            <!--<div class="col-xs-2 stat">-->
              <!--<span ng-bind="specialWeapon.count">8</span>-->
              <!--<label translate="kills">Kills</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="player-tab__section">
      <div class="row">
        <div class="col-xs-2 last-match__medal" *ngFor="let medal of objectToArray(pgcr?.medals)">
          <img class="img-responsive" [src]="'https://www.bungie.net' + medal?.icon" [alt]="medal?.name" [title]="medal?.name">
          <div class="last-match__medal-count"><sup>x</sup><span [innerHtml]="medal?.value"></span></div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastMatchesTabComponent {
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
