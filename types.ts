
export enum Category {
  Planets = "Planetas",
  Flags = "Bandeiras",
  Shapes = "Formas Geométricas",
}

export interface Item {
  id: string;
  name: string;
  image: string;
  category: Category;
}

export type Theme = 'light' | 'dark' | 'stars';

export interface QuizQuestion {
  questionItem: Item;
  options: Item[];
}

export type View = 'menu' | 'gallery' | 'quiz' | 'surprise' | 'detail';
