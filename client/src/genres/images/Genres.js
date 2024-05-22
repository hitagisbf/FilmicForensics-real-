import React, { useEffect, useState } from "react";

import "./Genres.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Gienres from "../images/Gienres.jpeg";

function Genres() {
  const [genreList, setGenreList] = useState([]);

  const AllGenres = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d98b6a4a470bc2415959e8cfff5c445e"
    )
      .then((res) => res.json())
      .then((json) => setGenreList(json.genres));
  };

  useEffect(() => {
    AllGenres();
  }, []);

  let calcImage = "Gienres";

  return (
    <body className="app">
      <Header tasteProfileOn="false" />
      <div class="page">
        <div class="page-title">Genres</div>
        <div>
          {genreList.map((item) => (
            <div class="genre-card">
              <a href={`./MoviesGenre/${item.id}`}>
                <img src={returnImage(item.name, calcImage)} />
                <div class="genre-name">{item.name} </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div class="not-sure">Not Sure?</div>
      <div class="quiz-button">
        {" "}
        <a href="./."> Take this Quiz </a>
      </div>
      <Footer />
    </body>
  );
}

function returnImage(gname, defaultImg) {
  let m;
  try {
    m = require("../images/" + gname + ".jpeg");
    // do stuff
  } catch (ex) {
    m = require("../images/" + defaultImg + ".jpeg");
  }

  return m;
}

export default Genres;
