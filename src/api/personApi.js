// Get list of popular persons
export const popularPersons = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data.results;
};

// Get external social id links for a person
export const externalIds = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data;
};

// Get person photos
export const getPhotos = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return data.profiles;
};

// Get Movies/TV-Shows/All credits of a person
export const getCredits = async (id, apiPath) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/${
      apiPath ? apiPath : "combined_credits"
    }?api_key=${import.meta.env.VITE_API_KEY}`
  );
  const data = await res.json();
  return data.cast;
};
