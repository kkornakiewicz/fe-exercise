import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IRecipe } from "./Types";

interface Props {
  recipe?: IRecipe;
  action: (arg: IRecipe) => void;
}

function EditableRecipeDetail(props: Props & RouteComponentProps) {
  const initRecipe = props.recipe
    ? props.recipe
    : {
        id: 99999,
        name: "",
        description: "",
        ingredients: [],
      };
  const [recipe, setRecipe] = useState(initRecipe);

  return (
    <>
      <h1>{initRecipe.name ? recipe.name : "New recipe"}</h1>
      <form>
        Name:{" "}
        <input
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
        Description:{" "}
        <input
          value={recipe.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            props.action(recipe);
            props.history.push("/");
          }}
        >
          Save
        </button>
        <button onClick={() => props.history.push("/")}>Back</button>
      </form>
    </>
  );
}

export default withRouter(EditableRecipeDetail);
