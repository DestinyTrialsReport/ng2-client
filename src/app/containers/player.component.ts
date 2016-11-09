import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Player }      from "../models/player.model";
import { Store }       from "@ngrx/store";
import { Observable }  from 'rxjs/Observable';
import { Activity }    from "../models/activity.model";
import { Item }        from "../models/inventory.model";
import { StatState }   from "../reducers/stats.reducer";
import { SearchState } from "../reducers/search.reducer";
import * as fromRoot   from '../reducers';

@Component({
  selector: '[player]',
  template: `
   <div class="player shadow-z-1">
      <div 
        [playerObs]="(player$ | async)"
        [subclass]="(inventory$ | async | filterSubclass).shift()" emblem>
      </div>

      <div 
        [activities]="(activities$ | async)" 
        [statsBng]="(stats$ | async)?.bungie" activities-chart>
      </div>
  
      <div 
        [statsDtr]="(stats$ | async)?.trials"
        [statsBng]="(stats$ | async)?.bungie"
        [statsGgg]="(stats$ | async)?.guardian"
        [activities]="activities$ | async" quick-stats>
      </div>
           
      <tabset class="player-tabs">
        <tab heading="Equipped" customClass="player-tab--equipped">     
          <div class="player-tab--equipped" 
            [loaded]="(loaded$ | async)?.inventory"
            [inventory]="(inventory$ | async)"
            [stats]="(player$ | async)?.characterBase?.stats"
            equipped-tab>
          </div>
        </tab>
        <tab heading="Last Matches" customClass="player-tab--last-matches">
          <div class="player-tab--equipped">
          </div>
        </tab>
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
  loaded$:      Observable<SearchState>;

  constructor(private store: Store<fromRoot.AppState>,
              private el:ElementRef) {

    this.player$ = store
      .select(s => s.players[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.activities$ = store
      .select(s => s.activities[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.stats$ = store.select(s => s.stats[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.loaded$ = this.store.select(s => s.search[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.inventory$ = store.select(s => s.inventory[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

  }
}
