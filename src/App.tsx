import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { IRecipe } from "./Types";
import "milligram";
import { getAllRecipes, deleteRecipe, patchRecipe, postRecipe } from "./API";
import EditableRecipeDetail from "./EditableRecipeDetail";

interface IState {
  recipes: IRecipe[];
  reloadData: boolean;
}

function App() {
  const [state, setState] = useState<IState>({
    recipes: [],
    reloadData: false,
  });

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
    await patchRecipe(recipe);
    setState({ recipes: state.recipes, reloadData: !state.reloadData });
  }

  async function addRecipe(recipe: IRecipe) {
    recipe.ingredients = recipe.ingredients.filter(
      (ingredient) => ingredient.name !== ""
    );
    await postRecipe(recipe);
    setState({ recipes: state.recipes, reloadData: !state.reloadData });
  }

  useEffect(() => {
    getAllRecipes()
      .then((res) => res.json())
      .then((json) => setState({ recipes: json, reloadData: state.reloadData }))
      .catch((error) => console.log(error));
  }, [state.reloadData]);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <RecipeList recipes={state.recipes} />
            </Route>
            <Route exact path="/recipe/add">
              <EditableRecipeDetail action={addRecipe} />
            </Route>
            <Route
              exact
              path="/recipe/:id"
              render={(props) => (
                <RecipeDetail
                  removeFunction={removeRecipeById}
                  recipe={recipeById(props.match.params.id)}
                />
              )}
            ></Route>
            <Route
              exact
              path="/recipe/:id/edit"
              render={(props) => (
                <EditableRecipeDetail
                  recipe={recipeById(props.match.params.id)}
                  action={editRecipe}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
