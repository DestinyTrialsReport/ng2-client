/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { PlayerService } from '../services/player.service';

import * as player from '../actions/player.actions';
import * as pgcr from '../actions/pgcr.actions';
import {PGCR, Entry} from "../models/pgcr.model";

@Injectable()
export class PlayerEffects {

  constructor(private actions$: Actions,
              private playerService: PlayerService) {
  }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_PLAYER1_ACTION)
    .debounceTime(300)
    .map((action: player.SearchPlayer1Action) => action.payload)
    .mergeMap(query => {
      if (query.name === '') {
       return empty();
      }

      return this.playerService.search(query.platform, query.name)
        .map(searched => new player.SearchPlayer1CompleteAction(searched))
        .catch(() => of(new player.SearchPlayerFailed(new Error('searching player failed'))));
    });

  @Effect()
  search2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_PLAYER2_ACTION)
    .debounceTime(300)
    .map((action: player.SearchPlayer2Action) => action.payload)
    .mergeMap(query => {
      if (query.name === '') {
        return empty();
      }

      return this.playerService.search(query.platform, query.name)
        .map(searched => new player.SearchPlayer2Account({
          membershipType: searched.membershipType,
          membershipId: searched.membershipId,
          displayName: searched.displayName
        }))
        .catch(() => of(new player.SearchPlayerFailed(new Error('searching player failed'))));
    });

  @Effect()
  search3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEARCH_PLAYER3_ACTION)
    .debounceTime(300)
    .map((action: player.SearchPlayer3Action) => action.payload)
    .mergeMap(query => {
      if (query.name === '') {
        return empty();
      }

      return this.playerService.search(query.platform, query.name)
        .map(searched => new player.SearchPlayer3Account({
          membershipType: searched.membershipType,
          membershipId: searched.membershipId,
          displayName: searched.displayName
        }))
        .catch(() => of(new player.SearchPlayerFailed(new Error('searching player failed'))));
    });

  @Effect()
  account$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_PLAYER1)
    .map((action: player.SearchPlayer1Account) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
       return empty();
      }

      return this.playerService.account(payload.membershipType, payload.membershipId)
        .map(searched => new player.AccountPlayer1Success(searched))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect()
  account2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_PLAYER2)
    .map((action: player.SearchPlayer2Account) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
        return empty();
      }

      return this.playerService.account(payload.membershipType, payload.membershipId)
        .map(searched => new player.AccountPlayer2Success(searched))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect()
  account3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_PLAYER3)
    .map((action: player.SearchPlayer3Account) => action.payload)
    .mergeMap(payload => {
      if (!payload || !payload.membershipId) {
        return empty();
      }

      return this.playerService.account(payload.membershipType, payload.membershipId)
        .map(searched => new player.AccountPlayer3Success(searched))
        .catch((err) => of(new player.SearchFailed(err)));
    });

  @Effect()
  accountSuccess$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER1)
    .map((action: player.AccountPlayer1Success) => action.payload)
    .mergeMap(payload => {
      if (!payload) {
        return empty();
      }

      return of(new player.InventoryPlayer1Action({
        membershipType: payload.membershipType,
        membershipId: payload.membershipId,
        characterId: payload.characters[0].characterBase.characterId
      }));
    });

  @Effect()
  accountSuccess2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER2)
    .map((action: player.AccountPlayer2Success) => action.payload)
    .mergeMap(payload => {
      if (!payload) {
        return empty();
      }

      return of(new player.InventoryPlayer2Action({
        membershipType: payload.membershipType,
        membershipId: payload.membershipId,
        characterId: payload.characters[0].characterBase.characterId
      }));
    });

  @Effect()
  accountSuccess3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.ACCOUNT_SUCCESS_PLAYER3)
    .map((action: player.AccountPlayer3Success) => action.payload)
    .mergeMap(payload => {
      if (!payload) {
        return empty();
      }

      return of(new player.InventoryPlayer3Action({
        membershipType: payload.membershipType,
        membershipId: payload.membershipId,
        characterId: payload.characters[0].characterBase.characterId
      }));
    });

  @Effect()
  inventory$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INVENTORY_PLAYER1)
    .map((action: player.InventoryPlayer1Action) => action.payload)
    .mergeMap(payload =>
      this.playerService.inventory(payload.membershipType, payload.membershipId, payload.characterId)
        .map((res: any) => {
          return new player.InventoryPlayer1SuccessAction({
            inventory: res,
            membershipType: payload.membershipType,
            membershipId: payload.membershipId,
            characterId: payload.characterId,
          })
        })
        .catch((err) => of(new player.SearchFailed(err)))
    );

  @Effect()
  inventory2$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INVENTORY_PLAYER2)
    .map((action: player.InventoryPlayer2Action) => action.payload)
    .mergeMap(payload =>
      this.playerService.inventory(payload.membershipType, payload.membershipId, payload.characterId)
        .map((res: any) => {
          return new player.InventoryPlayer2SuccessAction({
            inventory: res,
            membershipType: payload.membershipType,
            membershipId: payload.membershipId,
            characterId: payload.characterId,
          })
        })
        .catch((err) => of(new player.SearchFailed(err)))
    );

  @Effect()
  inventory3$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INVENTORY_PLAYER3)
    .map((action: player.InventoryPlayer3Action) => action.payload)
    .mergeMap(payload =>
      this.playerService.inventory(payload.membershipType, payload.membershipId, payload.characterId)
        .map((res: any) => {
          return new player.InventoryPlayer3SuccessAction({
            inventory: res,
            membershipType: payload.membershipType,
            membershipId: payload.membershipId,
            characterId: payload.characterId,
          })
        })
        .catch((err) => of(new player.SearchFailed(err)))
    );
  //
  // @Effect()
  // myAccount$: Observable<Action> = this.actions$
  //   .ofType(myPlayer.ActionTypes.SEARCH_MY_COMPLETE)
  //   .map((action: myPlayer.SearchMyCompleteAction) => action.payload)
  //   .mergeMap(payload => {
  //     if (!payload[1] || payload[1] !== 'player1') {
  //      return empty();
  //     } else if (!payload[0]) {
  //       return of(new player.SearchPlayerFailed(new Error('searching player failed')))
  //     }
  //
  //     return this.playerService.account(payload[0].membershipType, payload[0].membershipId, 'player1')
  //       .map(searched => new myPlayer.SearchMyAccount([searched, 'player1']))
  //       .catch((err) => of(new player.SearchFailed(err)));
  //   });

  // @Effect()
  // opponentHistory: Observable<Action> = this.actions$
  //   .ofType(player.ActionTypes.SEARCH_COMPLETE)
  //   .map((action: player.SearchCompleteAction) => action.payload)
  //   .withLatestFrom(this.store.select(fromRoot.getAuthUser))
  //   .map(([payload, userId]) => {
  //     return {
  //       userId: userId,
  //       opponent: payload[0],
  //       playerIndex: payload[1]
  //     }
  //   })
  //   .mergeMap(payload => {
  //     if (!payload.userId || !payload.playerIndex) {
  //       return empty();
  //     } else if (!payload.opponent) {
  //       return of(new player.SearchPlayerFailed(new Error('searching player failed')))
  //     }
  //
  //     return this.playerService.getOpponentHistory(payload.userId, payload.opponent.membershipId)
  //       .map(res => new player.OpponentsFoundAction([res, payload.playerIndex]))
  //       .catch((err) => of(new player.SearchFailed(err)));
  //   });

  // @Effect()
  // teammates$: Observable<Action> = this.actions$
  //   .ofType(player.ActionTypes.SEARCH_TEAMMATES)
  //   .withLatestFrom(this.store)
  //   .map(([, store]) => {
  //     return {
  //       membershipId: store.players.player1.membershipId,
  //       activity: store.players.player1.intro.matches[0]
  //     }
  //   })
  //   .mergeMap(payload => {
  //     return this.playerService.pgcr(payload.activity.instanceId)
  //       .map((res: any) => {
  //         const player1 = res.entries
  //           .filter(entry => entry.player.destinyUserInfo.membershipId == payload.membershipId);
  //
  //         const players = res.entries
  //           .filter(entry => entry.player.destinyUserInfo.membershipId != payload.membershipId);
  //
  //         let team: number = parseInt(player1[0].values.team.basic.value);
  //         let teammates: Player[];
  //
  //         if (team < 0) {
  //           let standing: number = parseInt(player1[0].values.standing.basic.value);
  //           teammates = players
  //             .filter(entry => entry.values.team.standing.value == standing)
  //             .map(entry => entry.player.destinyUserInfo);
  //         } else {
  //           teammates = players
  //             .filter(entry => entry.values.team.basic.value == team)
  //             .map(entry => entry.player.destinyUserInfo);
  //         }
  //
  //         this.store.dispatch(new player.SearchCompleteAction([teammates[0], 'player2']));
  //         // this.store.dispatch(new player.SearchCompleteAction([teammates[1], `player3`]));
  //
  //         // return empty();
  //
  //         return IntervalObservable.create(500)
  //           .take(1)
  //           .subscribe(() => {
  //             // this.store.dispatch(new player.SearchCompleteAction([teammates[0], 'player2']));
  //             this.store.dispatch(new player.SearchCompleteAction([teammates[1], `player3`]));
  //           });
  //         }
  //       )
  //       .catch((err) => of(new player.SearchFailed(err)))
  //   });

  @Effect()
  searchPGCR$: Observable<Action> = this.actions$
    .ofType(pgcr.ActionTypes.SEARCH_PGCR)
    .map((action: pgcr.SearchPGCR) => action.payload)
    .mergeMap(payload =>
      this.playerService.pgcr(payload.instanceId)
        .map((res: PGCR) => {
          return new pgcr.StorePGCR({
            pgcr: res,
            characterId: payload.characterId,
            pIndex: payload.pIndex
          })
        })
        .catch((err) => of(new player.SearchFailed(err)))
    );
}
