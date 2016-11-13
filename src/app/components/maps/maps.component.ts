import { Component, ChangeDetectionStrategy, ChangeDetectorRef, style, state, animate, transition, trigger }  from '@angular/core';
import { MapsService }    from "../../services/maps.service";
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
  templateUrl: 'maps.template.html'
})

export class MapsComponent {
  maxWeek: number;
  onWeek: number;
  slideMap: string;
  mapInfo$: Observable<MapInfo>;
  weaponUsage$: Observable<{ primary:WeaponUsage[], special:WeaponUsage[] }>;
  currentMap: Observable<any>;
  weapons: any;

  tooltipText: string = "Kindly provided by Guardian.gg. Click here to head over there for the complete list and a lot more cool stats!";
  percentageNoticeText:string = "Percentages are based on usage of weapon types in relation to total\
    kills in their category.<\hr/\>Difference to the average represents how\
    much more or less that specific weapon type is used on this map\
    in relation to all other Trials of Osiris maps since the latest balance update.";
  weaponStatsUrl: string = "https://guardian.gg/en/weapon-stats?platform=" + 2 + "&mode=14&start=" + '2016-09-02' + "&end=" + '2016-09-05';

  constructor(public mapService: MapsService,
              private store: Store<fromRoot.AppState>,
              private changeDetectorRef: ChangeDetectorRef) {
    this.slideMap = 'idle';

    store.select(state => state.map.currentMap).subscribe(map => {
      this.maxWeek = parseInt(map.week);
      this.onWeek = parseInt(map.week);
    });

    this.mapInfo$ = store.select(state => state['map'].mapInfo);

    this.weaponUsage$ = Observable.combineLatest(
      this.store.select(state => state['map'].weaponStats),
      this.store.select(state => state['map'].weaponTotals),
      (weapons, totals) => {
        if (!weapons || !totals) return {primary: [], special: []};

        const primaries: WeaponUsage[] = weapons.filter(w => w.bucketName == 'primary');
        const specials: WeaponUsage[] = weapons.filter(w => w.bucketName == 'special');
        return {
          primary: primaries.map(w => {
            const avgPercentage:number = 100 * (w.sum_kills / totals.primary.bucketSum);
            const killPercentage:number =  100 * (w.kills / totals.primary.sum);
            return Object.assign({}, w, {
              killPercentage: killPercentage,
              diffPercentage: killPercentage - avgPercentage
            });
          }),
          special: specials.map(w => {
            const avgPercentage:number = 100 * (w.sum_kills / totals.special.bucketSum);
            const killPercentage:number =  100 * (w.kills / totals.special.sum);
            return Object.assign({}, w, {
              killPercentage: killPercentage,
              diffPercentage: killPercentage - avgPercentage
            });
          })
        };
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
