/* 
===========
Movie API's
===========
*/

// Similar Movies
export const similarMoviesApi = async (id, name) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${
      name ? "tv" : "movie"
    }/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

/* 
=======================
Movies & Tv-Shows API's
=======================
*/

// Get movie lists of now playing, popular, top rated, upcoming & also tv series list of popular, top rated, airing today, on the air.
export const listOfShows = async (mediaType, apiPath) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${apiPath}?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();

  return data.results;
};

/* 
========================================
Movies,Tv-Shows & Persons Combined API's
========================================
*/

// Get trending Movies, Tv-Shows and Peoples
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
