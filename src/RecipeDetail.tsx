import React from "react";
import { IRecipe } from "./Types";

interface Props {
  recipe: IRecipe;
}

function RecipeDetail(props: Props) {
  let recipe = props.recipe;
  console.log({ recipe });
  if (!recipe) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <h2>{recipe.name}</h2>
      <div>{recipe.description}</div>
      <h4>Ingredients: </h4>
      {recipe.ingredients.map(ingredient => (
        <li>{ingredient.name}</li>
      ))}
    </>
  );
}

export default RecipeDetail;
