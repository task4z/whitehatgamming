import { CategoryGames } from '../models/categories-games';
import * as GameActions from './game.actions';

export interface State {
  allCategoriesGameItems: CategoryGames[];
  selectedCategory: string;
  selectedCategoryGameItems: CategoryGames | null;
}

export const initialState: State = {
  allCategoriesGameItems: [],
  selectedCategory: '',
  selectedCategoryGameItems: null,
};

export function gameReducer(
  state: State = initialState,
  action: GameActions.GameActions | any
): State {
  switch (action.type) {
    case GameActions.ADD_GAMES:
      return {
        ...state,
        allCategoriesGameItems: action.payload,
      };
    case GameActions.UPDATE_JACKPOTS:
      return {
        ...state,
        allCategoriesGameItems: action.payload.allCategoriesGameItems,
        selectedCategoryGameItems: action.payload.selectedCategoryGameItems,
      };
    case GameActions.ERROR_GETTING_GAMES:
      return {
        ...state,
        allCategoriesGameItems: [],
        selectedCategoryGameItems: null,
      };
    case GameActions.UPDATE_IF_NO_IMAGE:
      return {
        ...state,
        allCategoriesGameItems: state.allCategoriesGameItems.map(
          (categoryGames: CategoryGames) => {
            categoryGames.games.map(game => game.id === action.payload.id ? { ...game, image: '../../assets/no-image.jpg' } : game);
            return categoryGames;
          }),
        selectedCategoryGameItems: {
          category: (state.selectedCategoryGameItems as CategoryGames).category,
          games: (state.selectedCategoryGameItems as CategoryGames).games.map(game => game.id === action.payload.id ? { ...game, image: '../../assets/no-image.jpg' } : game)
        }
      };
    case GameActions.ERROR_GETTING_JACKPOTS:
      return {
        ...state,
      };
    case GameActions.SELECT_CATEGORY:
      const res = state.allCategoriesGameItems.filter((categoriesGames: CategoryGames) => (categoriesGames.category.name === action.payload));
      return {
        ...state,
        selectedCategory: action.payload,
        selectedCategoryGameItems: res.length > 0 ? res[0] : null
      }
    default:
      return state;
  }
}
