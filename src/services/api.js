import axios from 'axios';

const fetchMovies = async (endpoint, params = {}) => {
  const url = `https://api.themoviedb.org/3${endpoint}`;

  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjk4NWQwNWNkODcwYjY1NmU4MzNjNGNjYmQxZTFlOCIsIm5iZiI6MTc0NDc0NDgwNS4zNDUsInN1YiI6IjY3ZmViMTY1NDM3ZjBiODBlZWFkNDgwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O1c6zKpb8SCvxwW1tJpefQCiT6IjMqChhA4ByBU5DNs',
    },
    params: { language: 'en-US', ...params },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviesTrend = page => {
  return fetchMovies('/trending/movie/day', { page });
};

export const fetchMovieByKeyWord = (query, page = 1) => {
  return fetchMovies('/search/movie', { query, page });
};

export const fetchMovieById = movie_id => {
  return fetchMovies(`/movie/${movie_id}`);
};

export const fetchMovieByIdCast = movie_id => {
  return fetchMovies(`/movie/${movie_id}/credits`);
};

export const fetchMovieByIdReviews = movie_id => {
  return fetchMovies(`/movie/${movie_id}/reviews`);
};
