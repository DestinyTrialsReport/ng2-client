import {Component, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {Player, ClassStat}        from "../models/player.model";
import { Store }                  from "@ngrx/store";
import * as fromRoot              from '../reducers';
import { Observable }             from 'rxjs/Observable';
import {Activity}                 from "../models/activity.model";
import {Item}                     from "../models/inventory.model";
import {StatState}                from "../reducers/stats.reducer";
import {WEAPON_BUCKETS, ARMOR_BUCKETS} from "../services/constants";
import {LocalStorageService} from "../ng2-webstorage/services/localStorage";

@Component({
  selector: '[player]',
  template: `
   <div class="player shadow-z-1 is-virgin">
      <div 
        [playerObs]="(player$ | async)"
        [subclass]="(subclass$ | async)" emblem>
      </div>

      <div 
        [activities]="(activities$ | async)" 
        [statsBng]="  (stats$   | async)?.bungie" activities-chart>
      </div>
  
      <div 
        [statsDtr]="(stats$ | async)?.trials"
        [statsBng]="(stats$ | async)?.bungie"
        [statsGgg]="(stats$ | async)?.guardian"
        [activities]="activities$ | async" quick-stats>
      </div>
           
      <tabset class="player-tabs">
        <tab heading="Equipped" customClass="player-tab--equipped">     
          <div class="player-tab--equipped">
          
            <div class="player-tab__section" 
              [items]="(weapons$ | async)" equipped-gear>
            </div>
            
            <div class="row" *ngIf="(weapons$ | async)?.length < 1">
              <div class="weapon col-xs-12 loading-spinner"></div>
              <div class="weapon col-xs-12 loading-spinner"></div>
              <div class="weapon col-xs-12 loading-spinner"></div>
            </div>
            
            <div class="player-tab__section" 
              [items]="(armor$ | async)" equipped-gear>
            </div>
            
            <div class="row" *ngIf="(armor$ | async)?.length < 1">
              <div class="weapon col-xs-12 loading-spinner"></div>
            </div>
            
            <div 
              [stats]="(classStats$ | async)" class-stats>
            </div>
            
            <div 
              [stats]="(classDefense$ | async)" class-stats>
            </div>
            
            <div class="player-tab__section" 
              [subclass]="(subclass$ | async)" subclass-stats>
            </div>
          
            
            <div class="player-tab__section" *ngIf="(subclass$ | async)?.length < 1">
              <div class="row" style="min-height: 83.91px;"></div>
            </div>  
            
          </div>
        </tab>
        <tab heading="Last Matches" class="player-tab--last-matches"></tab>
        <tab heading="Stats" class="player-tab--stats"></tab>
      </tabset>
      <div class="player__links" footer></div>
   </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  player$:        Observable<Player>;
  activities$:    Observable<Activity[]>;
  stats$:         Observable<StatState>;
  inventory$:     Observable<Item[]>;
  weapons$:       Observable<Item[]>;
  armor$:         Observable<Item[]>;
  subclass$:      Observable<Item>;
  classStats$:    Observable<ClassStat[]>;
  classDefense$:  Observable<ClassStat[]>;

  constructor(private store: Store<fromRoot.AppState>,
              private el:ElementRef,
              private storage: LocalStorageService) {
    this.player$ = store
      .select(s => s.players[el.nativeElement.id])
      .distinctUntilChanged();

    this.activities$ = store
      .select(s => s.activities[el.nativeElement.id])
      .distinctUntilChanged();

    this.inventory$ = fromRoot
      .getPlayerInventory(
        store,
        el.nativeElement.id,
        storage.retrieve('manifestItems'),
        storage.retrieve('manifestTalents'),
        storage.retrieve('manifestSteps')
      )
      .distinctUntilChanged()
      .share();

    this.weapons$ = this.inventory$
      .map(items => items.filter(item => WEAPON_BUCKETS.indexOf(item.bucketHash) > -1));

    this.armor$ = this.inventory$
      .map(items => {
        const hasExotic: boolean = items.map(item => item.tT).indexOf(6) > -1;
        return items.filter(item => ARMOR_BUCKETS.indexOf(item.bucketHash) > -1)
          .filter(item => hasExotic ? item.tT == 6 : item.bucketHash == 3448274439)
      });

    this.subclass$ = this.inventory$
      .map(items => items.filter(item => item.bucketHash == 3284755031).shift());

    this.stats$ = store.select(s => s.stats[el.nativeElement.id])
      .distinctUntilChanged();

    this.classStats$ = store.select(s => s.players[el.nativeElement.id])
      .filter(player => !!player && !!player.characterBase)
      .map(player => player.characterBase.stats)
      .map(char => ['STAT_INTELLECT', 'STAT_DISCIPLINE', 'STAT_STRENGTH']
        .map((keyName: string) => {
          let stat:number = char[keyName].value;
          let normalized:number = stat > 300 ? 300 : stat;
          let tiers:number[] = [];
          let remaining:number = stat;
          for (var t = 0; t < 5; t++) {
            remaining -= tiers[t] = remaining > 60 ? 60 : remaining;
          }
          let percentage:number = 100 * normalized / 300;
          let tier:number = Math.floor(normalized / 60);
          return {
            name: keyName,
            value: stat,
            normalized: normalized,
            percentage: percentage,
            tier: tier,
            tiers: tiers,
            remaining: remaining,
            cooldown: 0
          };
        })
      ).distinctUntilChanged();

    this.classDefense$ = store.select(s => s.players[el.nativeElement.id])
      .filter(player => !!player && !!player.characterBase)
      .map(player => player.characterBase.stats)
      .map(char => ['STAT_ARMOR', 'STAT_RECOVERY', 'STAT_AGILITY']
        .map((keyName: string) => {
          let stat:number = char[keyName].value;
          let normalized:number = stat > 60 ? 60 : stat;
          let percentage:number = 100 * normalized / 60;
          return {
            name: keyName,
            value: stat,
            normalized: normalized,
            percentage: percentage,
          };
        })
      ).distinctUntilChanged();
  }
}
