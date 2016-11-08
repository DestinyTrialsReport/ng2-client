import { Component, ChangeDetectionStrategy, style, state, animate, transition, trigger }  from '@angular/core';
import { MapsService }    from "../services/maps.service";
import { Store }          from "@ngrx/store";
import { Observable }     from "rxjs/Observable";
import { MapInfo }        from "../models/map-stats.model";
import * as fromRoot      from '../reducers';
import * as mapActions    from "../actions/maps.actions";

@Component({
  selector: '[maps]',
  host: {
    'class': 'home'
  },
  animations: [
    trigger('direction', [
      state('left',  style({transform: 'translate3d(5em, 0, 0)', opacity: 0})),
      state('right-done',  style({transform: 'translate3d(5em, 0, 0)', opacity: 1})),
      state('left-done',  style({transform: 'translate3d(-5em, 0, 0)', opacity: 1})),
      state('right', style({transform: 'translate3d(-5em, 0, 0)', opacity: 0})),
      transition('* => *', animate('.3s ease-in-out, opacity linear'))
    ])
  ],
  templateUrl: 'maps.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent {
  maxWeek: number;
  onWeek: number;
  slideMap:string;
  mapInfo$: Observable<MapInfo>;

  constructor(public mapService: MapsService,
              private store: Store<fromRoot.AppState>) {
    this.mapInfo$ = store.select(state => state['map'].mapInfo);
    store.select(state => state.map.currentMap).subscribe(map => {
      this.maxWeek = parseInt(map.week);
      this.onWeek = parseInt(map.week);
    });
  }

  previousMap() {
    let prevWeek:number = this.onWeek - 1;
    if (prevWeek > 1) {
      this.onWeek = prevWeek;
      this.slideMap = 'left';
      Observable.of(this.store.dispatch(new mapActions.SearchCompleteAction(this.onWeek)))
        .subscribe(() => this.slideMap = 'right-done');
    }
  }

  nextMap() {
    let nextWeek:number = this.onWeek + 1;
    if (nextWeek <= this.maxWeek) {
      this.onWeek = nextWeek;
      this.slideMap = 'right';
      Observable.of(this.store.dispatch(new mapActions.SearchCompleteAction(this.onWeek)))
        .subscribe(() => this.slideMap = 'left-done');
    }
  }
}
