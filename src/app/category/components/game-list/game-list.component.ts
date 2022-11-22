import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryGames } from 'src/app/models/categories-games';
import { State } from 'src/app/ngrx-store/game.reducer';
import * as fromApp from '../../../ngrx-store/app.reducer';
import * as gameActions from '../../../ngrx-store/game.actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  public selectedCategoryGameItems$: Observable<CategoryGames | null> = this.store.select((state) => state.games.selectedCategoryGameItems);

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select((state) => state.games).subscribe((state: State) => {
      if (!state.selectedCategoryGameItems?.category.hasJackpot) {
        return this.store.dispatch(new gameActions.StopRefresh())
      }
      this.store.dispatch(new gameActions.GetJackpots({ allCategoriesGameItems: state.allCategoriesGameItems, selectedCategoryGameItems: state.selectedCategoryGameItems }));
    });
  }
}
