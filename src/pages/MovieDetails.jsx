import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css'; // Ensure styles are imported

const API_KEY = '4f274059f1ea723ba6ba81662cef48fc';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // Fetch movie details
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details.');
        setLoading(false);
      });

    // Fetch similar movies
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&page=${page}`)
      .then(response => {
        setSimilarMovies(prevMovies => [...prevMovies, ...response.data.results]); // Append new movies
      })
      .catch(error => {
        console.error('Error fetching similar movies:', error);
      });
  }, [id, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment the page number to load more movies
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return movie ? (
    <div className="movie-details-container">
      <div className="movie-details-card" style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <div className="movie-image-container">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="movie-image"
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <div className="movie-info" style={{ marginLeft: '20px' }}>
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Director:</strong> {movie.credits.crew.find(person => person.job === 'Director')?.name || 'N/A'}</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <h2 className="recommendation-heading">You Might Also Like</h2>
      <div className="similar-movies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {similarMovies.map(similar => (
          <div key={similar.id} className="movie-card" style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
          }}>
            <img src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`} alt={similar.title} className="movie-card-img" 
              style={{
                width: '100%',
                height: 'auto',
                borderBottom: '1px solid #ddd',
              }} 
            />
            <h3 className="movie-card-title">{similar.title}</h3>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={loadMore} className="load-more-button" style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>Load More</button>
      </div>
    </div>
  ) : null;
}

export default MovieDetails;
