import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getMovieDetails } from '../store/movieSlice';
import type { AppDispatch, RootState } from '../store';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  if (!selectedMovie) {
    return <Alert severity="info">No movie selected</Alert>;
  }

  return (
    <Card>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ m: 2 }}>
        Back to List
      </Button>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component='img'
            image={selectedMovie.Poster}
            alt={selectedMovie.Title}
            sx={{ borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant='h4' gutterBottom>
              {selectedMovie.Title}
            </Typography>
            <Stack direction='row' spacing={1} mb={2}>
              <Chip label={`Year: ${selectedMovie.Year}`} />
              <Chip label={`Runtime: ${selectedMovie.Runtime}`} />
              <Chip label={`IMDb: ${selectedMovie.imdbRating}`} />
            </Stack>
            <Typography variant='body1' gutterBottom>
              <strong>Genre:</strong> {selectedMovie.Genre}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Director:</strong> {selectedMovie.Director}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Cast:</strong> {selectedMovie.Actors}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Plot:</strong> {selectedMovie.Plot}
            </Typography>
            <Typography variant='body1'>
              <strong>Released:</strong> {selectedMovie.Released}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
