import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { IRecipe } from "./Types";
import "milligram";
import { getAllRecipes, deleteRecipe } from "./API";

function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  function recipeById(id: string) {
    return recipes.filter((recipe) => recipe.id === parseInt(id))[0];
  }

  function removeRecipeById(id: number) {
    let updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    deleteRecipe(id);
    setRecipes(updatedRecipes);
  }

  useEffect(() => {
    getAllRecipes()
      .then((res) => res.json())
      .then((json) => setRecipes(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <RecipeList recipes={recipes} />
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
