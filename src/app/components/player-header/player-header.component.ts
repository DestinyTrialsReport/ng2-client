import { Component, Input, ChangeDetectionStrategy, trigger, state, animate, transition, style } from '@angular/core';
import { Player } from "../../models/player.model";
import { Item } from "../../models/inventory.model";

@Component({
  selector: 'player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerHeaderComponent {
  @Input() playerObs: Player;
  @Input() subclass: Item;

  constructor() { }
}
