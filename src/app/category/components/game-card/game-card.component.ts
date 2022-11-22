import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/categories-games';
import * as fromApp from '../../../ngrx-store/app.reducer';
import * as gameActions from '../../../ngrx-store/game.actions';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game: Game | undefined;

  constructor(private store: Store<fromApp.AppState>) { }

  updateUrl(game: Game): void {
    this.store.dispatch(new gameActions.UpdateIfNoImage(game));
  }
}
