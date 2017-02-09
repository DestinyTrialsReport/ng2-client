import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import {AuthService} from "../../services/auth.service";

import * as fromRoot      from '../../reducers';
import * as auth from '../../actions/auth.actions';

@Component({
  styleUrls: ['./home.component.css'],
  templateUrl: 'home.template.html'
})

export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private store: Store<fromRoot.State>,
              private authService: AuthService) {

  }

  ngOnInit() {
    // this.route.queryParams
    //   .subscribe(params => {
    //     if (params && params['code']) {
    //       this.store.dispatch(new auth.ValidateToken({code: params['code'], state: params['state']}));
    //     }
    //   });
  }

  getAuthorization() {
    this.store.dispatch(new auth.RedirectToAuth(new Date().valueOf().toString()));
  }

  getAccount() {
    this.authService.getBnetUser().subscribe(res => console.log(res))
  }

}
