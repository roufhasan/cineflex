// Get movie lists of now playing, popular, top rated, upcoming.
export const movieLists = async (movieType) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieType}?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();

  return data.results;
};

// Get the trending movies, TV shows and people.
export const trendingLists = async (trendingType, time_window) => {
  const url = `https://api.themoviedb.org/3/trending/${
    trendingType ? trendingType : "movie"
  }/${time_window ? time_window : "day"}?&api_key=${
    import.meta.env.VITE_API_KEY
  }`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results;
};
