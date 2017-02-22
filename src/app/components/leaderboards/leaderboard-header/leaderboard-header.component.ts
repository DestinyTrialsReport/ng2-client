import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { Store }                          from "@ngrx/store";
import { TypeaheadMatch }                 from "ng2-bootstrap";
import { WEAPON_TIERS, WEAPON_TYPES }     from "../../../services/constants";
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

  @Input() map: any;
  @Input() updatedAt: string;
  @Input() selectedWeek: number;
  @Input() selected: SelectedLeaderboardItems;
  @Input() typeSelection: Array<LeaderboardSelectList>;
  @Input() weaponList: Array<LeaderboardSelectList>;

  hasSearchBar: boolean = false;

  weaponTiers: any = WEAPON_TIERS;
  selectedWeapon: any;
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
  }

  filterByType(board: string, type: string) {
    let isWeaponType = WEAPON_TYPES.indexOf(type) > -1 || type == 'All';
    let isNumber = parseInt(type) > 0;

    if (isWeaponType && board == 'medals') {
      type = '1';
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
      type: this.selected.type
    }))
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      this.router.navigate(['/players', weapon.id], {queryParams: {}});
    }
  }

}
