import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { RootState } from '../store';
import { searchMovies, setSearchParams } from '../store/movieSlice';
import type { AppDispatch } from '../store';

export default function MovieList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, error, searchParams } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(searchMovies(searchParams));
  }, [dispatch, searchParams]);

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setSearchParams({ ...searchParams, page: newPage + 1 }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Movie Name</TableCell>
              <TableCell>Release Year</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>IMDb ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                hover
                key={movie.imdbID}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{movie.Title}</TableCell>
                <TableCell>{movie.Year}</TableCell>
                <TableCell>{movie.Type}</TableCell>
                <TableCell>{movie.imdbID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={totalResults}
        rowsPerPage={10}
        page={(searchParams.page || 1) - 1}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
}
