import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapsService } from "../services/maps.service";

@Component({
  selector: 'guardian-weapons',
  template: `
    <div class="row">
      <div class="col-xs-12 col-sm-2">
        <h3 class="stat-header">
          Top weapons from Guardian.gg
        </h3>
        <!--<a [href]="weaponStatsUrl" target="_blank" [tooltip]="tooltipText">-->
        <a>
          <i class="material-icons icon--small info">&#xE148;</i>
        </a>
      </div>
      <div class="col-xs-12 col-sm-10" *ngIf="!weapons || (!weapons.primary && !weapons.special)">
        <div class="first-in-lighthouse__undecided">
          Guardian.gg does not have any weapon stats to show (yet!).
        </div>
      </div>
      <template [ngIf]="weapons">
        <div class="col-xs-12 col-sm-5" *ngFor='let type of [weapons.primary, weapons.special]'>
          <template ngFor let-weapon [ngForOf]="type" let-i="index">
            <div class="row top-weapon" *ngIf="i < 3">
              <div class="col-xs-6 col-sm-7 last-weapon-weapon__descr">
                <img class="last-match-weapon__img img-responsive" [src]="'https://www.bungie.net' + weapon.icon"
                     [alt]="weapon.name">
                <span class="last-match-weapon__title" [innerHtml]="weapon.name"></span>
              </div>
              <div class="col-xs-6 col-sm-5 stat">
                <span [innerHtml]="weapon.kills | number:'2.0-2'"></span>%
              </div>
            </div>
          </template>
          <hr class="hr--minor visible-xs" *ngIf="i === 0">
        </div>
      </template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WeaponGuardianComponent {
  currentMap: Observable<any>;
  weapons:any;
  tooltipText:string = "Kindly provided by Guardian.gg. Click here to head " +
    "over there for the complete list and a lot more cool stats!";
  weaponStatsUrl:string = "https://guardian.gg/en/weapon-stats?platform=" + 2 +
  "&mode=14&start=" + '2016-09-02' + "&end=" + '2016-09-05';

  constructor(public mapService: MapsService) {
    // this.mapService.getGuardianWeapons(2, '2016-09-02', '2016-09-05')
    //   .subscribe((res:GuardianWeapons) => {
    //     this.weapons = res;
    //   });
    // this.store.select(state => state.map.mapInfo)
    //   .distinctUntilChanged()
    //   .subscribe((res:any) => {
    //     this.currentMap = res;
    //     this.topWeapons();
    //   });
  }

  // topWeapons() {
  //   this.mapService.getGuardianWeapons(2, '2016-09-02', '2016-09-05')
  //     .subscribe((res:GuardianWeapons) => {
  //       this.weapons = res;
  //   });
  // }
}
