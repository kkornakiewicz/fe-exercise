import React from "react";
import { IRecipe } from "./Types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "./Button";

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
      <h2>{recipe.name}</h2>
      <div>{recipe.description}</div>
      <h4>Ingredients: </h4>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient.name}</li>
      ))}
      <Button onClick={() => historyPush("/recipe/" + recipe.id + "/edit")}>
        Edit
      </Button>
      <Button onClick={handleRemove}> Delete </Button>
      <Button onClick={() => historyPush("/")}>Back</Button>
    </>
  );
}

export default withRouter(RecipeDetail);
