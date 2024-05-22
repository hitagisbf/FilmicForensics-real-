import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import './Standardcarousel.css';
import { Link } from 'react-router-dom';
import Ratings from "./Ratings";
import Trailerlink from "./Trailerlink";

const StandardCarousel = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/trending");
      const json = await response.json();
      setMovieList(json);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
    >
      {movieList.map((item) => (
        <Link key={item.id} to={`/movie/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt={item.original_title ? item.original_title : item.name}
            />
            <div className="oomovie-info">
              <p className="movie-title">
                {item.original_title ? item.original_title : item.name}
              </p>
              <p className="oomovie-desc">{item.overview}</p>

              <Ratings val={item.vote_average} />

              <div className="oomovie-action">
                <span className="oomovie-play" onClick={(e) => e.stopPropagation()}>
                  <Trailerlink mediaId={item.id} mediaType={item.media_type} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

export default StandardCarousel;
