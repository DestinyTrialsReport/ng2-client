import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as fromRoot        from '../../reducers';
import * as playerActions   from '../../actions/player.actions';
import { Store }            from "@ngrx/store";
import { CurrentMap }       from "../../models/map-stats.model";
import { Observable }       from "rxjs/Observable";
import { Player }           from "../../models/player.model";

@Component({
  selector: 'menu',
  host: {
    'class': 'component--block'
  },
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MenuComponent {
  currentMap$: Observable<CurrentMap>;
  player1$: Observable<Player>;
  player2$: Observable<Player>;
  player3$: Observable<Player>;
  myReport$: Observable<boolean>;
  searchedName: string;
  isXbox: boolean;
  @Input() query: string = '';
  @Input() searching = false;

  constructor(private store: Store<fromRoot.State>) {
    this.currentMap$ = store.select(state => state.map.currentMap);
    this.player1$ = store.select(state => state.players.player1);
    this.player2$ = store.select(state => state.players.player2);
    this.player3$ = store.select(state => state.players.player3);
    this.myReport$ = store.select(state => state.characters.loaded);
  }

  search() {
    let platform = this.isXbox ? 1 : 2;
    this.store.dispatch(new playerActions.SearchPlayer({platform: platform, name: this.searchedName, playerIndex: 'player1'}));
  }

  togglePlatform(event: Event) {
    console.log(event)
  }
}
