import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IRecipe } from "./Types";
import { Button } from "./Button";

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

  useEffect(() => {
    if (props.recipe) {
      setRecipe(props.recipe);
    }
  }, [props.recipe]);

  const handleIngredientChange = (index: number, newName: string) => {
    // Remove empty ingredient
    if (newName === "") {
      let filteredIngredients = recipe.ingredients.filter(
        (_, i) => index !== i
      );

      setRecipe({ ...recipe, ingredients: filteredIngredients });
      return;
    }
    // Update ingredient
    const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
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

  const handleBack = () => {
    if (recipe.id) {
      props.history.push(`/recipe/${recipe.id}`);
    } else {
      props.history.push("/");
    }
  };

  return (
    <>
      <h2>Edit or add recipe:</h2>
      <form>
        Name:
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
        Ingredients:
        <ol>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <input
                  key={index}
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                ></input>
              );
            })}
          </ul>
        </ol>
        <Button
          onClick={(e) => {
            e.preventDefault();
            props.action(recipe);
            handleBack();
          }}
        >
          Save
        </Button>
        <Button onClick={handleBack}>Back</Button>
      </form>
    </>
  );
}

export default withRouter(EditableRecipeDetail);
