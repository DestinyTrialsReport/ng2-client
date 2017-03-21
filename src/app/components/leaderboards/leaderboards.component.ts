import {
  Component, ChangeDetectionStrategy, animate, transition, style, state, trigger, OnDestroy
} from '@angular/core';
import { Store }                from "@ngrx/store";
import {ActivatedRoute, Router}       from "@angular/router";
import { Observable }           from "rxjs/Observable";
import { SelectedLeaderboardItems, LeaderboardSelectList } from "../../models/leaderboard.model";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";
import * as mapActions          from "../../actions/maps.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'leaderboards',
  animations: [
    trigger('animation', [
      state('idle', style({ transform: 'translate3d(0, 0, 0)', opacity: 1 })),
      state('right', style({ transform: 'translate3d(2rem, 0, 0)', opacity: 0 })),
      state('left', style({ transform: 'translate3d(-2rem, 0, 0)', opacity: 0 })),
      transition('idle => *', animate('.2s cubic-bezier(0.77,0,1,1)), opacity linear')),
      transition('* => idle', animate('.2s cubic-bezier(0,0,0.23,1)), opacity linear')),
      transition('left => right, right => left', animate('0s ease-in-out, opacity linear'))
    ])
  ],
  styleUrls: ['./leaderboards.component.css'],
  templateUrl: './leaderboards.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardsComponent implements OnDestroy {
  maxWeek: number;
  currentWeek: number;
  selectedWeek: number;
  selectedYear: number;
  selectedBoard: string;
  selectedType: string;
  updatedAt$: Observable<string>;
  slideMap$: Observable<string>;
  leaderboardTitle$: Observable<string>;
  selected$: Observable<SelectedLeaderboardItems>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  items$: Observable<any[]>;
  currentMap$: Observable<any>;
  paramSubscription$: Subscription;
  weaponList$: Observable<Array<LeaderboardSelectList>>;
  typeSelection$: Observable<Array<LeaderboardSelectList>>;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {

    this.leaderboardTitle$ = store.select(fromRoot.getLeaderboardTitle)
      .distinctUntilChanged();

    this.currentMap$ = store.select(fromRoot.getMapInfo)
      .distinctUntilChanged();

    this.updatedAt$ = store.select(fromRoot.getUpdatedAt)
      .distinctUntilChanged();

    this.selected$ = store.select(fromRoot.getLeaderboardsSelected)
      .distinctUntilChanged();

    this.items$ = store.select(fromRoot.getLeaderboardItems)
      .distinctUntilChanged();

    this.slideMap$ = store.select(state => state['map'].slideMap)
      .distinctUntilChanged();

    this.loading$ = store.select(fromRoot.getLeaderboardsLoadingStatus)
      .distinctUntilChanged();

    this.error$ = store.select(fromRoot.getLeaderboardsErrorStatus)
      .distinctUntilChanged();

    this.typeSelection$ = store.select(fromRoot.getLeaderboardTypeSelection)
      .distinctUntilChanged();

    this.weaponList$ = store.select(fromRoot.getLeaderboardWeaponList)
      .distinctUntilChanged();

    this.paramSubscription$ = Observable.combineLatest(
      this.store.select(fromRoot.getCurrentMap),
      this.store.select(fromRoot.getMap),
      this.route.data,
      this.route.params,
      (currentMap, selectedMap, data, params) => {
        let week;
        if (selectedMap) {week = selectedMap.week;}
        // if (params['week']) {this.goToWeek(params['week'])}
        return Object.assign({}, {
          maxWeek: currentMap.week,
          selectedWeek: week,
          board: data['board'],
          platform: data['platform'],
          gamertag: params['gamertag'],
          type: params['type']
        })
      })
      .distinctUntilChanged()
      .subscribe(data => {
        this.maxWeek = parseInt(data.maxWeek);

        if ((data.board != this.selectedBoard) ||
            (data.type != this.selectedType) ||
            (data.selectedWeek != this.selectedWeek)) {

          this.selectedWeek = data.selectedWeek ? parseInt(data.selectedWeek) : this.maxWeek;
          if (this.selectedWeek > 99 && this.selectedWeek < 200) {
            this.selectedYear = 1;
          } else if (this.selectedWeek < 99) {
            this.selectedYear = this.selectedWeek > 44 ? 3 : 2;
          } else {
            this.selectedYear = this.selectedWeek == 300 ? 3 : 2;
          }
          this.selectedBoard = data.board;
          this.selectedType = data.type;

          let payload = {
            type: data.board,
            selected: data.type,
            gamertag: data.gamertag,
            platform: data.platform,
            week: this.selectedWeek
          };

          this.store.dispatch(new leaderboardActions.GetWeaponListAction(payload));
          this.store.dispatch(new leaderboardActions.SetLeaderboardAction(payload));
        }
      });
  }

  onPageChange(number: number) {
    this.store.dispatch(new leaderboardActions.ChangePageAction(number));
  }

  goToWeek(week: number) {
    if ((week > 0 && week < 117) || (week == 200 || week == 300)) {
      let direction = (week < this.selectedWeek) ? 'left' : 'right';
      // if (week > 99) {
      //   direction = 'idle';
      // }
      this.store.dispatch(new mapActions.SlideMapAction({direction: direction, week: week}));
    }
  }

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }

}
