import { AfterContentInit, Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MOBILE } from './services/constants';

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
        <router-outlet (activate)="activateEvent($event)" (deactivate)="deactivateEvent($event)"></router-outlet>
      </main>
      <button class="body__control btn btn-fab" (click)="toggleMenu()">
        <i class="material-icons">&#xE5CE;</i>
      </button>
      <div class="body__mask" (click)="toggleMenu()"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  showMenu:boolean = true;
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';

  constructor(public route: ActivatedRoute,
              public router: Router) {
  }

  ngAfterContentInit() {
    // if (HMR) {
    //   this.sidenav.open();
    // } else if (!MOBILE) {
    //   setTimeout(() => {
    //     this.sidenav.open();
    //   });
    // }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
