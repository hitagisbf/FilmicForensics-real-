import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const Trailerlink = ({ mediaId, mediaType }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailer = async () => {
    try {
      const response = await fetch(`http://localhost:3000/trailer/${mediaType}/${mediaId}`);
      const json = await response.json();

      if (json.key) {
        setTrailerKey(json.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [mediaId, mediaType]);

  return (
    trailerKey ? (
      <a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faPlayCircle} aria-label="Play Trailer" /> Play Trailer
      </a>
    ) : (
      <span>No Trailer Available</span>
    )
  );
};

export default Trailerlink;
