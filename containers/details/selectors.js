import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectMovieState = (state) => state?.movieDetails || initialState;

const makeSelectMovieDetails = () =>
  createSelector(selectMovieState, (subState) => subState.movieInfo);

const makeSelectMovieCredits = () =>
  createSelector(selectMovieState, (subState) => subState.movieCredits);

export { makeSelectMovieDetails, makeSelectMovieCredits };
