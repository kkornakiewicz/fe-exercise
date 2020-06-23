import React from "react";
import { IRecipe } from "./Types";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props {
  recipes: IRecipe[];
}

function RecipeList(props: Props & RouteComponentProps) {
  return (
    <>
      <h1>List of my recipes</h1>
      <ul>
        {props.recipes
          .sort((a, b) => a.id - b.id)
          .map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
      </ul>
      <button onClick={() => props.history.push("/recipe/add")}>Add</button>
    </>
  );
}

export default withRouter(RecipeList);
