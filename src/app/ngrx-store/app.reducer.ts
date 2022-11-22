import { ActionReducerMap } from '@ngrx/store';
import * as fromGames from './game.reducer';

export interface AppState {
  games: fromGames.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  games: fromGames.gameReducer,
};
