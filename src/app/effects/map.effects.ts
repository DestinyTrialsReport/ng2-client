/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { MapsService } from '../services/maps.service';
import { CurrentMap } from "../models/map-stats.model";
import * as maps from '../actions/maps.actions';

@Injectable()

export class MapEffects {

  constructor(private actions$: Actions,
              private mapService: MapsService) { }

  @Effect()
  search$ = this.actions$
    .ofType(maps.ActionTypes.SAVE_CURRENT_MAP)
    .map<CurrentMap>(action => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return empty();
      }

      return of(new maps.SearchCompleteAction(parseInt(payload.week)));
    });

  @Effect()
  weapons$ = this.actions$
    .ofType(maps.ActionTypes.SEARCH_COMPLETE)
    .map<number>(action => action.payload)
    .switchMap(payload => {
      if (!payload) {
        return empty();
      }

      return this.mapService.onWeek(payload)
        .map(searched => new maps.LoadMapDataAction(searched))
        .catch((err) => of(new maps.SearchFailedAction(err)));
    });

}
