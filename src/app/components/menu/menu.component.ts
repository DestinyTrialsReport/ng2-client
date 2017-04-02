import {Component, Input, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Store }                from "@ngrx/store";
import { CurrentMap }           from "../../models/map-stats.model";
import { Observable }           from "rxjs/Observable";
import { Player }               from "../../models/player.model";

import * as fromRoot            from '../../reducers';
import * as playerActions       from '../../actions/player.actions';
import * as settingsActions     from '../../actions/settings.actions';
import * as leaderboardActions  from '../../actions/leaderboard.actions';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu',
  host: {
    'class': 'component--block'
  },
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit, OnDestroy {
  currentMap$: Observable<CurrentMap>;
  player1$: Observable<Player>;
  player2$: Observable<Player>;
  player3$: Observable<Player>;
  myReport$: Observable<boolean>;
  settings$: Observable<any>;
  showAd: boolean = true;
  searchedName: string;
  searchedTeammate1: string;
  searchedTeammate2: string;
  currentWeek: number;
  isXbox: boolean;
  settingsOverview: boolean;
  @Input() query: string = '';
  @Input() searching = false;
  mapSubscription$: Subscription;
  settingSubscription$: Subscription;

  constructor(private store: Store<fromRoot.State>,
              public  router: Router) {
    this.currentMap$ = store.select(state => state.map.currentMap);
    this.player1$ = store.select(state => state.players.player1);
    this.player2$ = store.select(state => state.players.player2);
    this.player3$ = store.select(state => state.players.player3);
    this.myReport$ = store.select(state => state.characters.loaded);
    this.settings$ = store
      .select(fromRoot.getStatsSettings)
      .distinctUntilChanged()
      .share();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showAd = !this.showAd;
      }
    });
  }

  ngOnInit() {
    this.mapSubscription$ = this.currentMap$.subscribe(map => {
      this.currentWeek = parseInt(map.week);
    });
    this.settingSubscription$ = this.settings$.subscribe(settings => {
      this.settingsOverview = settings.overview;
    });
  }

  ngOnDestroy() {
    this.mapSubscription$.unsubscribe();
  }

  searchPlayer() {
    let platform = this.isXbox ? '/xbox' : '/ps';
    this.router.navigate([platform, this.searchedName]);
    this.searchedName = null;
  }

  searchTeammate(name, index) {
    let platform = this.isXbox ? 1 : 2;
    this.store.dispatch(new playerActions.SearchPlayer({platform: platform, name: name, playerIndex: index}));
  }

  togglePlatform(event: Event) {
    console.log(event)
  }

  toggleSettings(event: Event) {
    this.store.dispatch(new settingsActions.ToggleSettingsAction({name: 'overview', value: this.settingsOverview}));
  }
}
