import { Action } from '@ngrx/store';
import { AllCategoriesSelect } from '../models/all-categories-selected';
import { CategoryGames, Game } from '../models/categories-games';

export const GET_GAMES = '[Games] GET_GAMES';
export const ADD_GAMES = '[Games] ADD_GAMES';
export const ERROR_GETTING_GAMES = '[Games] ERROR_GETTING_GAMES';
export const GET_JACKPOTS = '[Games] GET_JACKPOTS';
export const UPDATE_JACKPOTS = '[Games] UPDATE_JACKPOTS';
export const ERROR_GETTING_JACKPOTS = '[Games] ERROR_GETTING_JACKPOTS';
export const SELECT_CATEGORY = '[Games] SELECT_CATEGORY';
export const UPDATE_IF_NO_IMAGE = '[Games] UPDATE_IF_NO_IMAGE';
export const STOP_REFRESH = '[Games] STOP_REFRESH';

export class GetGames implements Action {
  readonly type = GET_GAMES;
}

export class AddGames implements Action {
  readonly type = ADD_GAMES;
  constructor(public payload: CategoryGames[]) { }
}

export class ErrorGettingGames implements Action {
  readonly type = ERROR_GETTING_GAMES;
  constructor(public payload: any) { }
}

export class GetJackpots implements Action {
  readonly type = GET_JACKPOTS;
  constructor(public payload: AllCategoriesSelect) { }
}

export class UpdateJackpots implements Action {
  readonly type = UPDATE_JACKPOTS;
  constructor(public payload: AllCategoriesSelect) { }
}

export class ErrorGettingJackpots implements Action {
  readonly type = ERROR_GETTING_JACKPOTS;
  constructor(public payload: any) { }
}

export class SelectCategory implements Action {
  readonly type = SELECT_CATEGORY;
  constructor(public payload: string) { }
}

export class UpdateIfNoImage implements Action {
  readonly type = UPDATE_IF_NO_IMAGE;
  constructor(public payload: Game) { }
}

export class StopRefresh implements Action {
  readonly type = STOP_REFRESH;
  constructor() { }
}

export type GameActions =
  | GetGames
  | AddGames
  | ErrorGettingGames
  | GetJackpots
  | UpdateJackpots
  | ErrorGettingJackpots
  | SelectCategory
  | StopRefresh;
