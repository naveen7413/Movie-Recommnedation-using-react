import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

const API_KEY = '4f274059f1ea723ba6ba81662cef48fc';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchMovies(1, true); // Fetch initial movies
  }, []);

  const fetchMovies = async (pageNumber, reset = false) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`);
      setMovies(prevMovies => reset ? response.data.results : [...prevMovies, ...response.data.results]);
      setPage(pageNumber + 1); // Increment the page number for the next fetch
    } catch (error) {
      console.error('Error fetching movies:', error);
    }

    if (reset) setLoading(false);
    else setLoadingMore(false);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="movie-list">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={() => fetchMovies(page)} 
              disabled={loadingMore} 
              className="load-more"
              style={{
                padding: '10px 20px',
                fontSize: '1.2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
