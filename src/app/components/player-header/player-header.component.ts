import { Component, Input, ChangeDetectionStrategy, trigger, state, animate, transition, style } from '@angular/core';
import { Player } from "../../models/player.model";
import { Item } from "../../models/inventory.model";

@Component({
  selector: 'player-header',
  animations: [
    trigger('loaded', [
      state('true' , style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      state('false', style({ opacity: 0, transform: 'translate3d(0, .5rem, 0)' })),
      transition('* => *', animate('.2s linear'))
    ])
  ],
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerHeaderComponent {
  @Input() playerObs: Player;
  @Input() subclass: Item;

  constructor() { }
}
