/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { of } from 'rxjs/observable/of';
import { MapsService } from '../services/maps.service';
import { Observable } from 'rxjs/Observable';
import * as maps from '../actions/maps.actions';

@Injectable()

export class MapEffects {

  constructor(private actions$: Actions,
              private mapService: MapsService) { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(maps.ActionTypes.SAVE_CURRENT_MAP)
    .map((action: maps.SaveCurrentMapAction) => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return Observable.from([]);
      }

      return of(new maps.SearchCompleteAction(parseInt(payload.week)));
    });

  @Effect()
  weapons$: Observable<Action> = this.actions$
    .ofType(maps.ActionTypes.SEARCH_COMPLETE)
    .map<number>(action => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return Observable.from([]);
      }

      return this.mapService.onWeek(payload)
        .map(searched => new maps.LoadMapDataAction(searched))
        .catch((err) => of(new maps.SearchFailedAction(err)));
    });

}
