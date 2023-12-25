// Search Movies/TV-Shows/Person/All

export const searchApi = async (category, query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${category}?query=${query}&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );
  const data = await res.json();
  return data.results;
};
