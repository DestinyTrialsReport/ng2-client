import {
  Component, style, state, animate,
  transition, trigger, OnInit } from '@angular/core';
import { Store }                from "@ngrx/store";
import { Observable }           from "rxjs/Observable";
import { LBWeaponType }         from "../../models/leaderboard.model";
import { CurrentMap }           from "../../models/map-stats.model";
import { LocalStorageService }  from "ng2-webstorage";
import { ItemDefinitions }      from "../../models/manifest.model";
import { TypeaheadMatch }       from "ng2-bootstrap";
import * as fromRoot            from '../../reducers';
import * as leaderboardActions  from "../../actions/leaderboard.actions";

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
  leaderboardType: string;
  selectedWeapon: string;
  currentPage$: Observable<number>;
  searchedPlayer$: Observable<string>;
  currentWeek: number;
  currentMap$: Observable<CurrentMap>;
  weapons$: Observable<LBWeaponType[]>;
  players$: Observable<any[]>;
  playerWeapons$: Observable<any[]>;
  weaponList$: Observable<{ id: string; name: string; }[]>;
  itemDefinitions: ItemDefinitions;

  leaderboardTypes: Array<{value: string, text: string}> = [
    {value: 'weapon-types', text: 'Weapon Types'},
    {value: 'players', text: 'Players'},
  ];

  weaponTypes: Array<{value: string, text: string}> = [
    {value: "Auto Rifle", text: "Auto Rifles"},
    {value: "Scout Rifle", text: "Scout Rifles"},
    {value: "Pulse Rifle", text: "Pulse Rifles"},
    {value: "Hand Cannon", text: "Hand Cannons"},
    {value: "Sniper Rifle", text: "Sniper Rifles"},
    {value: "Fusion Rifle", text: "Fusion Rifles"},
    {value: "Shotgun", text: "Shotguns"},
    {value: "Sidearm", text: "Sidearms"},
  ];

  weaponTiers: Array<{value: number, text: string}> = [
    {value: 0, text: "All"},
    {value: 6, text: "Exotic"},
    {value: 5, text: "Legendary"},
    {value: 4, text: "Rare"},
    {value: 3, text: "Uncommon"},
    {value: 2, text: "Common"},
  ];

  constructor(private store: Store<fromRoot.State>,
              public storage: LocalStorageService) {

    this.weapons$ = store.select(state => state['leaderboard'].weapons);

    this.currentMap$ = store.select(state => state['map'].currentMap);

    this.itemDefinitions = this.storage.retrieve('manifestItems');

    this.players$ = store.select(fromRoot.getLeaderboardPlayers)
      .distinctUntilChanged();

    this.playerWeapons$ = store.select(fromRoot.getLeaderboardPlayerWeapons)
      .distinctUntilChanged();

    this.searchedPlayer$ = store.select(fromRoot.getLeaderboardSearchedPlayer)
      .distinctUntilChanged();

    this.currentPage$ = store.select(fromRoot.getLeaderboardsCurrentPage);

    this.weaponList$ = store.select(fromRoot.getLeaderboardWeaponIds)
      .filter(ids => !!ids)
      .map(ids => ids.map(id => {
        let definition = this.itemDefinitions[parseInt(id)];
        if (definition) {
          return {
            id: id,
            name: definition.n
          }
        }
    }));
  }

  ngOnInit() {
    this.leaderboardType = 'weapon-types';
    this.selectedType = "Auto Rifle";
    this.selectedTier = 0;
    this.currentMap$.subscribe(map => {
      this.currentWeek = parseInt(map.week);
      this.getType();
    });
  }

  onPageChange(number: number) {
    this.store.dispatch(new leaderboardActions.ChangePageAction(number));
  }

  setLeaderboard() {
    if (this.leaderboardType === 'players') {
      this.store.dispatch(new leaderboardActions.GetWeaponIdsAction(this.currentWeek));
    }
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      this.store.dispatch(new leaderboardActions.GetPlayersAction({ weaponId: weapon.id, week: this.currentWeek}));
    }
  }

  getType() {
    this.store.dispatch(new leaderboardActions.GetWeaponTypeAction({type: this.selectedType, week: this.currentWeek}));
    this.selectedTier = 0;
  }

  filterTier() {
    this.store.dispatch(new leaderboardActions.FilterByTierAction(this.selectedTier));
    this.selectedTier = 0;
  }

}
