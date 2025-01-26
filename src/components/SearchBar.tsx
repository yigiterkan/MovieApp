import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setSearchParams } from '../store/movieSlice';
import type { AppDispatch, RootState } from '../store';
import type { MovieSearchParams } from '../types/movie';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSelector((state: RootState) => state.movies.searchParams);
  const [localParams, setLocalParams] = useState<MovieSearchParams>(searchParams);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchParams({ ...localParams, page: 1 }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localParams, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchParams({ ...localParams, page: 1 }));
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSearch}
      sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search Movies...'
          value={localParams.s}
          onChange={(e) => setLocalParams({ ...localParams, s: e.target.value })}
        />
        <IconButton type='submit' sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Stack>

      <Stack direction='row' spacing={2}>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={localParams.type || ''}
            label='Type'
            onChange={(e) =>
              setLocalParams({
                ...localParams,
                type: e.target.value as MovieSearchParams['type'],
              })
            }
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='movie'>Movies</MenuItem>
            <MenuItem value='series'>TV Series</MenuItem>
            <MenuItem value='episode'>Episodes</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size='small'
          label='Year'
          type='number'
          value={localParams.y || ''}
          onChange={(e) => setLocalParams({ ...localParams, y: e.target.value })}
          sx={{ width: 100 }}
        />
      </Stack>
    </Paper>
  );
}
