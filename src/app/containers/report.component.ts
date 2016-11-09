import {
  Component, style, state, animate, transition, trigger, ChangeDetectionStrategy
}                         from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Rx";
import { Store }          from "@ngrx/store";
import { SearchState }    from "../reducers/search.reducer";
import * as fromRoot      from '../reducers';
import * as playerActions from '../actions/player.actions';

@Component({
  selector: 'report',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('player1Present', [
      state('null' , style({opacity: 0})),
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('* => true', animate('1s ease-in'))
    ]),
    trigger('player2Present', [
      state('null' , style({opacity: 0})),
      state('true' , style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('* => true', animate('1s ease-in'))
    ]),
    trigger('player3Present', [
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
        <div id="player1" class="player-container" [@player1Present]="(players | async)?.player1?.player" player></div>
        <div id="player2" class="player-container" [@player2Present]="(players | async)?.player2?.player" player></div>
        <div id="player3" class="player-container" [@player3Present]="(players | async)?.player3?.player" player></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {
  players:  Observable<SearchState>;

  constructor(public  route: ActivatedRoute,
              private store: Store<fromRoot.AppState>) {

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
