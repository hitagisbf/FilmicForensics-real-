import React, { useEffect, useState } from 'react';
import './MovieReviews.css'; // Import the CSS file for styles
import ReviewForm from './ReviewForm'; // Import the ReviewForm component
import { useParams } from 'react-router-dom';

// review box
const UserReview = ({ review }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const content = review.content || review.text || ''; // Ensure we have a valid content field
  const author = review.author || review.username || 'Anonymous'; // Ensure we have a valid author field

  return (
    <div className="user-review">
      <h3 style={{ color: 'white' }}>{author}</h3>
      <p style={{ color: 'white' }}>
        {showFullContent ? content : `${content.slice(0, 500)}...`}
        {content.length > 500 && (
          <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleContent}>
            {showFullContent ? " See less" : " See more"}
          </span>
        )}
      </p>
    </div>
  );
};

const MovieReviews = () => {
  const [apiReviews, setApiReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle review form display
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Number of reviews to display per page
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details from backend
    fetch(`http://localhost:3000/movie/${id}`)
      .then(response => response.json())
      .then(data => {
        // Set the retrieved movie details to the state
        setMovie(data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });

    // Fetch movie reviews from backend
    fetch(`http://localhost:3000/movie/${id}/reviews`)
      .then(response => response.json())
      .then(data => {
        // Set the retrieved reviews to the state
        setApiReviews(data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });

    // Fetch user reviews from backend
    fetch(`http://localhost:3000/reviews/${id}`)
      .then(response => response.json())
      .then(data => {
        // Set the retrieved user reviews to the state
        setUserReviews(data);
      })
      .catch(error => {
        console.error('Error fetching user reviews:', error);
      });
  }, [id]);

  // Function to open the review form popup
  const openReviewForm = () => {
    setShowReviewForm(true);
  };

  // Function to close the review form popup
  const closeReviewForm = () => {
    setShowReviewForm(false);
  };

  // Pagination:
  const totalPages = Math.ceil((apiReviews.length + userReviews.length) / reviewsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const mergedReviews = [...userReviews, ...apiReviews];

  return (
    <div className="reviewsContainer">
      <div className="banner">
        {movie && movie.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
        )}
        {movie && <h2>{movie.title}</h2>}
      </div>
      <div className="review-link">
        {/* Toggle the review form visibility when the link or heart icon is clicked */}
      </div>
      {showReviewForm && <ReviewForm onClose={closeReviewForm} />}
      <div className="UserReviews">
        <h2>Reviews</h2>
        <button className="trailer-button" onClick={openReviewForm}>
          <h3 onClick={openReviewForm}>+</h3>
        </button>
        <div className="user-reviews-container">
          {mergedReviews.length > 0 ? (
            mergedReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage).map((review, index) => (
              <UserReview key={index} review={review} />
            ))
          ) : (
            <p style={{ color: 'white' }}>No reviews available.</p>
          )}
        </div>
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>&laquo; Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next &raquo;</button>
      </div>
    </div>
  );
};

export default MovieReviews;
