import {Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MOBILE } from './services/constants';
import { Store } from "@ngrx/store";
import * as fromRoot      from './reducers';
import * as auth from './actions/auth.actions';
import {AuthService} from "./services/auth.service";

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
      <!--<a target="_blank" (click)="getAuthorization()">Auth With Bungo</a>-->
      <!--<a target="_blank" (click)="getAccount()">Get Account</a>-->
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

export class AppComponent implements OnInit {
  showMenu: boolean = true;
  showAd: boolean = true;
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';

  constructor(private route: ActivatedRoute,
              private store: Store<fromRoot.State>,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params && params['code']) {
          this.store.dispatch(new auth.ValidateToken({code: params['code'], state: params['state']}));
        }
      });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getAuthorization() {
    this.store.dispatch(new auth.RedirectToAuth(new Date().valueOf().toString()));
  }

  getAccount() {
    this.authService.getBnetUser().subscribe(res => console.log(res))
  }

}
