import React, { useState, useEffect } from "react";
import { IRecipe } from "./Types";
import { API_URL } from "./Config";


function RecipeList() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(json => setRecipes(json))
      .catch(error => console.log(error));
  },[]);

  return (
    <>
      <h1>RecipeList</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
