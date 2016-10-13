import {Component, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Observable";
import { Store }          from "@ngrx/store";
import { PlayerService }  from "../services/player.service";
import { Activity }       from "../models/activity.model";
import { Player }         from "../models/player.model";
import * as fromRoot      from '../reducers';
import * as playerActions from '../actions/player.actions';

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
  <div [ngSwitch]="(player1Loaded | async)">
    <div class="players-wrapper" *ngSwitchCase="true">
      <div class="player-shift-focus player-shift-focus--left"></div>
      <div class="player-shift-focus player-shift-focus--right"></div>
      <div class="players">
        <div id="player1" class="player-container" [@player1Visibility]="(player1Loaded | async)" player></div>
        <div id="player2" class="player-container" [@player2Visibility]="(player2Loaded | async)" player></div>
        <div id="player3" class="player-container" [@player3Visibility]="(player3Loaded | async)" player></div>
      </div>
    </div>
    <div class="home__content" *ngSwitchCase="false" maps></div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {

  player1:  Observable<Player>;
  player2:  Observable<Player>;
  player3:  Observable<Player>;

  player1Loaded:  Observable<boolean>;
  player2Loaded:  Observable<boolean>;
  player3Loaded:  Observable<boolean>;

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

    this.player1 = this.store.select(s => s.players.player1)
      .distinctUntilChanged()
      .share();

    this.player2 = this.store.select(s => s.players.player2)
      .distinctUntilChanged()
      .share();

    this.player3 = this.store.select(s => s.players.player3)
      .distinctUntilChanged()
      .share();

    this.player1Loaded = this.player1
      .map(player => !!player);

    this.player2Loaded = this.player2
      .map(player => !!player);

    this.player3Loaded = this.player3
      .map(player => !!player);

    this.route.params.subscribe(params => {
      // this.platform = 'ps';
      if (params["player1"]) {
        this.store.dispatch(new playerActions.SearchPlayer([params["player1"], 'player1']));
      }
    });
  }

  search(query: string) {
    this.store.dispatch(new playerActions.SearchPlayer([query, 'player1']));
  }

}
