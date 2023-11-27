export const apiFetch = async (movieType) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieType}?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data.results;
};
