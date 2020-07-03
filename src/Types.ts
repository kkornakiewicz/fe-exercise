export interface IRecipe {
  name: string;
  description: string;
  id?: number;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
}

