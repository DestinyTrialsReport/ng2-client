import {Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store }                          from "@ngrx/store";
import { TypeaheadMatch }                 from "ng2-bootstrap";
import { WEAPON_TIERS, WEAPON_TYPES }     from "../../../services/constants";
import { Router }                         from "@angular/router";

import * as fromRoot                      from '../../../reducers';
import * as leaderboardActions            from "../../../actions/leaderboard.actions";

@Component({
  selector: 'leaderboard-header',
  styleUrls: ['../leaderboards.component.css'],
  templateUrl: './leaderboard-header.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardHeaderComponent {

  @Input() currentMap: any;
  @Input() updatedAt: string;
  @Input() currentWeek: number;
  @Input() selectedType: any;
  @Input() selectedTier: number;
  @Input() selectedPlatform: number;
  @Input() typeSelection: Array<{ id: any; statId?: string; text: string; }>;
  @Input() weaponList: Array<{ id: any; statId?: string; text: string; }>;
  @Input() leaderboardType: string;
  @Input() leaderboardTypes: Array<any>;

  weaponTiers: any = WEAPON_TIERS;
  selectedWeapon: any;
  platforms: Array<{value: number, text: string}> = [
    {value: 0, text: 'Both'},
    {value: 1, text: 'XBL'},
    {value: 2, text: 'PSN'},
  ];

  constructor(private store: Store<fromRoot.State>,
              private router: Router) { }

  setLeaderboard(type: string) {
    this.router.navigate(['/'], {queryParams: {board: type}});
  }

  filterByType(type: string) {
    if (!type) {
      type = this.selectedType;
    }

    let queryParams = {board: this.leaderboardType},
      options;

    if (WEAPON_TYPES.indexOf(type) > -1 || type == 'All') {
      options = {weaponType: type};
    } else if (this.leaderboardType === 'medals') {
      options = {medal: type};
    }

    let payload = Object.assign({}, queryParams, options);
    this.router.navigate(['/'], {queryParams: payload});
  }

  filterByTier(tier: number) {
    if (!tier) {tier = this.selectedTier}

    this.store.dispatch(new leaderboardActions.UpdateFilterAction({
      tier: tier,
      type: this.selectedType
    }))
  }

  filterByPlatform(platform: number) {
    if (!platform) {platform = this.selectedPlatform}

    this.store.dispatch(new leaderboardActions.UpdateFilterAction({
      type: this.selectedType,
      platform: platform,
    }))
  }

  getPlayerForWeapon(event: TypeaheadMatch) {
    let weapon = event.item;
    if (weapon) {
      let queryParams = {board: 'players', weaponHash: weapon.id};
      this.router.navigate(['/'], {queryParams: queryParams});
    }
  }
}
