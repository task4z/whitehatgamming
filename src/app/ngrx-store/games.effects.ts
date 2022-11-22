import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { interval, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GamesFeedService } from '../services/games-feed.service';
import * as gameActions from './game.actions';
import { CategoryGames } from '../models/categories-games';
import { AllCategoriesSelect } from '../models/all-categories-selected';
import { GetJackpots } from './game.actions';

@Injectable()
export class GamesEffects {
  getGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gameActions.GET_GAMES),
      switchMap(() =>
        this.gameFeedService.getGamesJackpot().pipe(
          map((games: CategoryGames[]) => new gameActions.AddGames(games)),
          catchError((e: any) => of(new gameActions.ErrorGettingGames(e)))
        )
      ),
    )
  });
  getJackpots$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gameActions.GET_JACKPOTS),
      switchMap((action: GetJackpots) =>
        interval(3000).pipe(
          switchMap(() =>
            this.gameFeedService.updateJackpots(action.payload).pipe(
              map((allCategoriesSelect: AllCategoriesSelect) => new gameActions.UpdateJackpots(allCategoriesSelect)),
              catchError((e: any) => of(new gameActions.ErrorGettingJackpots(e)))
            )
          ),
          takeUntil(this.actions$.pipe(ofType(gameActions.STOP_REFRESH)))
        )
      )
    )
  });
  constructor(private actions$: Actions, private gameFeedService: GamesFeedService) { }
}
