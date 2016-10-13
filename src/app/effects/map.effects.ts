/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { MapsService } from '../services/maps.service';
import * as maps from '../actions/maps.actions';

@Injectable()

export class MapEffects {
  constructor(
    private actions$: Actions,
    private mapService: MapsService
  ) { }

  @Effect() search$ = this.actions$
    .ofType(maps.ActionTypes.SEARCH_MAP)
    .debounceTime(300)
    .map<number>(action => action.payload)
    .switchMap(query => {
      if (!query) {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(maps.ActionTypes.SEARCH_MAP).skip(1);

      return this.mapService.onWeek(query)
        .takeUntil(nextSearch$)
        .map(searched => new maps.SearchCompleteAction(searched))
        .catch((err) => of(new maps.SearchCompleteAction(err)));
    });

}
