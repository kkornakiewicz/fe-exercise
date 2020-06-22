import React, { } from "react";
import { IRecipe } from "./Types";
import { Link } from "react-router-dom";
interface Props {
  recipes: IRecipe[];
}

function RecipeList(props: Props) {
  return (
    <>
      {props.recipes.map(recipe => (
        <ul>
          <li>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </li>
        </ul>
      ))}
    </>
  );
}

export default RecipeList;
