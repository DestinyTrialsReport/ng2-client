import {
  Component, ChangeDetectionStrategy, style, state, trigger, animate, transition, ViewChild,
  ElementRef
} from '@angular/core';
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
      state('null' , style({
        transform: 'translate3d(0, 2rem, 0)',
        opacity: 0
      })),
      state('undefined' , style({
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
  focusOnPlayer: number = 1;
  panActive: boolean = false;
  panStartX: number;
  @ViewChild('playersContainer') playersContainer: ElementRef;

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

  shiftPlayerFocus(direction: number) {
    this.focusOnPlayer = Math.max(1, Math.min(3, this.focusOnPlayer + ((window.innerWidth > 768 ? 2 : 1) * direction)));
  }

  panStart() {
    if (window.innerWidth <= 960) {
      this.panActive = true;
      this.playersContainer.nativeElement.style['transition'] = 'none';
      this.playersContainer.nativeElement.style['-webkit-transition'] = 'none';
      this.panStartX = parseFloat(window.getComputedStyle(this.playersContainer.nativeElement).transform.split(',')[4]);
      if (isNaN(this.panStartX)) {
        this.panStartX = 0;
      }
    }
  }

  panMove(deltaX: number) {
    if (this.panActive) {
      this.playersContainer.nativeElement.style['-webkit-transform'] = 'translate3d(' + (this.panStartX + (deltaX / 2)) + 'px, 0, 0)';
      this.playersContainer.nativeElement.style['transform'] = 'translate3d(' + (this.panStartX + (deltaX / 2)) + 'px, 0, 0)';
    }
  }

  panEnd(deltaX: number) {
    this.playersContainer.nativeElement.style['-webkit-transition'] = null;
    this.playersContainer.nativeElement.style['transition'] = null;
    this.playersContainer.nativeElement.style['-webkit-transform'] = null;
    this.playersContainer.nativeElement.style['transform'] = null;

    if (deltaX < -20) {
      this.shiftPlayerFocus(1);
    } else if (deltaX > 20) {
      this.shiftPlayerFocus(-1);
    }
    this.panActive = false;
  }
}
