import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryGames } from './models/categories-games';
import * as fromApp from './ngrx-store/app.reducer';
import * as gameActions from './ngrx-store/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public allCategoriesGameItems$: Observable<CategoryGames[]> =
    this.store.select((state) => state.games.allCategoriesGameItems);

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new gameActions.GetGames());
  }
}
