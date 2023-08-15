import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    fetchMovieListStart(state) {
      state.movieList.loading = true;
    },
    fetchMovieListSuccess(state, action) {
      state.movieList.data = action.payload;
      state.movieList.error = null;
      state.movieList.loading = false;
    },
    fetchMovieListError(state, action) {
      state.movieList.data = null;
      state.movieList.error = action.payload;
      state.movieList.loading = false;
    },
  },
});

export const {
  fetchMovieListStart,
  fetchMovieListError,
  fetchMovieListSuccess,
} = fetchMoviesSlice.actions;

export default fetchMoviesSlice.reducer;
