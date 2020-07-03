import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { IRecipe } from "./Types";
import "milligram";
import * as Api from "./API";
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

  function removeRecipeById(id: number) {
    Api.deleteRecipe(id).then((response) =>
      handleResponse(response, "delete recipe")
    );
  }

  function editRecipe(recipe: IRecipe) {
    recipe.ingredients = recipe.ingredients.filter(
      (ingredient) => ingredient.name !== ""
    );

    Api.patchRecipe(recipe).then((response) =>
      handleResponse(response, "update recipe")
    );
  }

  function addRecipe(recipe: IRecipe) {
    recipe.ingredients = recipe.ingredients.filter(
      (ingredient) => ingredient.name !== ""
    );
    Api.postRecipe(recipe).then((response) =>
      handleResponse(response, "create recipe")
    );
  }

  const handleResponse = (response: Response, method: string) => {
    let message: Message = {};
    if (!response.ok) {
      message.text = `Error: ${method} has failed.`;
      message.type = "error";
    } else {
      message.text = `Success: ${method}`;
      setState({
        ...state,
        reloadData: !state.reloadData,
      });
    }
    setMessage(message);
  };

  useEffect(() => {
    Api.getAllRecipes()
      .then((res) => res.json())
      .then((json) =>
        setState({
          recipes: json,
          reloadData: state.reloadData,
        })
      )
      .catch((error) => console.log(error));
  }, [state.reloadData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({});
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);

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
