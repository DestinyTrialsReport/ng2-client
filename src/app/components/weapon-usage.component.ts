import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../reducers/index";
import {Observable} from "rxjs/Observable";
import { TYPE_BUCKETS, BUCKET_NAMES } from "../services/constants";

@Component({
  selector: 'weapon-usage',
  template: `
    <div class="row">
      <!--<div class="col-xs-12 col-sm-2" [tooltipHtml]="percentageNoticeText" [tooltipClass]="'popover'">-->
      <div class="col-xs-12 col-sm-2">
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
          <div class="row top-weapons--map__row" *ngFor='let weapon of weaponSummary?.primary'>
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
          <div class="row top-weapons--map__row" *ngFor='let weapon of weaponSummary?.special'>
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
  weaponSummary:any;
  percentageNoticeText:string = "Percentages are based on usage of weapon types in relation to total\
    kills in their category.<\hr/\>Difference to the average represents how\
    much more or less that specific weapon type is used on this map\
    in relation to all other Trials of Osiris maps since the latest balance update.";
  weaponUsage: Observable<any>;
  constructor(private store: Store<AppState>) {
    this.store.select(state => state.map)
      .distinctUntilChanged()
      .subscribe((res:any) => {
        if (res.weaponStats && res.weaponStats.length > 0) {
          this.weaponUsage = res.weaponStats.map(weapon => {
            const bucketHash:number = TYPE_BUCKETS[weapon.weapon_type];
            return {
              bucketHash: bucketHash,
              bucketName: BUCKET_NAMES[bucketHash],
              file_name: '/assets/img/weapon-icons/' + weapon.file_name,
              kills: parseInt(weapon.kills),
              sum_kills: parseInt(weapon.sum_kills)
            }
          });

          let weaponTotals:any = {
            totalSum: 0,
            totalLifetime: 0
          };

          const weaponsByBucket:any = {
            primary: this.weaponUsage.filter(w => w.bucketName == 'primary'),
            special: this.weaponUsage.filter(w => w.bucketName == 'special')
          };

          const bucketArray: string[] = ['primary', 'special'];
          bucketArray.map(bucket => {
            const kills:any = weaponsByBucket[bucket].map(w => w.kills);
            const typeKills:any = weaponsByBucket[bucket].map(w => w.sum_kills);
            const sum:number = kills.reduce((memo:any, num:number) => parseInt(memo) + num);
            const bucketSum:number = typeKills.reduce((memo:any, num:number) => parseInt(memo) + num);//_.reduce(kills, function(memo:any, num:number){ return parseInt(memo) + num; }, 0);
            weaponTotals.totalSum += sum;
            weaponTotals.totalLifetime += bucketSum;
            weaponTotals[bucket] = {
              sum: sum,
              bucketSum: bucketSum
            };
          });

          this.weaponSummary = bucketArray.map(bucket => weaponsByBucket[bucket].map(weapon => {
            const avgPercentage:number = 100 * (weapon.sum_kills / weaponTotals[bucket].bucketSum);
            const killPercentage:number =  100 * (weapon.kills / weaponTotals[bucket].sum);
            return {
              killPercentage: killPercentage,
              diffPercentage: killPercentage - avgPercentage
            }
          }));
        }
      });
  }
}
