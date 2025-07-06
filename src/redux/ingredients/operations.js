import axios from "axios";
import {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsFailure,
} from "./slice";

export const fetchIngredients = () => async (dispatch) => {
  dispatch(fetchIngredientsStart());
  try {
    const response = await axios.get(
      "https://fullstack-recipes-backend-ssa1.onrender.com/api/categories"
    );
    dispatch(fetchIngredientsSuccess(response.data));
  } catch (error) {
    dispatch(fetchIngredientsFailure(error.message));
  }
};
