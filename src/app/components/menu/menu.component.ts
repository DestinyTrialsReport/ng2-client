import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store }                from "@ngrx/store";
import { CurrentMap }           from "../../models/map-stats.model";
import { Observable }           from "rxjs/Observable";
import { Subscription } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";

import * as fromRoot            from '../../reducers';
import * as playerActions       from '../../actions/player.actions';
import * as settingsActions     from '../../actions/settings.actions';

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
  player1$: Observable<string>;
  player2$: Observable<string>;
  player3$: Observable<string>;
  myReport$: Observable<boolean>;
  settings$: Observable<any>;
  showAd: boolean = true;
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
    this.player1$ = store.select(fromRoot.getPlayerName('Player1')).share();
    this.player2$ = store.select(fromRoot.getPlayerName('Player2')).share();
    this.player3$ = store.select(fromRoot.getPlayerName('Player3')).share();
    // this.myReport$ = store.select(state => state.characters.loaded);
    // this.settings$ = store
    //   .select(fromRoot.getStatsSettings)
    //   .distinctUntilChanged()
    //   .share();
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
    // this.settingSubscription$ = this.settings$.subscribe(settings => {
    //   this.settingsOverview = settings.overview;
    // });
  }

  ngOnDestroy() {
    this.mapSubscription$.unsubscribe();
  }

  search(params: [number, string, number]) {
    if (params[2] > 1) {
      this.store.dispatch(new playerActions[`SearchPlayer${params[2]}Action`]({platform: params[0], name: params[1]}));
    } else {
      this.router.navigate([params[0] === 1 ? 'xbox' : 'ps', params[1]]);
    }
  }

  toggleSettings(event: Event) {
    this.store.dispatch(new settingsActions.ToggleSettingsAction({name: 'overview', value: this.settingsOverview}));
  }
}
