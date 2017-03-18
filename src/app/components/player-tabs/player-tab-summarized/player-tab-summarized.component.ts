import { Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger } from '@angular/core';
import { SummarizedStats, SummarizedWeapons } from "../../../models/stats.model";

@Component({
  selector: 'player-tab-summarized',
  templateUrl: './player-tab-summarized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerTabSummarized {
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
}
