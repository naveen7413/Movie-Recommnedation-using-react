import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const API_KEY = '4f274059f1ea723ba6ba81662cef48fc';

function Recommendation() {
  const [mood, setMood] = useState('');
  const [userInput, setUserInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || [] // Get wishlist from localStorage on load
  );

  // Mapping moods to responses (AI-driven text)
  const moodsToResponses = {
    happy: "It seems like you're in a great mood! Let's keep that vibe going with a fun movie selection!",
    sad: "Feeling a bit down? Let me help you find something to lift your spirits.",
    excited: "Excited? Let's bring that energy to some high-octane movies!",
    romantic: "Looking for a love story? Let me set the mood with some romantic flicks.",
    mysterious: "Got a curious mind? Let's dive into some thrilling mysteries.",
    adventurous: "Ready for an adventure? Let me take you on a wild ride with some exciting films!",
    thrilling: "You're in for a thrill ride! Let's get the heart racing with some intense thrillers.",
    horror: "Feeling brave? Let's dive into some spine-chilling horror movies!",
    scary: "Let's find something that'll keep you on the edge of your seat!",
  };

  const genresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
    { id: 53, name: "Thriller" },
    { id: 9648, name: "Mystery" },
  ];

  const languagesList = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'hi', name: 'Hindi' },
  ];

  // Fetch movie recommendations based on genre and language
  const fetchMovies = async (reset = false) => {
    if (!genre) {
      setError('Please select a genre to get recommendations.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genreId = genre;
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=${language}&page=${reset ? 1 : page}`
      );

      setMovies(reset ? response.data.results : [...movies, ...response.data.results]);
      setPage(reset ? 2 : page + 1);
    } catch (err) {
      setError('Failed to load movies. Try again later.');
    }
    setLoading(false);
  };

  // Handle mood change (AI-driven response only, no impact on movie recommendations)
  const handleMoodChange = (e) => {
    const selectedMood = e.target.value;
    setMood(selectedMood);
    setAiResponse(moodsToResponses[selectedMood] || ''); // AI-generated text for mood
  };

  // Function to get random 2-3 priority movies (based on genre and language)
  const getRandomPriorityMovies = (movies) => {
    const shuffledMovies = movies.sort(() => 0.5 - Math.random()); // Shuffle the movie list
    return shuffledMovies.slice(0, 3); // Select top 2-3 movies randomly
  };

  // Add to Wishlist functionality
  const addToWishlist = (movie) => {
    // Prevent duplicate movies in the wishlist
    if (!wishlist.some((m) => m.id === movie.id)) {
      const newWishlist = [...wishlist, movie];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist)); // Save to localStorage
    }
  };

  useEffect(() => {
    // If wishlist is updated, store it in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-heading">Find Your Perfect Movie</h2>

      {/* Mood Selection and AI Response */}
      <div className="filters-container">
        <select
          onChange={handleMoodChange}
          value={mood}
          className="filter-select"
        >
          <option value="">Select a Mood</option>
          {Object.keys(moodsToResponses).map((mood) => (
            <option key={mood} value={mood}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </option>
          ))}
        </select>
        {aiResponse && <p className="ai-response">{aiResponse}</p>}
      </div>

      {/* Genre and Language Selection */}
      {mood && (
        <div className="filters-container">
          <select
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            className="filter-select"
          >
            <option value="">Select a Genre</option>
            {genresList.map((genreOption) => (
              <option key={genreOption.id} value={genreOption.id}>
                {genreOption.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="filter-select"
          >
            <option value="">Select a Language</option>
            {languagesList.map((languageOption) => (
              <option key={languageOption.code} value={languageOption.code}>
                {languageOption.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Recommendation Button */}
      {mood && genre && (
        <button onClick={() => fetchMovies(true)} className="recommend-btn">
          Get Recommendations
        </button>
      )}

      {error && <p className="error-msg">{error}</p>}

      {/* Display "We recommend you to watch this" with 2-3 random priority movies */}
      {movies.length > 0 && (
        <div className="movie-list">
          <h3>We Recommend You to Watch These!</h3>
          {getRandomPriorityMovies(movies).map((movie) => (
            <div key={movie.id} className="movie-card priority-movie">
              <img
                className="movie-card-img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-card-content">
                <h3>{movie.title}</h3>
                <p>
                  <strong>Rating:</strong> ⭐ {movie.vote_average}/10
                </p>
                {/* Add to Wishlist */}
                <button
                  onClick={() => addToWishlist(movie)}
                  className="add-btn"
                >
                  Add to Wishlist
                </button>
                <Link to={`/movie/${movie.id}`} className="details-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All other recommended movies */}
      <div className="movie-list">
        {movies.slice(3).map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              className="movie-card-img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-card-content">
              <h3>{movie.title}</h3>
              <p>
                <strong>Rating:</strong> ⭐ {movie.vote_average}/10
              </p>
              {/* Add to Wishlist */}
              <button
                onClick={() => addToWishlist(movie)}
                className="add-btn"
              >
                Add to Wishlist
              </button>
              <Link to={`/movie/${movie.id}`} className="details-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {movies.length > 0 && !loading && (
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchMovies();
          }}
          className="load-more"
        >
          Load More
        </button>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Recommendation;
