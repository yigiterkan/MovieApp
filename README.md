# Movie Search App

A React application that allows users to search for and view movie details using the OMDb API.

## Features

- Search movies by title
- Filter movies by year and type (movie/series/episode)
- View detailed information about each movie
- Responsive design
- Pagination support

## Technologies Used

- React 18
- TypeScript
- Vite
- Material UI
- Redux Toolkit
- React Router
- Axios

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OMDb API key (get it from [http://www.omdbapi.com/](http://www.omdbapi.com/))

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-search-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OMDb API key:

   ```
   VITE_OMDB_API_KEY=your_api_key_here
   VITE_API_BASE_URL=http://www.omdbapi.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Build

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
  ├── components/     # React components
  ├── features/       # Feature-specific components and logic
  ├── store/         # Redux store configuration and slices
  ├── services/      # API services
  ├── types/         # TypeScript type definitions
  └── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
