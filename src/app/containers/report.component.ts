import {
  Component, style, state, animate, transition, trigger, ChangeDetectionStrategy, ViewChild, AfterViewInit
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
    <div class="players-wrapper" 
    [ngClass]="{
      'focus-on-player-one':   activePlayer === 1, 
      'focus-on-player-two':   activePlayer === 2, 
      'focus-on-player-three': activePlayer === 3
      }">
      <div class="players" 
            id="playerContainer"
           #playersWrapper
           (mousedown)="onPanStart($event)"
           (mousemove)="onPan($event)"
           (mouseup)="onPanEnd($event)">
        <div id="player1" class="player-container" [@player1Visibility]="(players | async)?.player1?.player" player></div>
        <div id="player2" class="player-container" [@player2Visibility]="(players | async)?.player2?.player" player></div>
        <div id="player3" class="player-container" [@player3Visibility]="(players | async)?.player3?.player" player></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements AfterViewInit {
  players:  Observable<SearchState>;
  isPanning: boolean;
  currentState: number = 0;
  startX: number = 0;
  endX: number = 0;
  activePlayer: number = 1;
  outerWidth: number = window.outerWidth;
  @ViewChild('playersWrapper') playersWrapper: any;

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

  onPanStart(event: MouseEvent) {
    this.startX = event.x;
    this.isPanning = true;
    this.playersWrapper.nativeElement.style.transition = 'none';
    this.playersWrapper.nativeElement.style['-webkit-transition'] = 'none';
    if (this.activePlayer === 1) {
      this.currentState = 0;
    } else {
      this.currentState = this.activePlayer === 2 ? -32.5 : -65.5;
    }
  }

  onPan(event: MouseEvent) {
    if (this.isPanning) {
      let delta: number = (100 / this.outerWidth) * (event.x - this.startX);
      this.playersWrapper.nativeElement.style.transform = `translate3d(${this.currentState + delta}%, 0px, 0px)`;
    }
  }

  onPanEnd(event: MouseEvent) {
    let delta: number = event.x - this.startX;
    this.playersWrapper.nativeElement.style = '';
    if (delta < -10) {
      if (this.activePlayer === 1) {
        this.activePlayer = 2;
      } else if (this.activePlayer === 2) {
        this.activePlayer = 3;
      }
    } else if (delta > 10) {
      if (this.activePlayer === 2) {
        this.activePlayer = 1;
      } else if (this.activePlayer === 3) {
        this.activePlayer = 2;
      }
    }
    this.playersWrapper.nativeElement.style.transition = 'transform ease-out .3s,-webkit-transform ease-out .3s';
    this.playersWrapper.nativeElement.style['-webkit-transition'] = '-webkit-transform ease-out .3s';
    this.isPanning = false;
  }

  ngAfterViewInit() {

  }
}
