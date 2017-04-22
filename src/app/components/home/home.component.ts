import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";

import * as fromRoot      from '../../reducers';
import * as auth from '../../actions/auth.actions';
import {Subscription} from "rxjs";

@Component({
  styleUrls: ['./home.component.css'],
  templateUrl: 'home.template.html'
})

export class HomeComponent implements OnInit, OnDestroy {

  paramSubscription$: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.paramSubscription$ = this.route.queryParams
      .subscribe(params => {
        if (params && params['code']) {
          this.store.dispatch(new auth.ValidateToken({code: params['code'], state: params['state']}));
        }
      });
  }

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }

  getAuthorization() {
    this.store.dispatch(new auth.RedirectToAuth(new Date().valueOf().toString()));
  }

}
