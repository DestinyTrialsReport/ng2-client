import {Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import {Item} from "../models/inventory.model";
import {ARMOR_BUCKETS} from "../services/constants";

@Component({
  selector: '[equipped-gear]',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
    <div class="row" [@visibilityChanged]="loaded">
      <div class="weapon col-xs-12" *ngFor="let item of items">
        <div [ngClass]="{
              armor__img: armorBuckets.indexOf(item.bucketHash) > -1,
              weapon__img: armorBuckets.indexOf(item.bucketHash) < 0 }">
          <span class="weapon__damage" [innerHtml]="item?.damage"></span>
          <img class="img-responsive" [src]="'https://www.bungie.net/common/destiny_content/icons/' + item?.i" [alt]="item?.n">
        </div>
        <div class="weapon__info">
          <div class="weapon__title">
            <span [innerHtml]="item?.n"></span>
          </div>
          
          <div class="weapon__perks">
            <div class="weapon-perk" *ngFor="let node of item?.steps">
             <template #nodePopover let-model="node">
                <div class="popover-title">
                  <span [innerHtml]="node?.n"></span>
                </div>
                <div class="popover-content">
                  <span [innerHtml]="node?.d"></span>
                </div>
              </template>
              <i class="weapon-perk__icon" [tooltipHtml]="nodePopover" [tooltipContext]="node" [tooltipClass]="'popover'">
                <img class="img-responsive" [src]="'https://www.bungie.net/common/destiny_content/icons/' + node?.i" [alt]="node?.n">
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquippedGearComponent {
  armorBuckets: number[] = ARMOR_BUCKETS;
  @Input() loaded: boolean;
  @Input() items: Item[];
}
