import React from "react";
import { IRecipe } from "./Types";
import { Link } from "react-router-dom";
interface Props {
  recipes: IRecipe[];
}

function RecipeList(props: Props) {
  return (
    <>
      <h1>List of my recipes</h1>
      <ul>
        {props.recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
