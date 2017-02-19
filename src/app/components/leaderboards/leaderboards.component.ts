import {
  Component, ChangeDetectionStrategy, animate, transition, style, state, trigger, OnInit
} from '@angular/core';
import { Store }                from "@ngrx/store";
import { ActivatedRoute }       from "@angular/router";
import { Observable }           from "rxjs/Observable";
import { MapInfo}               from "../../models/map-stats.model";
import { MEDALS_REF }           from "../../services/constants";
import { SelectedLeaderboardItems, LeaderboardSelectList } from "../../models/leaderboard.model";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";
import * as mapActions          from "../../actions/maps.actions";

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

export class LeaderboardsComponent {
  maxWeek: number;
  currentWeek: number;
  updatedAt$: Observable<string>;
  slideMap$: Observable<string>;
  leaderboardTitle$: Observable<string>;
  selected$: Observable<SelectedLeaderboardItems>;
  selectedType: any;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  items$: Observable<any[]>;
  currentMap$: Observable<any>;
  previousMap$: Observable<any>;
  nextMap$: Observable<any>;
  medalList: Array<LeaderboardSelectList> = MEDALS_REF;
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

    Observable.combineLatest(
      this.store.select(fromRoot.getCurrentWeek),
      this.route.data,
      this.route.params,
      (week, data, params) => {
        return Object.assign({}, {
          week: week,
          board: data['board'],
          platform: data['platform'],
          gamertag: params['gamertag'],
          type: params['type'] || data['type']
        })
      })
      .subscribe(data => {
        this.currentWeek = parseInt(data.week);
        if (!this.maxWeek) {
          this.maxWeek = parseInt(data.week);
        }

        // if (data.week) {
        //   this.currentWeek = parseInt(data.week);
        //   this.store.dispatch(new mapActions.SlideMapAction({
        //     direction: 'left',
        //     week: this.currentWeek
        //   }));
        // }
        if (data.board == 'weapons' && data.type != 'All') {
          this.store.dispatch(new leaderboardActions.UpdateFilterAction({
            type: data.type
          }))
        } else {
          let payload = {type: data.board, selected: data.type, gamertag: data.gamertag, week: this.currentWeek};
          this.store.dispatch(new leaderboardActions.GetWeaponListAction(payload));
          this.store.dispatch(new leaderboardActions.SetLeaderboardAction(payload));
        }
      });
  }

  onPageChange(number: number) {
    this.store.dispatch(new leaderboardActions.ChangePageAction(number));
  }

  goToWeek(week: number) {
    if (week > 44 && week< this.maxWeek + 1) {
      let direction = (week < this.currentWeek) ? 'left' : 'right';
      this.currentWeek = week;
      this.store.dispatch(new mapActions.SlideMapAction({direction: direction, week: this.currentWeek}));
    }
  }

}
