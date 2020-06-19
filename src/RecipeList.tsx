import React, { useState } from "react";
import { IRecipe } from "./Types";

let sampleRecipe: IRecipe = {
  name: "Sample recipe",
  description: "Sample description"
};

function RecipeList() {
  const [recipes, setRecipes] = useState<IRecipe[]>([sampleRecipe]);

  return (
    <>
      <h1>RecipeList</h1>
      <ul>
        {recipes.map(recipe => (
          <li>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
