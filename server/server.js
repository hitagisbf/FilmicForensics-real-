require('dotenv').config();

const express = require('express'); 
const cors = require('cors'); 
const https = require('https');
const { createReview, getReviewsByMovieId } = require('./ReviewModel'); 

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.post('/reviews', async (req, res) => {
  const { username, text, movieId } = req.body; 
  console.log('Request body:', req.body); 
  try {
    const review = await createReview(username, text, movieId);
    res.status(201).json(review);
  } catch (error) {
    console.error('Failed to create review:', error.message);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

app.get('/reviews/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await getReviewsByMovieId(movieId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// New endpoint for trending movies
app.get('/trending', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${tmdbApiKey}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.results);
      } catch (error) {
        console.error('Failed to parse trending movies data:', error.message);
        res.status(500).json({ error: 'Failed to parse trending movies data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch trending movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  });
});

// New endpoint for top-rated movies
app.get('/toprated', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.results);
      } catch (error) {
        console.error('Failed to parse top-rated movies data:', error.message);
        res.status(500).json({ error: 'Failed to parse top-rated movies data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch top-rated movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch top-rated movies' });
  });
});

// New endpoint for movie details
app.get('/movie/:id', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData);
      } catch (error) {
        console.error('Failed to parse movie details:', error.message);
        res.status(500).json({ error: 'Failed to parse movie details' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  });
});

// New endpoint for movie reviews
app.get('/movie/:id/reviews', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${tmdbApiKey}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.results);
      } catch (error) {
        console.error('Failed to parse movie reviews:', error.message);
        res.status(500).json({ error: 'Failed to parse movie reviews' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch movie reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie reviews' });
  });
});

// New endpoint for movie genres
app.get('/genres', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.genres);
      } catch (error) {
        console.error('Failed to parse genres data:', error.message);
        res.status(500).json({ error: 'Failed to parse genres data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch genres:', error.message);
    res.status(500).json({ error: 'Failed to fetch genres' });
  });
});

// New endpoint for movies by genre
app.get('/movies/genre/:gid', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const { gid } = req.params;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&page=1&with_genres=${gid}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.results);
      } catch (error) {
        console.error('Failed to parse movies by genre data:', error.message);
        res.status(500).json({ error: 'Failed to parse movies by genre data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch movies by genre:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  });
});

// New endpoint for movie search
app.get('/search', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${query}&include_adult=false&language=en-US&page=1`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData.results);
      } catch (error) {
        console.error('Failed to parse search results data:', error.message);
        res.status(500).json({ error: 'Failed to parse search results data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch search results:', error.message);
    res.status(500).json({ error: 'Failed to fetch search results' });
  });
});

// New endpoint for trailers
app.get('/trailer/:mediaType/:mediaId', (req, res) => {
  const tmdbApiKey = process.env.MOVIEAPIKEY;
  const { mediaType, mediaId } = req.params;
  const url =
    mediaType === "movie"
      ? `https://api.themoviedb.org/3/movie/${mediaId}/videos?api_key=${tmdbApiKey}&language=en-US`
      : `https://api.themoviedb.org/3/tv/${mediaId}/videos?api_key=${tmdbApiKey}&language=en-US`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const trailer = parsedData.results.find((item) => item.type === "Trailer");
        if (trailer) {
          res.status(200).json({ key: trailer.key });
        } else {
          res.status(404).json({ error: 'Trailer not found' });
        }
      } catch (error) {
        console.error('Failed to parse trailer data:', error.message);
        res.status(500).json({ error: 'Failed to parse trailer data' });
      }
    });
  }).on('error', (error) => {
    console.error('Failed to fetch trailer:', error.message);
    res.status(500).json({ error: 'Failed to fetch trailer' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
