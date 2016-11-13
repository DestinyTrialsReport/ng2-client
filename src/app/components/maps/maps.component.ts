import { Component, ChangeDetectionStrategy, style, state, animate, transition, trigger }  from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { MapsService }    from "../../services/maps.service";
import { Store }          from "@ngrx/store";
import { Observable }     from "rxjs/Observable";
import { MapInfo }        from "../../models/map-stats.model";
import * as fromRoot      from '../../reducers';
import * as mapActions    from "../../actions/maps.actions";

@Component({
  selector: 'maps',
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
  templateUrl: 'maps.template.html'
})

export class MapsComponent {
  maxWeek: number;
  onWeek: number;
  slideMap:string;
  mapInfo$: Observable<MapInfo>;

  constructor(public mapService: MapsService,
              private store: Store<fromRoot.AppState>,
              private changeDetectorRef: ChangeDetectorRef) {
    this.slideMap = 'idle';
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
      this.slideMap = 'right';
      setTimeout(() => {
        this.slideMap = 'left';
        this.changeDetectorRef.detectChanges();
        Observable.of(this.store.dispatch(new mapActions.SearchCompleteAction(this.onWeek)))
          .subscribe(() => {
            // TODO: This fires off to quickly, should be on LoadMapDataAction I think?
            this.slideMap = 'idle';
          });
        }, 200); // Make sure the exit animation has finished
    }
  }

  nextMap() {
    let nextWeek:number = this.onWeek + 1;
    if (nextWeek <= this.maxWeek) {
      this.onWeek = nextWeek;
      this.slideMap = 'left';
      setTimeout(() => {
        this.slideMap = 'right';
        this.changeDetectorRef.detectChanges();
        Observable.of(this.store.dispatch(new mapActions.SearchCompleteAction(this.onWeek)))
          .subscribe(() => {
            // TODO: This fires off to quickly, should be on LoadMapDataAction I think?
            this.slideMap = 'idle';
          });
        }, 200); // Make sure the exit animation has finished
    }
  }
}
