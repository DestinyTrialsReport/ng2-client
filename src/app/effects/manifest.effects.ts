import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class ManifestEffects {
  constructor(private actions$: Actions, private db: Database) { }

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('bungie_manifest');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  // @Effect()
  // loadManifest$: Observable<Action> = this.actions$
  //   .ofType(manifest.ActionTypes.LOAD)
  //   // .startWith(new manifest.LoadAction())
  //   .map((action: manifest.LoadSuccessAction) => action.payload)
  //   .mergeMap(payload =>
  //     this.db.query('items')
  //       .toArray()
  //       .map((items: ItemDefinition[]) => {
  //         const item_ids: number[] = payload[0].map(inv => inv.items[0].itemHash);
  //         const defined: ItemDefinition[] = items.filter(def => item_ids.indexOf(def.h) > -1);
  //
  //         return new manifest.LoadSuccessAction([defined, payload[0],payload[1]])
  //       })
  //       .catch(error => of(new manifest.LoadFailAction(error)))
  //   );


  // @Effect()
  // addItemDefinitionToManifest$: Observable<Action> = this.actions$
  //   .ofType(manifest.ActionTypes.ADD_ITEM_DEFINITION)
  //   .map((action: manifest.AddItemDefinitionAction) => action.payload)
  //   .mergeMap(item =>
  //     this.db.insert('steps', [ item ])
  //       .map(() => new manifest.AddItemDefinitionSuccessAction(item))
  //       .catch(() => of(new manifest.AddItemDefinitionFailAction(item)))
  //   );
  //
  //
  // @Effect()
  // removeItemDefinitionFromManifest$: Observable<Action> = this.actions$
  //   .ofType(manifest.ActionTypes.REMOVE_ITEM_DEFINITION)
  //   .map((action: manifest.RemoveItemDefinitionAction) => action.payload)
  //   .mergeMap(item =>
  //     this.db.executeWrite('steps', 'delete', [ item.h ])
  //       .map(() => new manifest.RemoveItemDefinitionSuccessAction(item))
  //       .catch(() => of(new manifest.RemoveItemDefinitionFailAction(item)))
  //   );
}
