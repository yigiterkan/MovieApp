import axios from 'axios';
import { MovieDetails, MovieSearchParams, SearchResponse } from '../types/movie';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  params: {
    apikey: apiKey,
  },
});

export const searchMovies = async (params: MovieSearchParams): Promise<SearchResponse> => {
  const response = await api.get('', { params });
  return response.data;
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetails> => {
  const response = await api.get('', {
    params: {
      i: imdbId,
      plot: 'full',
    },
  });
  return response.data;
};
