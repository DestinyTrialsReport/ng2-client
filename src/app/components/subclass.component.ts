import {Component, Input} from '@angular/core';
import {Item} from "../models/inventory.model";

@Component({
  selector: '[subclass-stats]',
  template: `
    <div class="row">
      <template ngFor let-node [ngForOf]="subclass?.steps">
        <div class="player-perk col-xs-6" 
          *ngIf="([5, 7].indexOf(node.c) < 0) && !([2, 3, 4].indexOf(node.c) > -1 && node.r == 0)"
          [tooltipHtml]="subclassPopover" [tooltipContext]="node" [tooltipClass]="'popover'">
          
          <img class="player-perk__icon img-responsive" [src]="'https://www.bungie.net/common/destiny_content/icons/' + node?.i" [alt]="node?.n">
          <span class="player-perk__title" [innerHtml]="node?.n"></span>
          <template #subclassPopover let-model="node">
            <div class="popover-content">
              <span [innerHtml]="node?.d"></span>
            </div>
          </template>
        </div>
      </template>
    </div>
  `
})
export class SubclassComponent {
  @Input() subclass: Item;

  constructor() {
  }
}
