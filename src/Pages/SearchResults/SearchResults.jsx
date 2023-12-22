import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import { Link, useParams } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";
import { getGenre } from "../../customData/generateGenre";
import { search } from "../../api/api";

const SearchResults = () => {
  const { category, query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  useEffect(() => {
    search(category, query).then((data) => setSearchResults(data));
  }, [category, query]);

  return (
    <Container px="5%">
      <section className="pt-20 md:pt-32 pb-12">
        <h2 className="text-2xl font-semibold inline-block">
          Results For <span className="capitalize">{`"${query}"`}</span>
          <div className="bg-[#ffb43a] w-[45%] h-1 mt-2"></div>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-10 mt-12">
          {searchResults.map((result) => (
            <div key={result.id}>
              <Link
                to={
                  (category === "movie" && `/movie/${result.id}`) ||
                  (category === "tv" && `/tv/${result.id}`) ||
                  (category === "person" && `/person/${result.id}`) ||
                  (category === "multi" &&
                    result.media_type === "movie" &&
                    `/movie/${result.id}`) ||
                  (category === "multi" &&
                    result.media_type === "tv" &&
                    `/tv/${result.id}`) ||
                  (category === "multi" &&
                    result.media_type === "person" &&
                    `/person/${result.id}`)
                }
              >
                <img
                  src={
                    result.poster_path || result.profile_path
                      ? `https://image.tmdb.org/t/p/w500${
                          result?.poster_path || result?.profile_path
                        }?api_key=${import.meta.env.VITE_API_KEY}`
                      : CardImg
                  }
                  alt={`poster of ${result.title ? result.title : result.name}`}
                  loading="lazy"
                  className="w-full object-fill h-[250px] sm:h-[329px] md:h-[300px] lg:h-[385px] xl:h-[440px] 2xl:h-[470px] hover:scale-105 transition-all duration-500"
                />
              </Link>
              <div className="flex justify-between pt-4">
                <div>
                  <Link
                    to={"/"}
                    className="font-medium hover:text-[#ffb43a] inline-block transition-all"
                  >
                    <p className="md:hidden">
                      {result.title
                        ? `${
                            result.title.length >= 10
                              ? `${result.title.slice(0, 10)}...`
                              : result.title
                          }`
                        : `${
                            result.name.length >= 10
                              ? `${result.name.slice(0, 10)}...`
                              : result.name
                          }`}
                    </p>
                    <p className="hidden md:inline-block">
                      {result.title
                        ? `${
                            result.title.length >= 20
                              ? `${result.title.slice(0, 20)}...`
                              : result.title
                          }`
                        : `${
                            result.name.length >= 20
                              ? `${result.name.slice(0, 20)}...`
                              : result.name
                          }`}
                    </p>
                  </Link>
                  <p className="text-sm text-white/50 pt-1">
                    {result.genreIds && showGenreNames(result.genre_ids)}
                  </p>
                </div>
                {result.vote_average > 0 && (
                  <div className="w-10 h-5 rounded-full bg-custom-orange flex items-center justify-center font-medium text-sm">
                    {result.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default SearchResults;
