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
declare var jQuery: any;

@Component({
  selector: 'report',
  host: {
    'class': 'home'
  },
  styleUrls: ['../app.component.css'],
  template: `
    <div class="players-wrapper">
      <!--<div class="player-shift-focus player-shift-focus&#45;&#45;left"></div>-->
      <!--<div class="player-shift-focus player-shift-focus&#45;&#45;right"></div>-->
      <!--<div class="players">-->
        <!--<div id="player1" style="opacity: 0;" class="player-container" [@player1Visibility]="(players | async)?.player1?.player" player></div>-->
        <!--<div id="player2" style="opacity: 0;" class="player-container" [@player2Visibility]="(players | async)?.player2?.player" player></div>-->
        <!--<div id="player3" style="opacity: 0;" class="player-container" [@player3Visibility]="(players | async)?.player3?.player" player></div>-->
      <!--</div>-->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyReportComponent {
  private options: any;
  players:  Observable<SearchState>;

  constructor(public  route: ActivatedRoute,
              private store: Store<fromRoot.AppState>,
              private playerService: PlayerService) {

    this.options={
      dataSource: [
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 271,
          "kills" : 1922,
          "deaths" : 1137,
          "name" : "The Burning Shrine",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_the_burning_shrine.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 44,
          "kills" : 360,
          "deaths" : 218,
          "name" : "Memento",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/memento.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 44,
          "kills" : 381,
          "deaths" : 207,
          "name" : "The Drifter",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/the_drifter.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 51,
          "kills" : 336,
          "deaths" : 220,
          "name" : "The Anomaly",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_the_anomaly.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009314585865,
          "count" : 96,
          "kills" : 557,
          "deaths" : 387,
          "name" : "Widow's Court",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/widows_court.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 25,
          "kills" : 180,
          "deaths" : 116,
          "name" : "Blind Watch",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_blind_watch.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 91,
          "kills" : 613,
          "deaths" : 321,
          "name" : "Frontier",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/frontier.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 43,
          "kills" : 227,
          "deaths" : 146,
          "name" : "Floating Gardens",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/floating_gardens.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 73,
          "kills" : 574,
          "deaths" : 281,
          "name" : "Firebase Delphi",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_firebase_delphi.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 54,
          "kills" : 346,
          "deaths" : 225,
          "name" : "The Timekeeper",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/timekeeper.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 123,
          "kills" : 780,
          "deaths" : 494,
          "name" : "Asylum",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_asylum.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 112,
          "kills" : 795,
          "deaths" : 489,
          "name" : "Bannerfall",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/bannerfall.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 143,
          "kills" : 854,
          "deaths" : 501,
          "name" : "Twilight Gap",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_twilight_gap_2.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 15,
          "kills" : 99,
          "deaths" : 43,
          "name" : "Black Shield",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/black_shield.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 94,
          "kills" : 588,
          "deaths" : 360,
          "name" : "Last Exit",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/last_exit.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 68,
          "kills" : 447,
          "deaths" : 274,
          "name" : "Rusted Lands",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_the_rusted_lands.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 43,
          "kills" : 322,
          "deaths" : 201,
          "name" : "Pantheon",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_pantheon.jpg"
        },
        {
          "membershipId" : 4611686018429573612,
          "characterId" : 2305843009217896267,
          "count" : 44,
          "kills" : 305,
          "deaths" : 190,
          "name" : "Exodus Blue",
          "pgcrImage" : "/img/theme/destiny/bgs/pgcrs/crucible_exodus_blue.jpg"
        }
      ],
      marginLeft: 10,
      marginTop: 10,
      rightPanelTilesWidth: 200,
      rightPanelTilesHeight: 156,
      maximizedState: '<h3>${name}</h3><img src="https://www.bungie.net${pgcrImage}" title="${name}" alt="error" /><p class="text">${count}</p><div style="clear: both"><span class="color">Skills:</span></div><ul class="skills"></ul><div class="linkedIn"><span class="color">LinkedIn:</span> <a href="${kills}" target="_blank">http://www.linkedin.com/profile</a></div>',
      minimizedState:'<h4>${name}</h4><img src="https://www.bungie.net${pgcrImage}" class="minimized" title="${name}" alt="error" />'
    };

    this.players = this.store.select(s => s.search)
      .distinctUntilChanged()
      .share();
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
