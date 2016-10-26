import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import * as fromRoot              from '../reducers';
import {Store}            from "@ngrx/store";
import {CurrentMap}       from "../models/map-stats.model";
import {Observable}       from "rxjs/Observable";
import * as playerActions from '../actions/player.actions';
import {Player} from "../models/player.model";

@Component({
  selector: '[control]',
  templateUrl: 'control.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  currentMap$: Observable<CurrentMap>;
  player1$: Observable<Player>;
  player2$: Observable<Player>;
  player3$: Observable<Player>;
  @Input() query: string = '';
  @Input() searching = false;
  // @Output() search = new EventEmitter<string>();

  constructor(private store: Store<fromRoot.AppState>,) {
    this.currentMap$ = store.select(state => state.map.currentMap);
    this.player1$ = store.select(state => state.players.player1);
    this.player2$ = store.select(state => state.players.player2);
    this.player3$ = store.select(state => state.players.player3);
  }

  search(platform: number, name: string) {
    this.store.dispatch(new playerActions.SearchPlayer([platform, name, 'player1']));
  }

}
