import { Component, style, state, animate, transition, trigger }  from '@angular/core';
import { WeaponUsage }    from "../../models/map-stats.model";
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
  styleUrls: ['./maps.component.css'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent {
  maxWeek: number;
  onWeek: number;
  slideMap$: Observable<string>;
  mapInfo$: Observable<MapInfo>;
  primary$: Observable<WeaponUsage[]>;
  special$: Observable<WeaponUsage[]>;
  weapons$: Observable<Array<any>>;
  currentMap: Observable<any>;
  weapons: any;

  tooltipText: string = "Kindly provided by Guardian.gg. Click here to head over there for the complete list and a lot more cool stats!";
  percentageNoticeText:string = "Percentages are based on usage of weapon types in relation to total\
    kills in their category.<\hr/\>Difference to the average represents how\
    much more or less that specific weapon type is used on this map\
    in relation to all other Trials of Osiris maps since the latest balance update.";

  constructor(private store: Store<fromRoot.State>) {

    this.slideMap$ = store.select(state => state['map'].slideMap);

    store.select(state => state.map.currentMap).subscribe(map => {
      this.maxWeek = parseInt(map.week);
      this.onWeek = parseInt(map.week);
    });

    this.mapInfo$ = store.select(state => state['map'].mapInfo);
    this.primary$ = store.select(state => state['map'].primaryAvg);
    this.special$ = store.select(state => state['map'].specialAvg);

    this.weapons$ = store.select(fromRoot.getPrimaryAndSpecial);
  }

  previousMap() {
    let prevWeek:number = this.onWeek - 1;
    if (prevWeek > 1) {
      this.onWeek = prevWeek;
      this.store.dispatch(new mapActions.SlideMapAction({direction: 'right', week: this.onWeek}));
    }
  }

  nextMap() {
    let nextWeek:number = this.onWeek + 1;
    if (nextWeek <= this.maxWeek) {
      this.onWeek = nextWeek;
      this.store.dispatch(new mapActions.SlideMapAction({direction: 'left', week: this.onWeek}));
    }
  }
}
