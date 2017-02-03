import {Component, style, state, animate, transition, trigger, OnInit}  from '@angular/core';
import { MapsService }    from "../../services/maps.service";
import { Store }          from "@ngrx/store";
import { Observable }     from "rxjs/Observable";
import * as fromRoot      from '../../reducers';
import * as leaderboardActions    from "../../actions/leaderboard.actions";
import {LBWeaponType} from "../../models/leaderboard.model";
import {MapInfo} from "../../models/map-stats.model";

@Component({
  selector: 'leaderboards',
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
  styleUrls: ['./leaderboards.component.css'],
  templateUrl: 'leaderboards.template.html'
})

export class LeaderboardsComponent implements OnInit {
  selectedType: string;
  selectedTier: number;
  page: number = 1;
  currentWeek: number;
  mapInfo$: Observable<MapInfo>;
  weapons$: Observable<LBWeaponType[]>;

  constructor(private store: Store<fromRoot.State>) {

    this.weapons$ = store.select(state => state['leaderboard'].weapons);
    this.mapInfo$ = store.select(state => state['map'].mapInfo);
    // store.select(state => state.map.currentMap);
  }

  ngOnInit() {
    this.selectedType = "Auto Rifle";
    this.selectedTier = 0;
    this.getType();
  }

  getType() {
    this.store.dispatch(new leaderboardActions.GetWeaponTypeAction({type: this.selectedType, week: 62}));
    this.page = 1;
    this.selectedTier = 0;
  }

  filterTier() {
    this.store.dispatch(new leaderboardActions.FilterByTierAction(this.selectedTier));
    this.page = 1;
    this.selectedTier = 0;
  }

}
