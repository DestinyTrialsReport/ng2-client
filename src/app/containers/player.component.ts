import {Component, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {Player}        from "../models/player.model";
import { Store }                  from "@ngrx/store";
import * as fromRoot              from '../reducers';
import { Observable }             from 'rxjs/Observable';
import {Activity}                 from "../models/activity.model";
import {Item}                     from "../models/inventory.model";
import {StatState}                from "../reducers/stats.reducer";
import {LocalStorageService} from 'ng2-webstorage';
import {SearchState} from "../reducers/search.reducer";

@Component({
  selector: '[player]',
  template: `
   <div class="player shadow-z-1 is-virgin">
      <div 
        [playerObs]="(player$ | async)"
        [subclass]="(inventory$ | async | filterSubclass).shift()" emblem>
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
          
            <div class="player-tab__section" style="min-height: 287px;"
              [ngClass]="{'loading-spinner': !(loaded$ | async)?.inventory}"
              [items]="(inventory$ | async) | filterWeapons"
              [loaded]="(loaded$ | async)?.inventory" equipped-gear>
            </div>
            
            <div class="player-tab__section" style="min-height: 108px;"
              [ngClass]="{'loading-spinner': !(loaded$ | async)?.inventory}"
              [items]="(inventory$ | async) | filterArmor"
              [loaded]="(loaded$ | async)?.inventory" equipped-gear>
            </div>
            
            <div 
              [stats]="(player$ | async)?.characterBase?.stats | filterClassStats" class-stats>
            </div>
            
            <div 
              [stats]="(player$ | async)?.characterBase?.stats | filterClassArmor" class-stats>
            </div>
            
            <div class="player-tab__section" 
              [inventory]="(inventory$ | async) | filterSubclass" subclass-stats>
            </div>
          
            
            <!--<div class="player-tab__section" *ngIf="(subclass$ | async)?.length < 1">-->
              <!--<div class="row" style="min-height: 83.91px;"></div>-->
            <!--</div>  -->
            
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
  player$:      Observable<Player>;
  activities$:  Observable<Activity[]>;
  stats$:       Observable<StatState>;
  inventory$:   Observable<Item[]>;
  loaded$:       Observable<SearchState>;

  constructor(private store: Store<fromRoot.AppState>,
              private el:ElementRef,
              private storage: LocalStorageService) {
    this.player$ = store
      .select(s => s.players[el.nativeElement.id])
      .distinctUntilChanged();

    this.activities$ = store
      .select(s => s.activities[el.nativeElement.id])
      .distinctUntilChanged();

    this.loaded$ = this.store.select(s => s.search[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

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

    this.stats$ = store.select(s => s.stats[el.nativeElement.id])
      .distinctUntilChanged();
  }
}
