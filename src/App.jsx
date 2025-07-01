import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Categories from './pages/Categories';
import MovieDetails from './pages/MovieDetails';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
      </Routes>
    </div>
  );
}

export default App;
