import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import { store } from './store';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <Container maxWidth='lg'>
          <Box sx={{ my: 4 }}>
            <Typography variant='h3' component='h1' gutterBottom align='center'>
              Movie Search App
            </Typography>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <SearchBar />
                    <MovieList />
                  </>
                }
              />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
