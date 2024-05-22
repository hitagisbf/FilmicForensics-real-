import React, { useEffect, useState } from 'react';
import fetchTrendingMovies from './trendingData';
import { Link } from 'react-router-dom';
import './styling.css'
const TrendMovie = () => {
  const [movieList, setTrendingList] = useState([]);
  
  useEffect(() => {
    fetchTrendingMovies().then(data =>{
      setTrendingList(data);
    });
  }, []);

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
    <div style={{ backgroundColor: '#1E0D1E', padding: '1px' }}>
      <div className='sspheader'>Trending</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movieList.map((media, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block'}}>
            <Link to={`/${media.media_type === 'movie' ? 'movie' : 'tv'}/${media.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img className='ssarray'
                id={`trend_image_${index}`}            
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt = "Movie Poster"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              />
            </Link>
            <div id={`rectangle_${index}`} className='ssinfo'>
              <h2 style={{ color: 'white', marginTop: '15px', marginBottom: '0px' }}>{media.title || media.name} </h2>
              <h3 style={{ color: 'white', marginTop: '0px', margin: '3px'}}>
                {media.vote_average ? `${String(media.vote_average).substring(0, 3)}/10` : ''}
              </h3>
              <p style={{ color: 'white', marginTop: '5px' }}>
                {media.overview && media.overview.length > 300 ? `${media.overview.substring(0, 300)}...` : media.overview}</p>
            </div>
          </div>
        ))}
        </div>
        <p style={{ color: 'white' }}>Courtesy of TMDb</p>
      </div>
    );
  };
  

export default TrendMovie;