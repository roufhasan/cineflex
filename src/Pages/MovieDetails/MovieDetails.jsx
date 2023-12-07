import { useLoaderData } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { FaPlay, FaPlus, FaRegCalendar, FaStar } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { useEffect, useState } from "react";
import { similarMoviesApi } from "../../api/api";
import Slider from "../../components/Slider/Slider";
import AvatarImg from "../../assets/avatar.png";
import CardImg from "../../assets/movie-card.jpg";

const MovieDetails = () => {
  const {
    backdrop_path,
    credits,
    genres,
    id,
    original_title,
    overview,
    poster_path,
    release_date,
    runtime,
    status,
    vote_average,
  } = useLoaderData();
  const [similarMovies, setSimilarMovies] = useState([]);

  const runtimeConvert = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useEffect(() => {
    if (id) {
      similarMoviesApi(id).then((data) => setSimilarMovies(data));
    }
  }, [id]);

  return (
    <section>
      <div
        style={{
          background: `linear-gradient(to left,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),url(${`https://image.tmdb.org/t/p/w500${backdrop_path}?api_key=${
            import.meta.env.VITE_API_KEY
          }`}) center/cover no-repeat`,
        }}
        className="min-h-[91vh] flex items-center"
      >
        <div className="py-12 w-full backdrop-blur-3xl min-h-[91vh]">
          <Container px="5%">
            <div className="md:flex gap-10">
              {/* Movie Poster */}
              <div className="md:w-1/4">
                <div className="w-full max-w-sm rounded-md">
                  <div className="relative group">
                    <img
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w500${poster_path}`
                          : CardImg
                      }
                      alt=""
                      className="w-full rounded-md"
                    />
                    <div className="hidden absolute top-0 left-0 w-full h-full group-hover:grid place-items-center bg-gradient-to-b from-black/30 to-black/50">
                      <button className="w-14 h-14 grid place-items-center rounded-full bg-white/30">
                        <FaPlay size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="md:w-3/4">
                <div className="flex justify-between flex-1 gap-3">
                  <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mt-10">
                    {original_title}
                    <span className="text-sm text-white/50 font-normal border border-white/50 rounded px-[4px] py-[1px]">
                      {release_date.slice(0, 4)}
                    </span>
                  </h2>
                  <p className="hidden md:flex items-center gap-2">
                    <FaStar size={24} color="#f6ca2a" />
                    <span className="text-white/50">
                      <span className="text-xl text-white font-semibold">
                        {vote_average.toFixed(1)}
                      </span>
                      /10
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 my-4">
                  {genres.map((genre) => (
                    <p
                      key={genre.id}
                      className="text-sm text-white/80 border rounded-xl px-3 cursor-pointer hover:bg-white/10"
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-8 md:mt-4 mb-8">
                  <p className="flex items-center gap-2 md:hidden">
                    <FaStar size={18} color="#f6ca2a" />
                    <span className="text-white/50">
                      <span className="text-white font-semibold">
                        {vote_average && vote_average.toFixed(1)}
                      </span>
                      /10
                    </span>
                  </p>
                  <p>
                    Status: <span className="text-white/50">{status}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRegCalendar size={17} />
                    <span className="text-white/50">{release_date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <LuClock size={18} />
                    <span className="text-white/50">
                      {runtimeConvert(runtime)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xl mb-2">Overview</p>
                  <p className="text-white/50">{overview}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button className="flex items-center gap-x-1 bg-[#f98606] px-6 py-3 rounded-md font-medium uppercase text-sm">
                    <FaPlay></FaPlay>play trailer
                  </button>
                  <button className="bg-black/40 border-2 px-6 py-3 rounded-md font-medium flex items-center gap-x-1 uppercase text-sm">
                    <FaPlus /> Watchlist
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container px="5%">
        {/* <==*** Cast Section ***==> */}
        <div className="py-14">
          <p className="text-xl md:text-3xl font-bold border-l-4 border-[#f98606] pl-3 mb-8">
            Top Cast
          </p>
          <div className="grid place-items-start grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {credits.cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${
                          actor.profile_path
                        }?api_key=${import.meta.env.VITE_API_KEY}`
                      : AvatarImg
                  }
                  alt=""
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  loading="lazy"
                />
                <p className="text-lg font-semibold mt-4">
                  {actor.original_name}
                </p>
                <p className="text-sm text-white/90">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <==*** Simliar Movies Slider Section ***==> */}
        <div>
          <p className="text-xl md:text-3xl font-bold border-l-4 border-[#f98606] pl-3 mb-8">
            Similar Movies
          </p>
          <Slider sliderData={similarMovies} />
        </div>
      </Container>
    </section>
  );
};

export default MovieDetails;
