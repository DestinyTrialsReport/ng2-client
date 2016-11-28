import { Component, style, state, animate, transition, trigger, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Rx";
import { Store }          from "@ngrx/store";
import * as fromRoot      from '../../reducers';
import * as fromSearch    from '../../reducers/search.reducer';
import * as playerActions from '../../actions/player.actions';

@Component({
  selector: 'report',
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
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {
  players:  Observable<fromSearch.State>;
  focusOnPlayer:int = 1;

  constructor(public  route: ActivatedRoute,
              private store: Store<fromRoot.State>) {

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

  shiftPlayerFocus(direction: int) {
    this.focusOnPlayer = Math.max(1, Math.min(3, this.focusOnPlayer + ((window.innerWidth > 768 ? 2 : 1) * direction)));
  }
}
