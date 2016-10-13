import {Component, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Input, Output}    from "@angular/core/src/metadata/directives";
import {AppState}         from "../reducers/index";
import {Store}            from "@ngrx/store";
import {CurrentMap}       from "../models/map-stats.model";
import {Observable}       from "rxjs/Observable";
import * as playerActions from '../actions/player.actions';

@Component({
  selector: '[control]',
  templateUrl: 'control.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  currentMap$: Observable<CurrentMap>;
  @Input() query: string = '';
  @Input() searching = false;
  // @Output() search = new EventEmitter<string>();

  constructor(private store: Store<AppState>) {
    this.currentMap$ = store.select(state => state.map.currentMap);
  }

  search(query: string) {
    this.store.dispatch(new playerActions.SearchPlayer([query, 'player1']));
  }

}
