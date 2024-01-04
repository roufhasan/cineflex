import { useContext, useEffect, useState } from "react";
import { listOfShows } from "../../api/moviesAndShowsApi";
import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";
import { getGenre } from "../../customData/generateGenre";
import PageTitle from "../../components/PageTitle/PageTitle";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { ResetPageContext } from "../../Providers/ResetPageProvider";

const MovieLists = ({ mediaType, apiPath, title }) => {
  const { currentPage, setCurrentPage } = useContext(ResetPageContext);
  const [shows, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  useEffect(() => {
    listOfShows(mediaType, apiPath, currentPage).then((data) => {
      setMovies(data.results);
      setTotalPages(data?.total_pages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [mediaType, apiPath, currentPage]);

  return (
    <Container px="5%">
      <PageTitle title={`${title} | CineFlex`} />
      <section className="pt-20 md:pt-32 pb-12">
        <h2 className="text-2xl font-semibold inline-block">
          {title} <div className="bg-[#ffb43a] w-[45%] h-1 mt-2"></div>
        </h2>
        {/* Card group container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-10 mt-12">
          {shows.map((show) => (
            <div key={show.id}>
              <Link
                to={
                  mediaType === "movie" ? `/movie/${show.id}` : `/tv/${show.id}`
                }
              >
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${
                          show.poster_path
                        }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                      : CardImg
                  }
                  alt={`poster of ${show.title ? show.title : show.name}`}
                  loading="lazy"
                  className="w-full object-fill h-[250px] sm:h-[329px] md:h-[300px] lg:h-[385px] xl:h-[440px] 2xl:h-[470px] hover:scale-105 transition-all duration-500"
                />
              </Link>
              <div className="flex justify-between pt-4">
                <div>
                  <Link
                    to={
                      mediaType === "movie"
                        ? `/movie/${show.id}`
                        : `/tv/${show.id}`
                    }
                    className="font-medium hover:text-[#ffb43a] inline-block transition-all"
                  >
                    <p className="md:hidden">
                      {show.title
                        ? `${
                            show.title.length >= 10
                              ? `${show.title.slice(0, 10)}...`
                              : show.title
                          }`
                        : `${
                            show.name.length >= 10
                              ? `${show.name.slice(0, 10)}...`
                              : show.name
                          }`}
                    </p>
                    <p className="hidden md:inline-block">
                      {show.title
                        ? `${
                            show.title.length >= 20
                              ? `${show.title.slice(0, 20)}...`
                              : show.title
                          }`
                        : `${
                            show.name.length >= 20
                              ? `${show.name.slice(0, 20)}...`
                              : show.name
                          }`}
                    </p>
                  </Link>
                  <p className="text-sm text-white/50 pt-1">
                    {showGenreNames(show.genre_ids)}
                  </p>
                </div>
                {show.vote_average > 0 && (
                  <div className="w-10 h-5 rounded-full bg-custom-orange flex items-center justify-center font-medium text-sm">
                    {show.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination container */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-lg flex items-center gap-2 transition-all hover:text-custom-orange ${
              currentPage === 1 && "text-gray-500 hover:text-gray-500"
            }`}
          >
            <FaArrowLeftLong /> Prev
          </button>
          <p>
            <span className="text-custom-orange text-xl">{currentPage} </span>
            {totalPages > 0 && (
              <span className="text-lg">
                of {totalPages < 500 ? totalPages : 500}
              </span>
            )}
          </p>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || currentPage >= 500}
            className={`text-lg flex items-center gap-2 transition-all hover:text-custom-orange ${
              currentPage === totalPages ||
              (currentPage >= 500 && "text-gray-500 hover:text-gray-500")
            }`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default MovieLists;
