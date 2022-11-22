import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryGames } from '../models/categories-games';
import * as fromApp from '../ngrx-store/app.reducer';
import * as gameActions from '../ngrx-store/game.actions';

@Component({
  selector: 'app-topBar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() allCategoriesGameItems: CategoryGames[] = [];
  public selectedCategory$: Observable<string> = this.store.select((state) => state.games.selectedCategory);

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    if (window.location.pathname.split('/').length < 2) {
      return;
    }
    this.store.dispatch(new gameActions.SelectCategory(window.location.pathname.split('/')[2]));
  }

  select(name: string): void {
    this.store.dispatch(new gameActions.SelectCategory(name));
  }
}
