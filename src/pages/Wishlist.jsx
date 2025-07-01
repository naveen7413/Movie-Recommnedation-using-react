import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Ensure styles are imported

function Wishlist() {
  // Retrieve the wishlist from localStorage
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

  // Prevent duplicate movies
  const addToWishlist = (movie) => {
    if (wishlist.find((item) => item.id === movie.id)) {
      alert("This movie is already in your wishlist!");
      return; // Movie already in wishlist, prevent adding again
    }

    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert("Movie added to wishlist!");
  };

  // Handle removal of a movie from wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
  };

  return (
    <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Add some movies!</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((movie) => (
            <div className="wishlist-card" key={movie.id}>
              <div className="wishlist-card-info">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="wishlist-card-img"
                />
                <div className="wishlist-card-details">
                  <h3>{movie.title}</h3>
                  <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                  <p><strong>Release Date:</strong> {movie.release_date}</p>
                  <button onClick={() => removeFromWishlist(movie.id)} className="remove-btn">Remove</button>
                </div>
              </div>
              <Link to={`/movie/${movie.id}`} className="details-link">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
