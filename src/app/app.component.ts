import { AfterContentInit, Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MOBILE } from './services/constants';

@Component({
  selector: 'trials-report',
  // host: {
  //   'class': 'wrapper'
  // },
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper" [ngClass]="{'focus-on-players': !showMenu}">
      <div class="controls-wrapper shadow-z-2">
        <div class="controls" control></div>
      </div>
      <div class="content">
        <router-outlet (activate)="activateEvent($event)" (deactivate)="deactivateEvent($event)"></router-outlet>
      </div>
      <div class="overlay" (click)="toggleMenu()"></div>
      <button class="control-btn btn btn-fab btn-raised btn-material-grey"
              (click)="toggleMenu()">
        <i class="material-icons">&#xE5CE;</i>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  showMenu:boolean = false;
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
