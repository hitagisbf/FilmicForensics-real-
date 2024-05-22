import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./MovieGenre.css";
import { useParams } from "react-router-dom";

function MoviesGenre(_props) {
  const [genreList, setGenreList] = useState([]);
  const { gid } = useParams();

  const fetchMoviesByGenre = () => {
    fetch(`http://localhost:3000/movies/genre/${gid}`)
      .then((res) => res.json())
      .then((json) => setGenreList(json))
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
      });
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, [gid]);

  return (
    <div className="app">
      <div className="page">
        <div className="page-title"></div>
        <div>
          {genreList.map((item) => (
            <div className="movgenre-card" key={item.id}>
              <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={`${item.original_title ? item.original_title : item.name}`}
                />
              </Link>

              <div className="movgenre-name">
                {item.original_title ? item.original_title : item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="not-sure">Not Sure?</div>
      <div className="quiz-button">
        <a href="./."> Take this Quiz </a>
      </div>
    </div>
  );
}

export default MoviesGenre;