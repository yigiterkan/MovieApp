export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface MovieDetails extends Movie {
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Released: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieSearchParams {
  s: string;
  type?: 'movie' | 'series' | 'episode';
  y?: string;
  page?: number;
}
