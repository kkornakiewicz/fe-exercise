import React from "react";
import { IRecipe } from "./Types";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "./Button";

interface Props {
  recipes: IRecipe[];
}

function RecipeList(props: Props & RouteComponentProps) {
  if (!props.recipes) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <h2>List of my recipes</h2>
      <ul>
        {props.recipes
          .sort((a, b) => a.id! - b.id!)
          .map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
      </ul>
      <Button onClick={() => props.history.push("/recipe/add")}>Add</Button>
    </>
  );
}

export default withRouter(RecipeList);
