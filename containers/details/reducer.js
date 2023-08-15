import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: {
    data: null,
    error: null,
    loading: false,
  },
  nextMovies: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
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
    fetchMoreMoviesStart(state) {
      state.nextMovies.loading = true;
    },
    fetchMoreMoviesSuccess(state, action) {
      state.nextMovies.data = action.payload;
      state.nextMovies.error = null;
      state.nextMovies.loading = false;
      state.movieList.data = {
        ...action.payload,
        results: [...state.movieList.data.results, ...action.payload.results],
      };
    },
    fetchMoreMoviesError(state, action) {
      state.nextMovies.data = null;
      state.nextMovies.error = action.payload;
      state.nextMovies.loading = false;
    },
  },
});

export const {
  fetchMovieListStart,
  fetchMovieListError,
  fetchMovieListSuccess,
  fetchMoreMoviesError,
  fetchMoreMoviesStart,
  fetchMoreMoviesSuccess,
} = fetchMoviesSlice.actions;

export { initialState };

export default fetchMoviesSlice.reducer;
