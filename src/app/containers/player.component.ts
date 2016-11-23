import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Player }       from "../models/player.model";
import { Store }        from "@ngrx/store";
import { Observable }   from 'rxjs/Observable';
import { Activity }     from "../models/activity.model";
import { Item }         from "../models/inventory.model";
import { PGCR }         from "../models/pgcr.model";
import * as fromRoot    from '../reducers';
import * as fromSearch  from '../reducers/search.reducer';
import * as fromStats    from '../reducers/stats.reducer';
import * as pgcrActions from "../actions/pgcr.actions";

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
        <tab heading="Last Matches" (select)="getMatchHistory()" customClass="player-tab--last-matches">
          <div class="player-tab--equipped"
            [matches]="(matches$ | async)" 
            [pgcr]="(pgcr$ | async)" 
            [characterId]="(player$ | async)?.characterBase?.characterId" 
            last-matches-tab>
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
  stats$:       Observable<fromStats.State>;
  inventory$:   Observable<Item[]>;
  loaded$:      Observable<fromSearch.State>;
  matches$:     Observable<PGCR[]>;
  pgcr$:        Observable<any>;
  recentMatches: string[];

  constructor(private store: Store<fromRoot.State>,
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

    this.loaded$ = store.select(s => s.search[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.inventory$ = store.select(s => s.inventory[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    this.store.let(fromRoot.getRecentActivities(this.el.nativeElement.id, 3))
      .subscribe((activities: Activity[]) => {
        this.recentMatches = activities.map(a => a.activityDetails.instanceId);
      });

    // this.matches$ = store.select(s => s.pgcr.collection)
    //   .map(collection => this.recentMatches.map(id => collection[id]))
    //   .distinctUntilChanged()
    //   .share();
    //
    this.pgcr$ = store.select(s => s.pgcr[el.nativeElement.id])
      .distinctUntilChanged()
      .share();

    // this.matches$ = store.let(fromRoot.getPgcrFromRecent(this.el.nativeElement.id, 3))
  }

  public getMatchHistory():void {
    if (this.recentMatches) {
      this.store.dispatch(new pgcrActions.SearchPGCR({matchIds: this.recentMatches, player: this.el.nativeElement.id}));
      // this.store.let(fromRoot.getNewMatches(this.recentMatches))
      //   .subscribe((ids: string[]) => {
      //     if (ids.length > 0) {
      //       this.store.dispatch(new pgcrActions.SearchPGCR({matchIds: ids, player: this.el.nativeElement.id}))
      //     }
      //   });
    }
  };

}
