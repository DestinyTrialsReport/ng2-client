import { Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger } from '@angular/core';
import { SummarizedStats, SummarizedWeapons } from "../../../models/stats.model";

@Component({
  selector: 'player-tab-this-week',
  templateUrl: './player-tab-this-week.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerTabThisWeekComponent {
  @Input() stats: SummarizedStats;
  defaultWeapons: SummarizedWeapons[];

  constructor() {
    this.defaultWeapons = [
      {
        itemTypeName: "Fusion Rifle",
        sum_kills: 0,
        sum_headshots: 0,
        file_name: "fusion-rifle.svg"
      },
      {
        itemTypeName: "Machine Gun",
        sum_kills: 0,
        sum_headshots: 0,
        file_name: "machine-gun.svg"
      },
      {
        itemTypeName: "Sword",
        sum_kills: 0,
        sum_headshots: 0,
        file_name: "sword.svg"
      }
    ];
  }

  getKillDeathRatio(stats: SummarizedStats) {
    if (stats && stats.deaths > 0) {
      return stats.kills / stats.deaths;
    } else {
      return 0;
    }
  }

  getWinLoss(stats: SummarizedStats) {
    if (stats) {
      let wins = stats.matches - stats.losses;
      return `${wins} <span class="stat-number__seperator">/</span> ${stats.losses}`;
    }
  }
}
