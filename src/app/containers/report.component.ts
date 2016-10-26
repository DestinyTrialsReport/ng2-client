import {Component, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Observable";
import { Store }          from "@ngrx/store";
import { PlayerService }  from "../services/player.service";
import { Activity }       from "../models/activity.model";
import { Player }         from "../models/player.model";
import * as fromRoot      from '../reducers';
import * as playerActions from '../actions/player.actions';
import {SearchState} from "../reducers/search.reducer";

@Component({
  selector: 'report',
  host: {
    'class': 'home'
  },
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('player1Visibility', [
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('1 => 0', animate('1s ease-in')),
      transition('0 => 1', animate('1s ease-out'))
    ]),
    trigger('player2Visibility', [
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('1 => 0', animate('1s ease-in')),
      transition('0 => 1', animate('1s ease-out'))
    ]),
    trigger('player3Visibility', [
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('1 => 0', animate('1s ease-in')),
      transition('0 => 1', animate('1s ease-out'))
    ])
  ],
  template: `
    <div class="players-wrapper">
      <div class="player-shift-focus player-shift-focus--left"></div>
      <div class="player-shift-focus player-shift-focus--right"></div>
      <div class="players">
        <div id="player1" style="opacity: 0;" class="player-container" [@player1Visibility]="(players | async)?.player1?.player" player></div>
        <div id="player2" style="opacity: 0;" class="player-container" [@player2Visibility]="(players | async)?.player2?.player" player></div>
        <div id="player3" style="opacity: 0;" class="player-container" [@player3Visibility]="(players | async)?.player3?.player" player></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
          const membershipId:string = player.membershipId;
          const team:number = activity.values.team.basic.value;
          const standing:number = activity.values.standing.basic.value;

          playerService.pgcr(activity.activityDetails.instanceId).subscribe(pgcr => {
            const teammates: Player[] = pgcr.entries.filter(entry => entry.values.team.basic.value === team)
              .map(entry => entry.player.destinyUserInfo)
              .filter(player => player.membershipId != membershipId);

            this.store.dispatch(new playerActions.SearchCompleteAction([teammates[0], 'player2']));
            this.store.dispatch(new playerActions.SearchCompleteAction([teammates[1], 'player3']));
          })
        }
      }).subscribe();

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

    // this.route.params.subscribe(params => {
    //   // this.platform = 'ps';
    //   if (params["player1"]) {
    //     this.store.dispatch(new playerActions.SearchPlayer([params["player1"], 'player1']));
    //   }
    // });
  }

  search(platform: number, name: string) {
    this.store.dispatch(new playerActions.SearchPlayer([platform, name, 'player1']));
  }

}
