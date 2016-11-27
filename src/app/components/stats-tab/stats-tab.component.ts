import {Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import {BNGStats} from "../../models/stats.model";

@Component({
  selector: '[stats-tab]',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
<div class="player-tab--stats">
  <div class="player-tab__section player-stats__main">
    <div class="row stat-row">
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.kills?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Kills</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.deaths?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Deaths</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.assists?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Assists</label>
      </div>
    </div>
    <div class="row stat-row">
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.activitiesEntered?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Games</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.activitiesWon?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Wins</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="stats?.totalActivityDurationSeconds?.basic?.displayValue || '0s'"></span>
        <label>Time played</label>
      </div>
    </div>
    <div class="row stat-row">
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.score?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Rounds won</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.allParticipantsScore?.basic?.value - stats?.score?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Rounds lost</label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.averageKillDistance?.basic?.value | number:'1.0-0') || 'N/A'"></span>
        <label>Kill distance</label>
      </div>
    </div>
  </div>
  <div class="player-tab__section">
    <div class="row stat-row">
      <div class="col-xs-6 stat">
        <span [innerHtml]="stats?.weaponBestType?.basic?.displayValue || 'N/A'"></span>
        <label translate="weaponBestType"></label>
      </div>
      <div class="col-xs-6 stat">
        <span [innerHtml]="(stats?.precisionKills?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Headshots</label>
      </div>
    </div>
    <div class="stat-row__header">
      Total kills with
    </div>
    <div class="row stat-row" *ngIf="stats">
      <div class="col-xs-4 stat stat__kills" *ngFor="let key of weaponKills">
        <span [innerHtml]="(stats[key]?.basic?.value | number:'1.0-0') || 0"></span>
        <label></label>
      </div>
    </div>
    <div class="row stat-row">
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.weaponKillsGrenade?.basic?.value | number:'1.0-0') || 0"></span>
        <label translate="weaponKillsGrenade"></label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.weaponKillsMelee?.basic?.value | number:'1.0-0') || 0"></span>
        <label translate="weaponKillsMelee"></label>
      </div>
      <div class="col-xs-4 stat">
        <span [innerHtml]="(stats?.weaponKillsSuper?.basic?.value | number:'1.0-0') || 0"></span>
        <label translate="weaponKillsSuper"></label>
      </div>
    </div>
  </div>
  <div class="player-tab__section player-stats__bests">
    <div class="stat-row__header">
      Character records
    </div>
    <div class="row stat-row">
      <div class="col-xs-6 stat">
        <span [innerHtml]="(stats?.bestSingleGameKills?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Kills in one game</label>
      </div>
      <div class="col-xs-6 stat">
        <span [innerHtml]="(stats?.mostPrecisionKills?.basic?.value | number:'1.0-0') || 0"></span>
        <label>Headshots in one game</label>
      </div>
    </div>
    <div class="row stat-row">
      <div class="col-xs-6 stat">
        <span [innerHtml]="stats?.longestSingleLife?.basic?.displayValue || 'N/A'"></span>
        <label translate="longestSingleLife"></label>
      </div>
      <div class="col-xs-6 stat">
        <span [innerHtml]="(stats?.longestKillSpree?.basic?.value | number:'1.0-0') || 0"></span>
        <label translate="longestKillSpree"></label>
      </div>
    </div>
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsTabComponent {
  weaponKills: string[] = [
  'weaponKillsHandCannon',
  'weaponKillsPulseRifle',
  'weaponKillsScoutRifle',
  'weaponKillsAutoRifle',
  'weaponKillsSniper',
  'weaponKillsShotgun',
  'weaponKillsFusionRifle',
  'weaponKillsRocketLauncher',
  'weaponKillsMachinegun',
  'weaponKillsSideArm',
  'weaponKillsSword'
];

  @Input() stats: BNGStats;
}
