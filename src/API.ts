import { API_URL } from "./Config";

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

export { getAllRecipes, deleteRecipe };
