import React, { useEffect, useState } from "react";
import "./Genres.css";

function Genres() {
  const [genreList, setGenreList] = useState([]);

  const fetchGenres = () => {
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((json) => setGenreList(json))
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  let calcImage = "Gienres";

  return (
    <div className="app">
      <div className="page">
        <div className="page-title">Genres</div>
        <div>
          {genreList.map((item) => (
            <div className="genre-card" key={item.id}>
              <a href={`./MoviesGenre/${item.id}`}>
                <img src={returnImage(item.name, calcImage)} alt={item.name} />
                <div className="genre-name">{item.name} </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="not-sure">Not Sure?</div>
      <div className="quiz-button">
        <a href="/Quiz">Take this Quiz</a>
      </div>
    </div>
  );
}

function returnImage(gname, defaultImg) {
  let m;
  try {
    m = require("./images/" + gname + ".jpeg");
    // do stuff
  } catch (ex) {
    m = require("./images/" + defaultImg + ".jpeg");
  }

  return m;
}

export default Genres;
