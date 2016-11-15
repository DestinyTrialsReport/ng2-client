import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { WeaponUsage } from "../models/map-stats.model";
import * as fromRoot        from '../reducers';

@Component({
  selector: 'weapon-usage',
  template: `
    <div class="row">
      <div class="col-xs-12 col-sm-2" [tooltipHtml]="percentageNoticeText" [tooltipClass]="'popover'">
        <h3 class="stat-header">
          Weapon usage by type
        </h3>
        <span>
          <i class="material-icons icon--small info">&#xE8FD;</i>
        </span>
      </div>
      <div class="col-xs-12 col-sm-4">
        <div class="top-weapons--map">
          <div class="row">
            <div class="col-xs-6 col-sm-4">
              <label class="top-weapons__label">Primary</label>
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <label>Kills</label>
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <label>Diff. to avg</label>
            </div>
          </div>
          <div class="row top-weapons--map__row" *ngFor='let weapon of (weaponUsage$ | async)?.primary'>
            <div class="col-xs-6 col-sm-4">
              <img class="weapon-type-icon img-responsive"
                   [src]="weapon?.file_name"
                   [alt]="weapon?.weapon_type">
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <span [innerHtml]="weapon?.killPercentage | number:'2.2-2'"></span>%
            </div>
            <div class="col-xs-3 col-sm-4 stat"
                 [ngClass]="{success: weapon?.diffPercentage > 0, fail: weapon?.diffPercentage < 0}">
              <i class="material-icons" [innerHtml]="weapon?.diffPercentage > 0 ? '&#xE5CE;' : '&#xE5CF;'"></i>
              <span [innerHtml]="weapon?.diffPercentage | number:'2.2-2'"></span>%
            </div>
          </div>
          <hr class="hr--minor visible-xs">
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 col-sm-offset-1">
        <div class="top-weapons--map">
          <div class="row">
            <div class="col-xs-6 col-sm-4">
              <label class="top-weapons__label">Primary</label>
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <label>Kills</label>
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <label>Diff. to avg</label>
            </div>
          </div>
          <div class="row top-weapons--map__row" *ngFor='let weapon of (weaponUsage$ | async)?.special'>
            <div class="col-xs-6 col-sm-4">
              <img class="weapon-type-icon img-responsive"
                   [src]="weapon?.file_name"
                   [alt]="weapon?.weapon_type">
            </div>
            <div class="col-xs-3 col-sm-4 stat">
              <span [innerHtml]="weapon?.killPercentage | number:'2.2-2'"></span>%
            </div>
            <div class="col-xs-3 col-sm-4 stat"
                 [ngClass]="{success: weapon?.diffPercentage > 0, fail: weapon?.diffPercentage < 0}">
              <i class="material-icons" [innerHtml]="weapon?.diffPercentage > 0 ? '&#xE5CE;' : '&#xE5CF;'"></i>
              <span [innerHtml]="weapon?.diffPercentage | number:'2.2-2'"></span>%
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponUsageComponent {

  percentageNoticeText:string = "Percentages are based on usage of weapon types in relation to total\
    kills in their category.<\hr/\>Difference to the average represents how\
    much more or less that specific weapon type is used on this map\
    in relation to all other Trials of Osiris maps since the latest balance update.";
  weaponUsage$: Observable<{ primary:WeaponUsage[], special:WeaponUsage[] }>;

  constructor(private store: Store<fromRoot.State>) {
    this.weaponUsage$ = Observable.combineLatest(
      this.store.select(state => state['map'].weaponStats),
      this.store.select(state => state['map'].weaponTotals),
      (weapons, totals) => {
        if (!weapons || !totals) return {primary: [], special: []};

        const primaries: WeaponUsage[] = weapons.filter(w => w.bucketName == 'primary');
        const specials: WeaponUsage[] = weapons.filter(w => w.bucketName == 'special');
        return {
          primary: primaries.map(w => {
            const avgPercentage:number = 100 * (w.sum_kills / totals.primary.bucketSum);
            const killPercentage:number =  100 * (w.kills / totals.primary.sum);
            return Object.assign({}, w, {
              killPercentage: killPercentage,
              diffPercentage: killPercentage - avgPercentage
            });
          }),
          special: specials.map(w => {
            const avgPercentage:number = 100 * (w.sum_kills / totals.special.bucketSum);
            const killPercentage:number =  100 * (w.kills / totals.special.sum);
            return Object.assign({}, w, {
              killPercentage: killPercentage,
              diffPercentage: killPercentage - avgPercentage
            });
          })
        };
      });
  }
}
