import React from "react";
import {IRecipe} from "./Types"

function Recipe(props : IRecipe) {
  return (
    <>
      <h1>{props.name}</h1>
      <div>{props.description}</div>
    </>
  );
}

export default Recipe;
