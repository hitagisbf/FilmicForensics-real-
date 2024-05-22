const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const createReview = async (username, text, movieId) => {
  const reviewQuery = `INSERT INTO finalreview (username, text, movieId) VALUES ($1, $2, $3) RETURNING *;`;
  try {
    const { rows } = await pool.query(reviewQuery, [username, text, movieId]);
    return rows[0];
  } catch (error) {
    console.error('Failed to create review:', error.message);
    console.error('Stack trace:', error.stack); 
    throw error;
  }
};

const getReviewsByMovieId = async (movieId) => {
  const reviewQuery = `SELECT * FROM finalreview WHERE movieId = $1;`;
  try {
    const { rows } = await pool.query(reviewQuery, [movieId]);
    return rows;
  } catch (error) {
    console.error('Failed to fetch reviews:', error.message); 
    console.error('Stack trace:', error.stack); 
    throw error;
  }
};

module.exports = {
  createReview,
  getReviewsByMovieId
};