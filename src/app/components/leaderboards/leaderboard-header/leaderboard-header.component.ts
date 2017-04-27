import { Component, Input, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { Store }                          from "@ngrx/store";
import { TypeaheadMatch }                 from "ng2-bootstrap";
import {WEAPON_TIERS, WEAPON_TYPES, CRUCIBLE_MAPS}     from "../../../services/constants";
import { Router }                         from "@angular/router";
import {SelectedLeaderboardItems, LeaderboardSelectList}       from "../../../models/leaderboard.model";

import * as fromRoot                      from '../../../reducers';
import * as leaderboardActions            from "../../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-header',
  styleUrls: ['../leaderboards.component.css'],
  templateUrl: './leaderboard-header.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardHeaderComponent implements OnInit {

  @Output() changeWeek:EventEmitter<number> = new EventEmitter<number>();

  @Input() map: any;
  @Input() updatedAt: string;
  @Input() selectedWeek: number;
  @Input() selectedYear: number;
  @Input() maxWeek: number;
  @Input() selected: SelectedLeaderboardItems;
  @Input() typeSelection: Array<LeaderboardSelectList>;
  @Input() weaponList: Array<LeaderboardSelectList>;

  hasSearchBar: boolean = false;

  weaponTiers: any = WEAPON_TIERS;
  selectedWeapon: any;
  YearThreeWeeks: Array<{value: number, text: string}>;
  YearTwoWeeks: Array<{value: number, text: string}>;
  YearOneWeeks: Array<{value: number, text: string}>;

  leaderboardYears: Array<{value: number, text: string}> = [
    {value: 3, text: '3'},
    {value: 2, text: '2'},
    {value: 1, text: '1'}
  ];

  leaderboardTypes: Array<{value: string, text: string}> = [
    {value: 'weapons', text: 'Weapons'},
    {value: 'players', text: 'Players'},
    {value: 'medals', text: 'Medals'},
  ];

  platforms: Array<{value: number, text: string}> = [
    {value: 0, text: 'Both'},
    {value: 1, text: 'XBL'},
    {value: 2, text: 'PSN'},
  ];

  constructor(private store: Store<fromRoot.State>,
              private router: Router) { }

  ngOnInit() {
    this.hasSearchBar = this.selected.leaderboard == ('players' || 'searched');
    let yearThree = [], yearTwo = [], yearOne = [];
    for(let i = 1; i <= this.maxWeek; i++){
      if (i > 44) {
        yearThree.push({value: i, text: `${(i - 44)}`});
      } else {
        yearTwo.push({value: i, text: `${i}`});
        if (i < 17) {
          yearOne.push({value: i + 100, text: `${i}`});
        }
      }
    }
    yearThree.push({value: 300, text: 'All'});
    yearTwo.push({value: 200, text: 'All'});
    yearOne.push({value: 100, text: 'All'});
    this.YearThreeWeeks = yearThree.reverse();
    this.YearTwoWeeks = yearTwo.reverse();
    this.YearOneWeeks = yearOne.reverse();
  }

  toWeek(week: number, year: number) {
    if (year !== this.selectedYear) {
      if (year == 1) {
        this.selectedWeek = this.YearOneWeeks[1].value;
      } else if (year == 2) {
        this.selectedWeek = this.YearTwoWeeks[1].value;
      } else {
        this.selectedWeek = this.YearThreeWeeks[1].value;
      }
      week = this.selectedWeek;
    }
    this.changeWeek.emit(week);
  }

  filterByType(board: string, type: any) {
    let isWeaponType = WEAPON_TYPES.indexOf(type) > -1 || type == 'All';
    let isNumber = parseInt(type) >= 0;

    if ((isWeaponType || parseInt(type) > 100) && board == 'medals') {
      type = '0';
    } else if (isNumber && board != 'medals') {
      type = 'All';
    } else {
      if (!isWeaponType && !isNumber) {
        type = null;
      }
    }

    this.router.navigate([`/${board}`, (type || 'All')], {queryParams: {}});
  }

  filterByTier(tier: number) {
    if (!tier) {tier = this.selected.tier}

    this.store.dispatch(new leaderboardActions.UpdateFilterAction({
      tier: tier,
      map: this.selected.map,
      type: this.selected.type
    }))
  }

  filterByMap(map: string) {
    if (!map) {map = this.selected.map}

    this.store.dispatch(new leaderboardActions.UpdateFilterAction({
      map: map,
      tier: this.selected.tier,
      type: this.selected.type
    }))
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      this.router.navigate(['/players', weapon.id], {queryParams: {}});
    }
  }

  getMapNameFromId(id: string) {
    if (!CRUCIBLE_MAPS[id]) { return ""; }
    return CRUCIBLE_MAPS[id].name;
  }

}
