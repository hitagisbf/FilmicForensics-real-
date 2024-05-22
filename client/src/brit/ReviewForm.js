import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = ({ onClose }) => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the review data, including the movie ID
    const reviewData = {
      username: username,
      text: text,
      movieId: id // Add the movie ID to the review data
    };

    // POST request to the server
    fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Review submitted successfully!');
      console.log('Submission data:', data); // Logging the response to see what the server returns

      // Reset form fields after submission
      setUsername('');
      setText('');
      // Close the popup
      onClose();
    })
    .catch(error => {
      alert('Failed to submit review');
      console.error('Error submitting review:', error);
    });
  };

  return (
    <div className="review-form-wrapper">
      <div className="review-overlay" onClick={onClose}></div> {/* Overlay to close the form */}
      <div className="review-form-popup">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label className="headline-label">
            Your Review
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter your username..."
            />
          </label>
          <label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              required
              placeholder="Write your review here..."
            ></textarea>
          </label>
          <button type="submit" className="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
