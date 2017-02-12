import {
  Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { Store }                from "@ngrx/store";
import { ActivatedRoute }       from "@angular/router";
import { Location }             from '@angular/common';
import { Observable }           from "rxjs/Observable";

import { CurrentMap }           from "../../models/map-stats.model";

import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";
import * as mapActions          from "../../actions/maps.actions";
import {MEDALS_REF} from "../../services/constants";

@Component({
  selector: 'leaderboards',
  styleUrls: ['./leaderboards.component.css'],
  templateUrl: 'leaderboards.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardsComponent implements OnInit {
  medalList: Array<{id: number; statId?: string; text: string}> = MEDALS_REF;
  maxWeek: number = 63;
  leaderboardType$: Observable<string>;
  leaderboardTitle$: Observable<string>;
  currentPage$: Observable<number>;
  searchedPlayer$: Observable<string>;
  currentWeek: number;
  currentMap$: Observable<CurrentMap>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  selectedType$: Observable<any>;
  selectedFilter$: Observable<number>;
  playerWeapons$: Observable<any[]>;
  items$: Observable<any[]>;
  typeSelection$: Observable<{ id: any; statId?: string; text: string; }[]>;

  leaderboardTypes: Array<{value: string, text: string}> = [
    {value: 'weapon-types', text: 'Weapon Types'},
    {value: 'medals', text: 'Medals'},
    {value: 'players', text: 'Players'},
  ];

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private location: Location) {

    this.leaderboardType$ = store.select(fromRoot.getLeaderboardType)
      .distinctUntilChanged();

    this.leaderboardTitle$ = store.select(fromRoot.getLeaderboardTitle)
      .distinctUntilChanged();

    this.currentMap$ = store.select(fromRoot.getCurrentMap)
      .distinctUntilChanged();

    this.currentMap$.filter(map => !!map).subscribe(map => this.currentWeek = parseInt(map.week));

    this.items$ = store.select(fromRoot.getLeaderboardItems)
      .distinctUntilChanged();

    this.selectedType$ = store.select(fromRoot.getLeaderboardsSelectedType)
      .distinctUntilChanged();

    this.selectedFilter$ = store.select(fromRoot.getLeaderboardsSelectedFilter)
      .distinctUntilChanged();

    this.currentPage$ = store.select(fromRoot.getLeaderboardsCurrentPage);

    this.loading$ = store.select(fromRoot.getLeaderboardsLoadingStatus)
      .distinctUntilChanged();

    this.error$ = store.select(fromRoot.getLeaderboardsErrorStatus)
      .distinctUntilChanged();

    this.typeSelection$ = store.select(fromRoot.getLeaderboardTypeSelection)
      .distinctUntilChanged();

    store.select(fromRoot.getLeaderboardsQueryString).subscribe(params => {
      if (params) {
        this.location.go(`/leaderboards?${params}`);
      } else {
        this.location.go(`/leaderboards`);
      }
    });

  }

  ngOnInit() {
    Observable.combineLatest(
      this.currentMap$,
      this.route.queryParams,
      (map, params) => {
        return {
          week: map.week,
          params: params
        }
      })
      .subscribe(data => {
        this.currentWeek = parseInt(data.week);
        if (data.params['gamertag'] && data.params['platform']) {
          this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: 'select-leaderboard', week: this.currentWeek}));
          this.store.dispatch(new leaderboardActions.SearchPlayerAction({
            name: data.params['gamertag'],
            week: this.currentWeek,
            platform: data.params['platform']
          }));
        }
        this.store.dispatch(new leaderboardActions.SetLeaderboardAction({type: 'weapon-types', week: this.currentWeek}));
      });
  }

  onPageChange(number: number) {
    this.store.dispatch(new leaderboardActions.ChangePageAction(number));
  }

  previousMap() {
    let prevWeek:number = this.currentWeek - 1;
    if (prevWeek > 1) {
      this.currentWeek = prevWeek;
      this.store.dispatch(new mapActions.SlideMapAction({direction: 'right', week: this.currentWeek}));
    }
  }

  nextMap() {
    let nextWeek:number = this.currentWeek + 1;
    if (nextWeek <= this.maxWeek) {
      this.currentWeek = nextWeek;
      this.store.dispatch(new mapActions.SlideMapAction({direction: 'left', week: this.currentWeek}));
    }
  }

}
