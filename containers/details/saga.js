import { put, takeLatest } from "redux-saga/effects";
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
    const url = `https://api.themoviedb.org/3/movie/${action.payload}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmRiMmUwYTAxNWZhMzM0MzQxYjVmMmRiMDMzYjkxZiIsInN1YiI6IjY0ZGE2MzAxMzcxMDk3MDBlMjI2ZGM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tz5VNnOHjunxvCQZYRMb18vPs5a5Cjep3Qm5yieW50U",
      },
    };

    const response = yield fetch(url, options);
    const data = yield response.json();

    yield put(fetchMovieDetailsSuccess(data));
  } catch (err) {
    yield put(fetchMovieDetailsError(err));
  }
}

function* fetchMovieCredits(action) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${action.payload}/credits`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmRiMmUwYTAxNWZhMzM0MzQxYjVmMmRiMDMzYjkxZiIsInN1YiI6IjY0ZGE2MzAxMzcxMDk3MDBlMjI2ZGM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tz5VNnOHjunxvCQZYRMb18vPs5a5Cjep3Qm5yieW50U",
      },
    };

    const response = yield fetch(url, options);
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
