import axios from "axios";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./slice";

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/categories`
    );
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};
