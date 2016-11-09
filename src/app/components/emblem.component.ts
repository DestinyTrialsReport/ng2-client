import { Component, Input, ChangeDetectionStrategy, trigger, state, animate, transition, style } from '@angular/core';
import { Player } from "../models/player.model";
import { Item } from "../models/inventory.model";

@Component({
  selector: '[emblem]',
  host: {
    'class': 'player-overview'
  },
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ],
  template: `
    <div class="player-header"
    [ngStyle]="{'background-image': 'url(https://www.bungie.net' + playerObs?.backgroundPath + ')'}">
      <div class="player-header__title" [@visibilityChanged]="playerObs ? 'shown' : 'hidden'">
        <img class="player-header__emblem" alt="Emblem" [src]="'https://www.bungie.net' + playerObs?.emblemPath">
        <div class="player-header__char">
          <div class="player-info">
            <h2 class="player-header__gamertag" [innerText]="playerObs?.displayName"></h2>
            <span class="player-info__class" [innerText]="subclass?.n"></span>
            <!--<div ng-repeat="hazard in player.nonHazard track by $index" ng-bind="hazard" class="player-hazard">-->
            <!--</div>-->
            <!--<div ng-repeat="hazard in player.nonHazardCharity track by $index" ng-bind="hazard.status" class="player-hazard player-hazard&#45;&#45;charity1"-->
                 <!--data-template-url="shared/popovers/charity1.popover.html" data-placement="bottom" bs-popover>-->
            <!--</div>-->
          </div>
          <div class="player-level">
            <div class="player-level__light highlight">
              <span>&#10022;</span><span [innerText]="playerObs?.characterBase?.powerLevel"></span>
            </div>
            <span class="player-level__grimoire">
              <img src="/assets/img/grimoire.png" alt="Grimoire">
              <span [innerText]="playerObs?.characterBase?.grimoireScore"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Emblem {
  @Input() playerObs: Player;
  @Input() subclass: Item;

  constructor() { }
}
