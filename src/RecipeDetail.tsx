import React from "react";
import { IRecipe } from "./Types";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props {
  recipe: IRecipe;
  removeFunction: (arg0: number) => void;
}

function RecipeDetail(props: Props & RouteComponentProps) {
  let recipe = props.recipe;
  const handleRemove = () => {
    props.removeFunction(recipe.id);
    props.history.push("/");
  };

  if (!recipe) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <h2>{recipe.name}</h2>
      <div>{recipe.description}</div>
      <button>Edit</button>
      <button onClick={handleRemove}> Delete </button>
      <h4>Ingredients: </h4>
      {recipe.ingredients.map((ingredient) => (
        <li>{ingredient.name}</li>
      ))}
    </>
  );
}

export default withRouter(RecipeDetail);
