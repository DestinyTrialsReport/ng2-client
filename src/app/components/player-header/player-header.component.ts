import { Component, Input } from '@angular/core';
import { PlayerHeader } from "../../models/player.model";

@Component({
  selector: 'player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css']
})

export class PlayerHeaderComponent {
  @Input() header: PlayerHeader;

  constructor() { }
}
