import {Component, Input, ChangeDetectionStrategy, style, state, animate, transition, trigger} from '@angular/core';
import {Item} from "../../models/inventory.model";
import {ARMOR_BUCKETS} from "../../services/constants";
import {ClassStat} from "../../models/player.model";

@Component({
  selector: '[equipped-tab]',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
    <div class="player-tab__section" style="min-height: 287px;"
      [ngClass]="{'loading-spinner': !loaded}"
      [items]="inventory | filterWeapons"
      [loaded]="loaded" equipped-gear>
    </div>
    
    <div class="player-tab__section" style="min-height: 108px;"
      [ngClass]="{'loading-spinner': !loaded}"
      [items]="inventory | filterArmor"
      [loaded]="loaded" equipped-gear>
    </div>
    
    <div [stats]="stats | filterClassStats" class-stats>
    </div>
    
    <div [stats]="stats | filterClassArmor" class-stats>
    </div>
    
    <div class="player-tab__section" [inventory]="inventory | filterSubclass" subclass-stats>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquippedTabComponent {
  armorBuckets: number[] = ARMOR_BUCKETS;
  @Input() loaded: boolean;
  @Input() stats: ClassStat[];
  @Input() inventory: Item[];
}
