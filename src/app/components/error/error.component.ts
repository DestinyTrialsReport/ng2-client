import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit, OnDestroy {
  message: String;
  description: String;
  paramSubscription$: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramSubscription$ = this.route.data.subscribe(data => {
      this.message = data['message'];
      this.description = data['description'];
    });
  }

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }
}
