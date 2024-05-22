import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke, faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import "./Ratings.css";

const Ratings = ({ val }) => {
  const starRating = (parseFloat(val) / 10) * 5;

  const numFullStars = Math.floor(starRating);
  const numHalfStars = starRating - numFullStars > 0 ? 1 : 0;
  const numEmptyStars = 5 - (numFullStars + numHalfStars);

  const starArray = [];
  for (let i = 0; i < numFullStars; i++) {
    starArray.push(<FontAwesomeIcon key={`full-${i}`} icon={faStarFull} className="icon" />);
  }
  for (let i = 0; i < numHalfStars; i++) {
    starArray.push(<FontAwesomeIcon key={`half-${i}`} icon={faStarHalfStroke} className="icon" />);
  }
  for (let i = 0; i < numEmptyStars; i++) {
    starArray.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="icon" />);
  }

  return <div>{starArray}</div>;
};

export default Ratings;
