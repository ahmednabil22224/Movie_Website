import axios from "axios";

const initialValue = {
  movies: [],
  moviesCount: 0,
  pageCount: 0,
  isLoading: true,
  error: null,
};

const reducerType = {
  Movies_PENDING: "POSTS_PENDING",
  Movies_SUCCESS: "POSTS_SUCCESS",
  Movies_FAILED: "POSTS_FAILED",
};

export const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case reducerType.Movies_PENDING:
      return { ...state, isLoading: true, error: null };
    case reducerType.Movies_SUCCESS:
      return (state = {
        movies: action.movie,
        moviesCount: action.movies_count,
        pagesCount: action.pages_count,
        isLoading: false,
        error: null,
      });
    case reducerType.Movies_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllMovies = (url) => {
  return async (dispatch) => {
    dispatch({ type: reducerType.Movies_PENDING });
    const cachedMovies = sessionStorage.getItem(url);
    if (cachedMovies) {
      const data = JSON.parse(cachedMovies);
      return dispatch({
        type: reducerType.Movies_SUCCESS,
        movie: data.results,
        movies_count: data.total_results,
        pages_count: data.total_pages,
      });
    }

    try {
      const response = await axios.get(url);
      const data = await response.data;
      sessionStorage.setItem(url, JSON.stringify(data));

      dispatch({
        type: reducerType.Movies_SUCCESS,
        movie: data.results,
        movies_count: data.total_results,
        pages_count: data.total_pages,
      });
    } catch (err) {
      dispatch({ type: reducerType.Movies_FAILED, payload: err.message });
    }
  };
};
