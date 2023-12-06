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

// Similar Movies
export const similarMoviesApi = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
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

// Get the airing today, on the air, popular, top rated, latest TV Series Lists
export const tvSeriesLists = async (seriesType) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${seriesType}?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data.results;
};

// Get list of popular person.
export const popularPerson = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data.results;
};
