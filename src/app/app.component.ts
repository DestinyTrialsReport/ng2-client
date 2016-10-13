import {AfterContentInit, Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  host: {
    'class': 'wrapper'
  },
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls-wrapper shadow-z-2">
      <div class="controls" control></div>
    </div>
    <div class="content">
      <router-outlet (activate)="activateEvent($event)" (deactivate)="deactivateEvent($event)"></router-outlet>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {

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
