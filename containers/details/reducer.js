import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieInfo: {
    data: null,
    error: null,
    loading: false,
  },
  movieCredits: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchMoviesDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    fetchMovieDetailsStart(state) {
      state.movieInfo.loading = true;
    },
    fetchMovieDetailsSuccess(state, action) {
      state.movieInfo.data = action.payload;
      state.movieInfo.error = null;
      state.movieInfo.loading = false;
    },
    fetchMovieDetailsError(state, action) {
      state.movieInfo.data = null;
      state.movieInfo.error = action.payload;
      state.movieInfo.loading = false;
    },
    fetchMovieCreditsStart(state) {
      state.movieCredits.loading = true;
    },
    fetchMovieCreditsSuccess(state, action) {
      state.movieCredits.data = action.payload;
      state.movieCredits.error = null;
      state.movieCredits.loading = false;
    },
    fetchMovieCreditsError(state, action) {
      state.movieCredits.data = null;
      state.movieCredits.error = action.payload;
      state.movieCredits.loading = false;
    },
  },
});

export const {
  fetchMovieCreditsError,
  fetchMovieCreditsStart,
  fetchMovieCreditsSuccess,
  fetchMovieDetailsError,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
} = fetchMoviesDetailsSlice.actions;

export { initialState };

export default fetchMoviesDetailsSlice.reducer;
