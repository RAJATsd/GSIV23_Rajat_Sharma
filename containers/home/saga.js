import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMovieListError,
  fetchMovieListStart,
  fetchMovieListSuccess,
} from "./reducer";

function* fetchMovies(action) {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
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

    yield put(fetchMovieListSuccess(data));
  } catch (err) {
    yield put(fetchMovieListError(err));
  }
}

export default function* watchHome() {
  yield takeLatest(fetchMovieListStart.type, fetchMovies);
}
