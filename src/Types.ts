export interface IRecipe {
  name: string;
  description: string;
  id: number;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
}

// Recipe without ID
export interface INewRecipe {
  name: string;
  description: string;
  ingredients: IIngredient[];
}
