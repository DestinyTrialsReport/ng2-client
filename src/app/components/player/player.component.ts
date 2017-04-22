import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy, Input} from '@angular/core';
import { Player, PlayerIntro, PlayerHeader, EquippedItems }       from "../../models/player.model";
import { SummarizedStats, Match } from "../../models/stats.model";
import { Store }        from "@ngrx/store";
import { Subscription } from "rxjs/Subscription";
import { Observable }   from 'rxjs/Observable';
import * as fromRoot    from '../../reducers';
import * as fromPgcr    from '../../reducers/pgcr.reducer';
import * as pgcrActions from "../../actions/pgcr.actions";
import {StepsDefinitions, TalentDefinitions, ItemDefinitions} from "../../models/manifest.model";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerComponent implements OnDestroy {
  @Input() steps: StepsDefinitions;
  @Input() talents: TalentDefinitions;
  @Input() armor: ItemDefinitions;
  @Input() weapons: ItemDefinitions;
  @Input() subclass: ItemDefinitions;
  matchesSubscription$: Subscription;
  settings$:      Observable<any>;
  status$:        Observable<any>;
  summarized$:    Observable<any>;
  header$:        Observable<PlayerHeader>;
  intro$:         Observable<PlayerIntro>;
  equipped$:      Observable<EquippedItems>;
  pgcr$:          Observable<fromPgcr.State>;
  recentMatches:  any[];

  constructor(private store: Store<fromRoot.State>,
              private el:ElementRef) {

    // this.settings$ = store.select(fromRoot.getStatsSettings)
    //   .distinctUntilChanged()
    //   .share();
    //

    this.status$ = store.select(fromRoot.getStatusForPlayer(el.nativeElement.id.toLowerCase()));

    this.header$ = store.select(fromRoot.getPlayerHeader(el.nativeElement.id));
    this.summarized$ = store.select(fromRoot.getPlayerSummarized(el.nativeElement.id));
    this.intro$ = store.select(fromRoot.getPlayerIntro(el.nativeElement.id));
    this.equipped$ = store.select(fromRoot.getPlayerEquipped(el.nativeElement.id));

    this.pgcr$ = store.select(fromRoot.getPlayerPgcr(el.nativeElement.id));

    // this.matchesSubscription$ = store.select(fromRoot.getRecentActivities(this.el.nativeElement.id, 3))
    //   .subscribe((activities: Match[]) => {
    //     if (activities) {
    //       this.recentMatches = activities.map(a => {
    //         return {
    //           instanceId: a.instanceId,
    //           standing: a.standing,
    //           team: 0,
    //           period: a.period
    //         }
    //       });
    //     }
    //   });
    //
  }

  getMatchHistory() {
    this.store.select(fromRoot.getPlayerLastMatches(this.el.nativeElement.id))
      .subscribe(matches => {
        if (matches.length > 0) {
          matches.map(match =>
            this.store.dispatch(new pgcrActions.SearchPGCR({
              instanceId: match.instanceId,
              characterId: match.characterId,
              pIndex: this.el.nativeElement.id
            })));
        }});
  };

  ngOnDestroy() {
    this.matchesSubscription$.unsubscribe();
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
