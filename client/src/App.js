import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './testshahir/homepage';
import StandardCarousel from './testshahir/StandardCarousel';
import MovieReviews from './brit/MovieReviews';
import ReviewForm from './brit/ReviewForm';
import TrendMovie from './components/Movie';
import TRated from './components/TopRated';
import Footer from './footer/Footer';
import Search from './searchbar/Search';
import Header from './eheader/Header';
import Genres from './genres/Genres';
import MoviesGenre from './genres/MovieGenre';
import Quiz from './Quiz/quiz';
function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/carousel" element={<StandardCarousel />} />
          <Route path="/reviews" element={<MovieReviews />} />
          <Route path="/reviewform" element={<ReviewForm />} />
          <Route path="/Trending" element={<TrendMovie />} />
          <Route path="/Best-Rated" element={<TRated />} />
          <Route path="/movie/:id" element={<MovieReviews />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MoviesGenre/:gid" element={<MoviesGenre />} />
          <Route path="/Genres" element={<Genres />} />
          <Route path="/Quiz" element={<Quiz/ >} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
