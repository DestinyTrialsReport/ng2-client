import {Component, ChangeDetectionStrategy, style, state, trigger, animate, transition} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable }     from "rxjs/Rx";
import { Store }          from "@ngrx/store";
import * as fromRoot      from '../../reducers';
import * as fromSearch    from '../../reducers/search.reducer';
import * as player        from '../../actions/player.actions';
import * as myPlayer        from '../../actions/my-player.actions';

@Component({
  selector: 'my-report',
  animations: [
    trigger('playerLoaded', [
      state('void' , style({
        transform: 'translate3d(0, 2rem, 0)',
        opacity: 0
      })),
      state('false', style({
        transform: 'translate3d(0, 2rem, 0)',
        opacity: 0
      })),
      state('true' , style({
        transform: 'translate3d(0, 0rem, 0)',
        opacity: 1
      })),
      transition(
        "void => *, false => *",
        [animate("500ms cubic-bezier(0.0, 0.0, 0.2, 1), .5s opacity linear", style({transform: "translate3d(0, 0rem, 0)"}))]
      )
    ])
  ],
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyReportComponent {
  players: Observable<fromSearch.State>;

  constructor(public  route: ActivatedRoute,
              private store: Store<fromRoot.State>) {

    this.players = this.store.select(s => s.search);

    this.store.select(s => s.characters).subscribe(state => {
      if (state.loaded) {
        state.characterIds.map((id, index) => {
          if (index > 0) {
            new myPlayer.SearchMyCompleteAction([state.player, `player${index + 1}`])
          }
          this.store.dispatch(new player.SearchAccount([state.characters[id], `player${index + 1}`]))
        });
      }
    });

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
      .subscribe(data => this.store.dispatch(new player.SearchPlayer({platform: data.platform, name: data.player, playerIndex: 'myPlayer'})));
  }

  search(platform: number, name: string) {
    this.store.dispatch(new player.SearchPlayer({platform: platform, name: name, playerIndex: 'myPlayer'}));
  }
}
