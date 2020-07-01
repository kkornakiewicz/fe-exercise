import React from "react";
import { IRecipe } from "./Types";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props {
  recipe: IRecipe;
  removeFunction: (arg0: number) => void;
}

function RecipeDetail(props: Props & RouteComponentProps) {
  let recipe = props.recipe;
  let historyPush = props.history.push;

  const handleRemove = () => {
    props.removeFunction(recipe.id!);
    historyPush("/");
  };

  if (!recipe) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <h1>Recipe detail:</h1>
      <h2>{recipe.name}</h2>
      <div>{recipe.description}</div>
      <h4>Ingredients: </h4>
      {recipe.ingredients.map((ingredient) => (
        <li>{ingredient.name}</li>
      ))}
      <button onClick={() => historyPush("/recipe/" + recipe.id + "/edit")}>
        Edit
      </button>
      <button onClick={handleRemove}> Delete </button>
      <button onClick={() => historyPush("/")}>Back</button>
    </>
  );
}

export default withRouter(RecipeDetail);
