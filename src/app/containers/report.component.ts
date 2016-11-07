import {
  Component, style, state, animate, transition, trigger, ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Rx";
import { Store }          from "@ngrx/store";
import { PlayerService }  from "../services/player.service";
import { Activity }       from "../models/activity.model";
import * as fromRoot      from '../reducers';
import * as playerActions from '../actions/player.actions';
import { SearchState } from "../reducers/search.reducer";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'report',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('player1Visibility', [
      state('null' , style({opacity: 0})),
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('* => true', animate('1s ease-in'))
    ]),
    trigger('player2Visibility', [
      state('null' , style({opacity: 0})),
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('* => true', animate('1s ease-in'))
    ]),
    trigger('player3Visibility', [
      state('null' , style({opacity: 0})),
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('* => true', animate('1s ease-in'))
    ])
  ],
  template: `
    <div class="players-wrapper" >
      <div class="players" 
            id="playerContainer">
        <div id="player1" class="player-container" [@player1Visibility]="(players | async)?.player1?.player" player></div>
        <div id="player2" class="player-container" [@player2Visibility]="(players | async)?.player2?.player" player></div>
        <div id="player3" class="player-container" [@player3Visibility]="(players | async)?.player3?.player" player></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {
  players:  Observable<SearchState>;

  constructor(public  route: ActivatedRoute,
              private store: Store<fromRoot.AppState>,
              private playerService: PlayerService) {

    Observable.combineLatest(
      store.select(s => s.activities.player1),
      store.select(s => s.players.player1),
      (activities, player) => {
        if (player && player.membershipId && activities && activities[0]) {
          const activity:Activity = activities[0];
          return {
            activity: activity,
            membershipId:  player.membershipId,
            team: activity.values.team.basic.value,
          };
          // const standing:number = activity.values.standing.basic.value;
        }
      })
      .subscribe(data => {
        if (data) {
          playerService.pgcr(data.activity.activityDetails.instanceId)
            .map(pgcr => pgcr.entries
              .filter(entry => entry.values.team.basic.value === data.team && entry.player.destinyUserInfo.membershipId != data.membershipId)
              .map(entry => entry.player.destinyUserInfo)
            )
            .subscribe(teammates => {
              this.store.dispatch(new playerActions.SearchCompleteAction([teammates[0], 'player2']));
              return IntervalObservable.create(1000)
                .take(1)
                .subscribe(() => {
                  this.store.dispatch(new playerActions.SearchCompleteAction([teammates[1], `player3`]));
                });
            });
        }
    });

    this.players = this.store.select(s => s.search)
      .distinctUntilChanged()
      .share();

    Observable.combineLatest(
      this.route.params,
      this.route.data,
      (params, data) => {
        if (params["player1"] && data["platform"]) {
          return {
            player: params["player1"],
            platform: data["platform"]
          }
        }
      })
      .subscribe(data => this.store.dispatch(new playerActions.SearchPlayer([data.platform, data.player, 'player1'])));
  }

  search(platform: number, name: string) {
    this.store.dispatch(new playerActions.SearchPlayer([platform, name, 'player1']));
  }

}
