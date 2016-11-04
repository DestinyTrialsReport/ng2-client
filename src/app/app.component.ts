import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper" [ngClass]="{'focus-on-players': showMenu}">
      <div class="controls-wrapper shadow-z-2">
        <div class="controls" control></div>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <div class="overlay" (click)="toggleMenu()"></div>
      <button class="control-btn btn btn-fab btn-raised btn-material-grey"
              (click)="toggleMenu()">
        <i class="material-icons">&#xE5CE;</i>
      </button>
    </div>
  `
})
export class AppComponent {
  showMenu:boolean = false;
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';

  constructor(
    public router: Router
  ) { }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
