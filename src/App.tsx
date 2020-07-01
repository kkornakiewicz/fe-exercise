import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { IRecipe } from "./Types";
import "milligram";
import { getAllRecipes, deleteRecipe, patchRecipe, postRecipe } from "./API";
import EditableRecipeDetail from "./EditableRecipeDetail";
import ComponentWrapper from "./ComponentWrapper";

interface IState {
  recipes: IRecipe[];
  reloadData: boolean;
}

export interface Message {
  text?: String;
  type?: String;
}

function App() {
  const [state, setState] = useState<IState>({
    recipes: [],
    reloadData: false,
  });

  const [message, setMessage] = useState<Message>({});
  function recipeById(id: string) {
    return state.recipes.filter((recipe) => recipe.id === parseInt(id))[0];
  }

  async function removeRecipeById(id: number) {
    await deleteRecipe(id);
    setState({ recipes: state.recipes, reloadData: !state.reloadData });
  }

  async function editRecipe(recipe: IRecipe) {
    recipe.ingredients = recipe.ingredients.filter(
      (ingredient) => ingredient.name !== ""
    );

    await patchRecipe(recipe).then((response) => {
      let message: Message = {};
      if (!response.ok) {
        message.text = response.statusText;
        message.type = "error";
      } else {
        message.text = "Recipe updated!";
        setState({
          ...state,
          reloadData: !state.reloadData,
        });
      }
      setMessage(message);
    });
  }

  async function addRecipe(recipe: IRecipe) {
    recipe.ingredients = recipe.ingredients.filter(
      (ingredient) => ingredient.name !== ""
    );
    await postRecipe(recipe).then((response) => {
      let message: Message = {};
      if (!response.ok) {
        message.text = response.statusText;
        message.type = "error";
      } else {
        message.text = "Recipe created!";
        setState({
          ...state,
          reloadData: !state.reloadData,
        });
      }
      setMessage(message);
    });
  }

  useEffect(() => {
    console.log("Use effect.");
    getAllRecipes()
      .then((res) => res.json())
      .then((json) =>
        setState({
          recipes: json,
          reloadData: state.reloadData,
        })
      )
      .catch((error) => console.log(error));
  }, [state.reloadData]);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <ComponentWrapper message={message}>
                <RecipeList recipes={state.recipes} />
              </ComponentWrapper>
            </Route>
            <Route exact path="/recipe/add">
              <ComponentWrapper message={message}>
                <EditableRecipeDetail action={addRecipe} />
              </ComponentWrapper>
            </Route>
            <Route
              exact
              path="/recipe/:id"
              render={(props) => (
                <ComponentWrapper message={message}>
                  <RecipeDetail
                    removeFunction={removeRecipeById}
                    recipe={recipeById(props.match.params.id)}
                  />
                </ComponentWrapper>
              )}
            ></Route>
            <Route
              exact
              path="/recipe/:id/edit"
              render={(props) => (
                <ComponentWrapper message={message}>
                  <EditableRecipeDetail
                    recipe={recipeById(props.match.params.id)}
                    action={editRecipe}
                  />
                </ComponentWrapper>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
