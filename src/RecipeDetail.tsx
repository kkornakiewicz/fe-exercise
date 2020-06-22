import React from "react";
import { IRecipe } from "./Types";

interface Props {
  recipe : IRecipe;
}

function RecipeDetail(props : Props) {
  console.log("1");
  console.log(props);
  
  let recipe = props.recipe
  // let recipe = props.getRecipe(props.id)
  console.log({recipe});
  if(!recipe){
    return <h3>Loading...</h3> 
    }
   
  return (<>
  <h3>{recipe.name}</h3>
      <div>{recipe.description}</div>
    </>);

}

export default RecipeDetail;
