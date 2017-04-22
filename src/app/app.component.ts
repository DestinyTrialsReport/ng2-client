import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MOBILE } from './services/constants';
import {ManifestService} from "./services/manifest.service";

@Component({
  selector: 'trials-report',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="body" [ngClass]="{'body--focus-on-players': !showMenu}">
      <div class="body__menu">
        <menu></menu>
      </div>
      <main class="body__content">
        <router-outlet></router-outlet>
      </main>
      <button class="body__control btn btn--icon btn--fab" (click)="toggleMenu()">
        <i class="material-icons">&#xE5CE;</i>
      </button>
      <div class="body__mask" (click)="toggleMenu()"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  showMenu: boolean = false;
  showAd: boolean = true;
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';

  constructor(private route: ActivatedRoute,
              public manifestService: ManifestService) {

  }

  ngOnInit() {
    this.manifestService.init();
    this.route.queryParams
      .subscribe(params => {
        if (params && params['gamertag']) {
          this.showMenu = false;
        }
      });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
