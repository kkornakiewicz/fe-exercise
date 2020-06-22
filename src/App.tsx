import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { IRecipe } from "./Types";
import { API_URL } from "./Config";
import "milligram";

function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  function recipeById(id: string) {
    return recipes.filter(recipe => recipe.id === parseInt(id))[0];
  }

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(json => setRecipes(json))
      .catch(error => console.log(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <h1>List of my recipes</h1>
          <Switch>
            <Route exact path="/">
              <RecipeList recipes={recipes} />
            </Route>

            <Route
              exact
              path="/recipe/:id"
              render={props => (
                <RecipeDetail
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
