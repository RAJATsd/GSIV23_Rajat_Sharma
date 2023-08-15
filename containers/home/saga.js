import { put, takeLatest } from "redux-saga/effects";
import {
  fetchMovieListError,
  fetchMovieListStart,
  fetchMovieListSuccess,
  fetchMoreMoviesSuccess,
  fetchMoreMoviesError,
  fetchMoreMoviesStart,
  searchMovieStart,
  searchMovieSuccess,
  searchMovieError,
  searchMoreMoviesStart,
  searchMoreMoviesError,
  searchMoreMoviesSuccess,
} from "./reducer";

function* fetchMovies() {
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

function* fetchMoreMovies(action) {
  try {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${action.payload}`;
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

    yield put(fetchMoreMoviesSuccess(data));
  } catch (err) {
    yield put(fetchMoreMoviesError(err));
  }
}

function* searchMovie(action) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${action.payload}&include_adult=false&language=en-US&page=1`;
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

    yield put(searchMovieSuccess(data));
  } catch (err) {
    yield put(searchMovieError(err));
  }
}

function* fetchNextMovies(action) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${action.payload.query}&include_adult=false&language=en-US&page=${action.payload.page}`;
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

    yield put(searchMoreMoviesSuccess(data));
  } catch (err) {
    yield put(searchMoreMoviesError(err));
  }
}

export default function* watchHome() {
  yield takeLatest(fetchMovieListStart.type, fetchMovies);
  yield takeLatest(fetchMoreMoviesStart.type, fetchMoreMovies);
  yield takeLatest(searchMovieStart.type, searchMovie);
  yield takeLatest(searchMoreMoviesStart.type, fetchNextMovies);
}
