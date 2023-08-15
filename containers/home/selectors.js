import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectMovieState = (state) => state?.movies || initialState;

const makeSelectMoviesList = () =>
  createSelector(selectMovieState, (subState) => subState.movieList);

export { makeSelectMoviesList };
