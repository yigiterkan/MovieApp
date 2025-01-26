import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, MovieSearchParams } from '../types/movie';
import * as movieApi from '../services/movieApi';

interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  totalResults: number;
  loading: boolean;
  error: string | null;
  searchParams: MovieSearchParams;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  totalResults: 0,
  loading: false,
  error: null,
  searchParams: {
    s: 'Pokemon',
    page: 1,
  },
};

export const searchMovies = createAsyncThunk('movies/search', async (params: MovieSearchParams) => {
  const response = await movieApi.searchMovies(params);
  return response;
});

export const getMovieDetails = createAsyncThunk('movies/getDetails', async (imdbId: string) => {
  const response = await movieApi.getMovieDetails(imdbId);
  return response;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<MovieSearchParams>) => {
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults);
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export const { setSearchParams } = movieSlice.actions;
export default movieSlice.reducer;
