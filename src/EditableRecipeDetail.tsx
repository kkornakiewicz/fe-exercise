import React, { useState, useEffect } from "react";
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
        name: "",
        description: "",
        ingredients: [],
      };
  const [recipe, setRecipe] = useState(initRecipe);

  useEffect(() => {
    if (
      recipe.ingredients.length === 0 ||
      recipe.ingredients[recipe.ingredients.length - 1].name !== ""
    ) {
      setRecipe({
        ...recipe,
        ingredients: recipe.ingredients.concat([{ name: "" }]),
      });
    }
  }, [recipe]);

  const handleIngredientChange = (index: number, newName: string) => {
    if (newName === "") {
      let filteredIngredients = recipe.ingredients.filter(
        (_, i) => (index = i)
      );

      setRecipe({ ...recipe, ingredients: filteredIngredients });
      return;
    }

    let updatedIngredients = recipe.ingredients.map((ingredient, i) => {
      if (index === i) {
        return {
          name: newName,
        };
      } else {
        return { name: ingredient.name };
      }
    });
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  return (
    <>
      <h1>Edit or add recipe:</h1>
      <form>
        Name:{" "}
        <input
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
        Description:
        <input
          value={recipe.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
        />
        Ingredients:{" "}
        <ol>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <input
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                ></input>
              );
            })}
          </ul>
        </ol>
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
