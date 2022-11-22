export interface CategoryGames{
    category: CategoryJackpot;
    games: Game[];
}

export interface Game {
    id: string;
    name: string;
    image: string;
    isTop: boolean;
    isNew: boolean;
    amount: number | null;
}

export interface Category {
    name: string;
    label: string;
}

export interface CategoryWithTypes extends Category {
    types: string[];
}

export interface CategoryJackpot extends Category {
    hasJackpot: boolean;
}