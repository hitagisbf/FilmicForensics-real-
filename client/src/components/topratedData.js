const fetchTopRatedMovies = () => {
  return fetch("http://localhost:3000/toprated")
    .then(res => res.json())
    .then(json => json)
    .catch(error => {
      console.error("Error fetching top-rated movies:", error);
      return []; // Return an empty array in case of error
    });
};

export default fetchTopRatedMovies;
