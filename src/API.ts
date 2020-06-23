import { API_URL } from "./Config";
import { IRecipe } from "./Types";

const getAllRecipes = () =>
  fetch(API_URL, {
    method: "GET",
    mode: "cors",
  });

const deleteRecipe = (id: number) =>
  fetch(API_URL + id, {
    method: "DELETE",
    mode: "cors",
  });

const patchRecipe = (recipe: IRecipe) =>
  fetch(API_URL + recipe.id + "/", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

const postRecipe = (recipe: IRecipe) =>
  fetch(API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

export { postRecipe, getAllRecipes, deleteRecipe, patchRecipe };
