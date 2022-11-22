import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllCategoriesSelect } from '../models/all-categories-selected';
import { CategoryGames, CategoryWithTypes, Game } from '../models/categories-games';
import { GamesSource } from '../models/games-source';
import { JackpotsSource } from '../models/jackpots-source';


const TOP = 'top';
const NEW = 'new';
const JACKPOTS = 'jackpots';
const CATEGORIES = [
  { label: 'Top Games', types: [TOP], name: TOP },
  { label: 'New Games', types: [NEW], name: NEW },
  { label: 'Slots', types: ['slots'], name: 'slots' },
  { label: 'Jackpots', types: [JACKPOTS], name: JACKPOTS },
  { label: 'Live', types: ['live'], name: 'live' },
  { label: 'Blackjack', types: ['blackjack'], name: 'blackjack' },
  { label: 'Roulette', types: ['roulette'], name: 'roulette' },
  { label: 'Table', types: ['table'], name: 'table' },
  { label: 'Poker', types: ['poker'], name: 'poker' },
  { label: 'Other', types: ['fun', 'virtual', 'ball'], name: 'other' }
] as CategoryWithTypes[];

@Injectable({
  providedIn: 'root'
})
export class GamesFeedService {

  constructor(private http: HttpClient) { }

  public getGamesJackpot(): Observable<CategoryGames[]> {
    return forkJoin([this.getGames(), this.getJackpots()]).pipe(
      map(([games, jackpots]: [GamesSource[], JackpotsSource[]]) => {
        jackpots.forEach(jackpot => {
          let gameIdx = games.findIndex(g => g.id === jackpot.game);
          if (gameIdx > -1) {
            games[gameIdx] = { ...games[gameIdx], amount: jackpot.amount };
          }
        });
        return this.transformGames(games);
      })
    );
  }

  public updateJackpots(allCategoriesSelect: AllCategoriesSelect): Observable<AllCategoriesSelect> {
    return this.getJackpots().pipe(
      map((jackpots: JackpotsSource[]) => {
        return {
          allCategoriesGameItems: allCategoriesSelect.allCategoriesGameItems.map((categoryGames: CategoryGames) => this.updateJackpotsInCategoryGames(jackpots, categoryGames)),
          selectedCategoryGameItems: this.updateJackpotsInCategoryGames(jackpots, allCategoriesSelect.selectedCategoryGameItems)
        } as AllCategoriesSelect;
      })
    );
  }

  private updateJackpotsInCategoryGames(jackpots: JackpotsSource[], categoryGames: CategoryGames): CategoryGames {
    return {
      ...categoryGames,
      games: categoryGames.games.map((game: Game) => {
        jackpots.forEach((jackpot: JackpotsSource) => {
          if (game.id === jackpot.game) {
            game = { ...game, amount: jackpot.amount };
          }
        });
        return game;
      })
    };
  }

  private getJackpots(): Observable<JackpotsSource[]> {
    return this.http.get<JackpotsSource[]>(`${environment.apiUrl}jackpots.php`);
  }

  private getGames(): Observable<GamesSource[]> {
    return this.http.get<GamesSource[]>(`${environment.apiUrl}games.php`);
  }

  private transformGames(games: GamesSource[]): CategoryGames[] {
    let res: CategoryGames[] = [];
    CATEGORIES.forEach((category: CategoryWithTypes) => {
      //classic is probably missing in http://stage.whgstage.com/front-end-test/design.png
      let gamesInCategory = this.getGamesInCategory(category, games);
      res.push({
        category: {
          label: category.label,
          name: category.name,
          hasJackpot: gamesInCategory.filter(game => game.amount).length > 0,
        },
        games: gamesInCategory.map(g => ({
          id: g.id,
          name: g.name,
          image: g.image,
          isTop: g.categories.indexOf(TOP) > -1,
          isNew: g.categories.indexOf(NEW) > -1,
          amount: g.amount
        }))
      });
    });
    return res;
  }

  private getGamesInCategory(category: CategoryWithTypes, games: GamesSource[]): GamesSource[] {
    if (category.types.length <= 0) {
      return [];
    }
    if (category.types.length > 1) {
      return games.filter((game: GamesSource) => {
        if (category.types.filter((type: string) => game.categories.indexOf(type) > -1).length > 0) {
          return game;
        }
        return;
      });
    }
    if (category.types[0] === JACKPOTS) {
      return games.filter((game: GamesSource) => game.amount);
    }
    return games.filter((game: GamesSource) => game.categories.indexOf(category.types[0]) > -1);
  }
}
