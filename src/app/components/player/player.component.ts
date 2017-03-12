import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy} from '@angular/core';
import { Player }       from "../../models/player.model";
import { Store }        from "@ngrx/store";
import { Observable }   from 'rxjs/Observable';
import { Activity }     from "../../models/activity.model";
import { Item }         from "../../models/inventory.model";
import * as fromRoot    from '../../reducers';
import * as fromSearch  from '../../reducers/search.reducer';
import * as fromStats   from '../../reducers/stats.reducer';
import * as fromPgcr    from '../../reducers/pgcr.reducer';
import * as pgcrActions from "../../actions/pgcr.actions";
import {Subscription} from "rxjs";
import {SummarizedStats} from "../../models/stats.model";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnDestroy {
  paramSubscription$: Subscription;
  player$:        Observable<Player>;
  activities$:    Observable<Activity[]>;
  stats$:         Observable<fromStats.Stats>;
  inventory$:     Observable<Item[]>;
  loaded$:        Observable<fromSearch.State>;
  pgcr$:          Observable<fromPgcr.State>;
  recentMatches:  any[];

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

    this.paramSubscription$ = this.store.let(fromRoot.getRecentActivities(this.el.nativeElement.id, 3))
      .subscribe((activities: Activity[]) => {
        this.recentMatches = activities.map(a => {
          return {
            instanceId: a.activityDetails.instanceId,
            standing: a.values.standing.basic.value,
            team: a.values.team.basic.value,
            period: a.period
          }
        });
      });

    this.pgcr$ = store.select(s => s.pgcr[el.nativeElement.id])
      .distinctUntilChanged()
      .share();
  }

  public getMatchHistory():void {
    if (this.recentMatches) {
      this.store.select(s => s.pgcr[this.el.nativeElement.id])
        .subscribe(state => {
          if (state.summary.length < 1) {
            this.recentMatches.map(match => this.store.dispatch(new pgcrActions.SearchPGCR({match: match, player: this.el.nativeElement.id})));
          }
        });
    }
  };

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }

  getKillDeathRatio(stats: SummarizedStats) {
    if (stats) {
      return stats.kills / stats.deaths;
    }
  }

  getWinLoss(stats: SummarizedStats) {
    if (stats) {
      let wins = stats.matches - stats.losses;
      return `${wins} <span class="stat-number__seperator">/</span> ${stats.losses}`;
    }
  }

}
