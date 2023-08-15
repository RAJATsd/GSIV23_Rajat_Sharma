import { put, takeLatest } from "redux-saga/effects";

import apiUrl from "@/utils/apiUrl";
import {
  fetchMovieCreditsError,
  fetchMovieCreditsStart,
  fetchMovieCreditsSuccess,
  fetchMovieDetailsError,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
} from "./reducer";

function* fetchMovieDetails(action) {
  try {
    const url = apiUrl(
      `https://api.themoviedb.org/3/movie/${action.payload}?language=en-US`
    );

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(fetchMovieDetailsSuccess(data));
  } catch (err) {
    yield put(fetchMovieDetailsError(err));
  }
}

function* fetchMovieCredits(action) {
  try {
    const url = apiUrl(
      `https://api.themoviedb.org/3/movie/${action.payload}/credits`
    );

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(fetchMovieCreditsSuccess(data));
  } catch (err) {
    yield put(fetchMovieCreditsError(err));
  }
}

export default function* watchMovieDetails() {
  yield takeLatest(fetchMovieDetailsStart.type, fetchMovieDetails);
  yield takeLatest(fetchMovieCreditsStart.type, fetchMovieCredits);
}
