import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const addToWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = [...storedWishlist, movie];
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert(`${movie.title} added to wishlist!`);
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      </Link>
      <h3>{movie.title}</h3>
      <button onClick={addToWishlist}>Add to Wishlist</button>
    </div>
  );
}

export default MovieCard;
