import React, { useState } from "react";
import "./Search.css";
import "../components/styling.css";
import { Link } from 'react-router-dom';

function Search() {
  const [inputdata, setInputdata] = useState("");
  const [movieList, setMovieList] = useState([]);

  const fetchData = (value) => {
    fetch(`http://localhost:3000/search?query=${value}`)
      .then((response) => response.json())
      .then((json) => {
        setMovieList(json);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleChange = (value) => {
    setInputdata(value);
    fetchData(value);
  };

  const handleMouseEnter = (index) => {
    const trend_image = document.getElementById(`trend_image_${index}`);
    const rectangle = document.getElementById(`rectangle_${index}`);
    if (trend_image && rectangle) {
      trend_image.style.transform = "scale(1.05)"; // Enlarge by 5%
      rectangle.style.opacity = 1; // Show rectangle
    }
  };

  const handleMouseLeave = (index) => {
    const trend_image = document.getElementById(`trend_image_${index}`);
    const rectangle = document.getElementById(`rectangle_${index}`);
    if (trend_image && rectangle) {
      trend_image.style.transform = "scale(1)"; // Restore original size
      rectangle.style.opacity = 0; // Hide rectangle
    }
  };

  return (
    <div className="app">
      <div className="page">
        <div className="search-box">
          <input
            type="text"
            name="criteria"
            placeholder="Search for movies"
            onChange={(e) => handleChange(e.target.value)}
            value={inputdata} // This will use the inputdata state
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {movieList.map((movie, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  className="ssarray"
                  id={`trend_image_${index}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  alt={movie.title || movie.name}
                />
              </Link>

              <div id={`rectangle_${index}`} className="ssinfo">
                <h2
                  style={{
                    color: "white",
                    marginTop: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {movie.title || movie.name}
                </h2>

                <p style={{ color: "white", marginTop: "5px" }}>
                  {movie.overview && movie.overview.length > 300
                    ? `${movie.overview.substring(0, 300)}...`
                    : movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
