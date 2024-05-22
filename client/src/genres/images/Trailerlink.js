import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

function Trailerlink(props) {
  const [trailerList, setTrailerList] = useState([]);

  const Trailers = () => {
    let apiUrl =
      props.mediaType === "movie"
        ? `https://api.themoviedb.org/3/movie/${props.mediaId}/videos?api_key=d98b6a4a470bc2415959e8cfff5c445e&language=en-US`
        : `https://api.themoviedb.org/3/tv/${props.mediaId}/videos?api_key=d98b6a4a470bc2415959e8cfff5c445e&language=en-US`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) =>
        setTrailerList(
          //json.results ? (json.results[0] ? json.results[0].key : "-") : "-"
          json.results.filter((item) => item.type === "Trailer")[0].key
        )
      );
  };

  useEffect(() => {
    Trailers();
  }, []);

  return (
    <a href={`https://www.youtube.com/watch?v=${trailerList}`} target="_new">
      <FontAwesomeIcon icon={faPlayCircle} /> Play Trailer
    </a>
  );
}

function returnTrailerYoutubeVideoLink(videoId) {
  //console.log(json?.results[0]?.key);
  //let youtubeKey = "29zQBzteAh0";
  //let youtubeKey = json.results[0].key;
  return;
}

export default Trailerlink;
