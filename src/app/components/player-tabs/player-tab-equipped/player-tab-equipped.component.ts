import { Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger } from '@angular/core';
import { Item }           from "../../../models/inventory.model";
import { ARMOR_BUCKETS }  from "../../../services/constants";
import { ClassStat }      from "../../../models/player.model";

@Component({
  selector: 'player-tab-equipped',
  templateUrl: './player-tab-equipped.component.html',
  styleUrls: ['./player-tab-equipped.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerTabEquippedComponent {
  armorBuckets: number[] = ARMOR_BUCKETS;
  @Input() loaded: boolean;
  @Input() stats: ClassStat[];
  @Input() inventory: Item[];
}
