import {Component, Input} from '@angular/core';
import {ClassStat} from "../../models/player.model";

@Component({
  selector: '[class-stats]',
  host: {
    'class': 'player-tab__section'
  },
  template: `
    <div class="row">
      <div class="player-cooldown col-xs-4" *ngFor="let stat of stats"
        [tooltipHtml]="cooldownPopover" [tooltipContext]="stat" [tooltipClass]="'popover'">
        <div class="player-cooldown__label" [innerHtml]="stat?.name"></div>
        <div class="player-cooldown__nr">
          <progressbar [max]="10" animate="true" class="progress not-rounded" [value]="stat?.value" [type]="'primary'" *ngIf="!stat?.tiers"></progressbar>  
              
          <template ngFor let-value [ngForOf]="stat?.tiers">
            <div class="player-cooldown__tier" [ngClass]="{'is-incomplete': (value !== 60)}">
              <progressbar [max]="60" animate="true" class="progress not-rounded" [value]="value" [type]="'primary'"></progressbar>
            </div> 
          </template>       
        </div>

        <template #cooldownPopover let-model="stat">
          <div class="arrow"></div>
          <div class="popover-content">
            <div class="row" *ngIf="stat?.tiers">
              <div class="col-xs-4 stat">
                <span [innerHtml]="stat?.tier"></span>
                <label>Tier</label>
              </div>
              <div class="col-xs-8 stat">
                <span [innerHtml]="stat?.cooldown"></span>
                <label>Cooldown</label>
              </div>
            </div>
            <div class="row" *ngIf="!stat?.tiers">
              <div class="col-xs-12 stat">
                <span  [innerHtml]="(stat?.percentage | number:'1.0-0') + '%'"></span>
                <label [innerHtml]="stat?.name"></label>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  `
})
export class ClassStatsComponent {
  @Input() stats: ClassStat[];

  constructor() {
  }
}
