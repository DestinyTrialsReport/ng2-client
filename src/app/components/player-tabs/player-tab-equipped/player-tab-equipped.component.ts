import { Component, Input } from '@angular/core';
import { Item }           from "../../../models/inventory.model";
import { ARMOR_BUCKETS }  from "../../../services/constants";
import { ClassStat }      from "../../../models/player.model";
import { TalentDefinitions, StepsDefinitions, ItemDefinitions } from "../../../models/manifest.model";

@Component({
  selector: 'player-tab-equipped',
  templateUrl: './player-tab-equipped.component.html',
  styleUrls: ['./player-tab-equipped.component.css']
})

export class PlayerTabEquippedComponent {
  armorBuckets: number[] = ARMOR_BUCKETS;
  @Input() armorDefinitions: ItemDefinitions;
  @Input() weaponDefinitions: ItemDefinitions;
  @Input() steps: StepsDefinitions;
  @Input() talents: TalentDefinitions;
  @Input() loaded: boolean;
  @Input() weapons: Item[];
  @Input() armor: Item[];
  @Input() artifact: Item[];
  @Input() subclass: Item[];
  @Input() classStats: ClassStat[];
}
