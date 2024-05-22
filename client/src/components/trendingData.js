const fetchTrendingMovies = () => {
  return fetch("http://localhost:3000/trending")
    .then(res => res.json())
    .then(json => json)
    .catch(error => {
      console.error("Error fetching trending movies:", error);
      return []; // Return an empty array in case of error
    });
};

export default fetchTrendingMovies;


