import {
  Component, ChangeDetectionStrategy, animate, transition, style, state, trigger
} from '@angular/core';
import { Store }                from "@ngrx/store";
import { ActivatedRoute }       from "@angular/router";
import { Observable }           from "rxjs/Observable";
import { MapInfo}               from "../../models/map-stats.model";
import { MEDALS_REF }           from "../../services/constants";

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
  templateUrl: 'leaderboards.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardsComponent {
  medalList: Array<{id: number; statId?: string; text: string}> = MEDALS_REF;
  maxWeek: number;
  currentWeek: number;
  updatedAt$: Observable<string>;
  slideMap$: Observable<string>;
  leaderboardType$: Observable<string>;
  leaderboardType: string;
  leaderboardTitle$: Observable<string>;
  selectedIcon$: Observable<string>;
  currentPage$: Observable<number>;
  selectedTier$: Observable<number>;
  selectedPlatform$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  selectedType$: Observable<any>;
  selectedType: any;
  items$: Observable<any[]>;
  currentMap$: Observable<MapInfo>;
  previousMap$: Observable<any>;
  nextMap$: Observable<any>;
  weaponList$: any;
  typeSelection$: Observable<{ id: any; statId?: string; text: string; }[]>;

  leaderboardTypes: Array<{value: string, text: string}> = [
    {value: 'weapons', text: 'Weapons'},
    {value: 'players', text: 'Players'},
    {value: 'medals', text: 'Medals'},
  ];

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {

    this.leaderboardType$ = store.select(fromRoot.getLeaderboardType)
      .distinctUntilChanged();

    this.leaderboardTitle$ = store.select(fromRoot.getLeaderboardTitle)
      .distinctUntilChanged();

    this.currentMap$ = store.select(fromRoot.getMap)
      .distinctUntilChanged();

    this.updatedAt$ = store.select(fromRoot.getUpdatedAt)
      .distinctUntilChanged();

    this.previousMap$ = store.select(fromRoot.getPreviousMap)
      .distinctUntilChanged();

    this.nextMap$ = store.select(fromRoot.getNextMap)
      .distinctUntilChanged();

    this.selectedIcon$ = store.select(fromRoot.getLeaderboardsSelectedIcon)
      .distinctUntilChanged();

    this.items$ = store.select(fromRoot.getLeaderboardItems)
      .distinctUntilChanged();

    this.selectedType$ = store.select(fromRoot.getLeaderboardsSelectedType)
      .distinctUntilChanged();

    this.selectedTier$ = store.select(fromRoot.getLeaderboardsSelectedTier)
      .distinctUntilChanged();

    this.selectedPlatform$ = store.select(fromRoot.getLeaderboardsSelectedPlatform)
      .distinctUntilChanged();

    this.currentPage$ = store.select(fromRoot.getLeaderboardsCurrentPage);

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
      this.route.queryParams,
      (week, params) => {
        return {
          week: week,
          params: params
        }
      })
      .subscribe(data => {

        this.currentWeek = parseInt(data.week);
        if (!this.maxWeek) {
          this.maxWeek = parseInt(data.week);
        }

        if (data.params['week']) {
          this.currentWeek = parseInt(data.params['week']);
          this.store.dispatch(new mapActions.SlideMapAction({
            direction: 'left',
            week: this.currentWeek
          }));
        }

        let payload = {week: this.currentWeek},
            board = data.params['board'] ? data.params['board'] : 'weapons',
            selected,
            filter;

        this.store.dispatch(new leaderboardActions.GetWeaponListAction(payload));

        if (data.params['gamertag'] && data.params['platform']) {

          this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: 'searched', week: this.currentWeek}));
          this.store.dispatch(new leaderboardActions.SearchPlayerAction({
            name: data.params['gamertag'],
            week: this.currentWeek,
            platform: data.params['platform']
          }));

        } else {
          if (data.params['weaponHash'] || data.params['weaponType']) {
            selected = data.params['weaponHash'] ? data.params['weaponHash'] : data.params['weaponType'];
            if (!data.params['board']) {
              board = data.params['weaponHash'] ? 'players' : 'weapons';
            }
          } else if (data.params['medal']) {
            selected = data.params['medal']
          }
          if (data.params['tier']) {
            filter = {tier: data.params['filter']};
          }
          this.store.dispatch(new leaderboardActions.SetLeaderboardAction(Object.assign({}, payload, {type: board, selected: selected}, filter)));
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
