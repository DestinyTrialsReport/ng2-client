import { Component, Input, OnInit } from '@angular/core';
import { Item }           from "../../../models/inventory.model";
import {
  ItemDefinition, ItemDefinitions, StepsDefinitions, TalentDefinitions, Step
} from "../../../models/manifest.model";
import {
  ARTIFACT_BUCKET, HIDDEN_NODES, ARMOR_BUCKETS
} from "../../../services/constants";

@Component({
  selector: 'equipped-item',
  host: {
    'class': 'row row--small-gutter middle-xs inventory-item inventory-item--weapon'
  },
  template: `
    <div class="col-xs-shrink">
      <div class="inventory-item__image">
        <img [src]="'https://www.bungie.net/common/destiny_content/icons/' + definedItem?.i" [alt]="definedItem?.n">
        <span class="inventory-item__light" [innerHtml]="equippedItem?.primaryStat"></span>
      </div>
    </div>
    <div class="col-xs">
      <div class="inventory-item__title">
        <span [innerHtml]="definedItem?.n"></span>
      </div>
      <div class="inventory-item__badges" *ngIf="hazard">
        <span class="badge" [ngClass]="{'badge--artifact': hazard !== 'Harmless artifact', 'badge--blank':  hazard === 'Harmless artifact'}" [innerHtml]="hazard"></span>
      </div>
      <div class="inventory-item__perks" *ngIf="!(isArmor && definedItem?.tT !== 6)">
        <template ngFor let-node [ngForOf]="definedNodes" let-i="index">
          <i *ngIf="node"
            [ngStyle]="{'background-image': 'url(https://www.bungie.net/common/destiny_content/icons/' + node?.i + ')'}"
            [popover]="node?.d"
            [popoverTitle]="node?.n"
            class="perk-icon"></i>
        </template>
      </div>
      <div class="inventory-item__badges" *ngIf="isArmor && definedItem?.tT !== 6 && equippedItem?.bucketHash !== 434908299">
        <span class="badge badge--blank">No Exotic armor equipped</span>
      </div>
    </div>
  `,
  styleUrls: ['./player-tab-equipped.component.css']
})


export class EquippedItemComponent implements OnInit {
  @Input() armor: ItemDefinitions;
  @Input() weapons: ItemDefinitions;
  @Input() steps: StepsDefinitions;
  @Input() talents: TalentDefinitions;
  @Input() equippedItem: Item;
  isArmor: boolean;
  hazard: string;
  definedItem: ItemDefinition;
  definedNodes: any[];

  ngOnInit() {
    if (this.equippedItem) {

      this.isArmor = ARMOR_BUCKETS.indexOf(this.equippedItem.bucketHash) > -1;

      if (this.isArmor && this.armor) {
        this.definedItem = this.armor[this.equippedItem.itemHash];
        if (this.talents && this.definedItem.tT !== 6 && this.equippedItem.bucketHash != ARTIFACT_BUCKET) {
          this.definedNodes = this.itemNodes(this.equippedItem)
        }
        this.hazard = this.artifactHazard(this.equippedItem);

      } else if (this.weapons) {

        this.definedItem = this.weapons[this.equippedItem.itemHash];
        this.definedNodes = this.itemNodes(this.equippedItem)

      }

    }
  }

  artifactHazard(item: Item): string {
    switch (item.itemHash) {
      case 2672107536:
        return 'Sword deflects rockets';
      case 2672107537:
        return 'Highlights low health/full super';
      case 2672107538:
        return 'Faster super recharge';
      case 2672107540:
        return 'No super, increased everything else';
      case 2672107541:
        return 'Resists damage over time';
      case 2672107542:
        return 'No sprint cooldown';
      case 2672107551:
        return 'Detailed radar';
      default:
        if (item.bucketHash == ARTIFACT_BUCKET) {
          return 'Harmless artifact';
        } else {
          return null;
        }
    }
  }

  itemNodes(item: Item) {
    if (!item) return;

    const talent = this.talents[item.talentGridHash];

    const itemNodes = item.nodes.map(node => {
      const nodeDef = talent[node.nodeHash];
      const nodeHash = nodeDef.s[node.stepIndex];
      return {
        h: nodeHash,
        c: nodeDef.c,
        r: nodeDef.r,
      }
    }).filter(step => step.c > -1 && HIDDEN_NODES.indexOf(step.h) < 0);

    return itemNodes.map(node => {
      let step: Step = this.steps[node.h];
      return {
        c: node.c,
        r: node.r,
        n: step.n,
        d: step.d,
        i: step.i
      }
    });
  }
}
