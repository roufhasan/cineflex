import { allGenresData } from "./allGenresData";

export const getGenre = (ids) => {
  const genreIds = ids.slice(0, 2);

  const getGenreNames = (genreIds, allGenresData) => {
    const genreNames = [];

    for (const genreId of genreIds) {
      const genre = allGenresData.find((item) => item.id === genreId);
      if (genre) {
        genreNames.push(genre.name);
      } else {
        console.error(`Genre with ID ${genreId} not found.`);
      }
    }
    return genreNames;
  };

  return getGenreNames(genreIds, allGenresData);
};
