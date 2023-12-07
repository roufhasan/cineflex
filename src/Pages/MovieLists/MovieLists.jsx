import { useEffect, useState } from "react";
import { movieLists } from "../../api/api";
import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";
import { getGenre } from "../../customData/generateGenre";

const MovieLists = ({ apiPath, title }) => {
  const [movies, setMovies] = useState([]);

  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  useEffect(() => {
    movieLists(apiPath).then((data) => setMovies(data));
  }, [apiPath]);
  console.log(movies);
  return (
    <Container px="5%">
      <section className="py-12">
        <h2 className="text-2xl font-semibold inline-block">
          {title} <div className="bg-[#f98606] w-[45%] h-1 mt-2"></div>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-10 mt-12">
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${
                          movie.poster_path
                        }?api_key=${import.meta.env.VITE_API_KEY}`
                      : CardImg
                  }
                  alt={`${movie?.original_title} movie poster`}
                  loading="lazy"
                  className="w-full hover:scale-105 transition-all duration-500"
                />
              </Link>
              <Link
                to={`/movie/${movie.id}`}
                className="pt-4 font-medium hover:text-[#f98606] inline-block transition-all"
              >
                {movie.original_title}
              </Link>
              <p className="text-sm text-white/50 pt-1">
                {showGenreNames(movie.genre_ids)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default MovieLists;
