import {Component, Input, ChangeDetectionStrategy, OnInit, AfterViewInit} from '@angular/core';
import { Store }                from "@ngrx/store";
import { CurrentMap }           from "../../models/map-stats.model";
import { Observable }           from "rxjs/Observable";
import { Player }               from "../../models/player.model";

import * as fromRoot            from '../../reducers';
import * as playerActions       from '../../actions/player.actions';
import * as leaderboardActions  from '../../actions/leaderboard.actions';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from "@angular/router";

@Component({
  selector: 'menu',
  host: {
    'class': 'component--block'
  },
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit, AfterViewInit {
  currentMap$: Observable<CurrentMap>;
  player1$: Observable<Player>;
  player2$: Observable<Player>;
  player3$: Observable<Player>;
  myReport$: Observable<boolean>;
  showAd: boolean = true;
  searchedName: string;
  currentWeek: number;
  isXbox: boolean;
  @Input() query: string = '';
  @Input() searching = false;

  constructor(private store: Store<fromRoot.State>,
              public  router: Router) {
    this.currentMap$ = store.select(state => state.map.currentMap);
    this.player1$ = store.select(state => state.players.player1);
    this.player2$ = store.select(state => state.players.player2);
    this.player3$ = store.select(state => state.players.player3);
    this.myReport$ = store.select(state => state.characters.loaded);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showAd = !this.showAd;
      }
    });
  }

  ngOnInit() {
    this.currentMap$.subscribe(map => {
      this.currentWeek = parseInt(map.week);
    });
  }

  ngAfterViewInit() {
  }

  searchPlayer() {
    let platform = this.isXbox ? 1 : 2;
    if (window.location.pathname === '/leaderboards') {
      this.store.dispatch(new leaderboardActions.SearchPlayerAction({name: this.searchedName, week: this.currentWeek, platform: platform}));
    } else {
      this.router.navigate([this.isXbox ? '/xbox' : '/ps', this.searchedName]);
    }
    // this.store.dispatch(new playerActions.SearchPlayer({platform: platform, name: this.searchedName, playerIndex: 'player1'}));
  }

  togglePlatform(event: Event) {
    console.log(event)
  }
}
