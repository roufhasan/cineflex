import { Link, useLoaderData } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { FaPlay, FaPlus, FaRegCalendar, FaStar } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { PiTelevision } from "react-icons/pi";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { similarMoviesApi } from "../../api/api";
import Slider from "../../components/Slider/Slider";
import AvatarImg from "../../assets/avatar.png";
import CardImg from "../../assets/movie-card.jpg";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const movies = useLoaderData();
  const {
    backdrop_path,
    credits,
    first_air_date,
    genres,
    id,
    name,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    seasons,
    status,
    videos,
    vote_average,
  } = movies;

  const [similarMovies, setSimilarMovies] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [officialTrailer, setOfficialTrailer] = useState("");

  const runtimeConvert = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const findOfficialTrailer = () => {
    const trailer = videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const anyTrailer = videos.results[0];

    if (trailer) {
      setOfficialTrailer(trailer);
    } else {
      setOfficialTrailer(anyTrailer);
    }

    setPlayTrailer(true);
  };

  useEffect(() => {
    if (id) {
      similarMoviesApi(id, name).then((data) => setSimilarMovies(data));
    }
  }, [id, name]);

  return (
    <Container>
      <div
        style={{
          background: `linear-gradient(to left,rgba(22,24,29,0.8), rgba(22,24,29,0.4)),url(${`https://image.tmdb.org/t/p/w200${backdrop_path}?api_key=${
            import.meta.env.VITE_API_KEY
          }`}) center/cover no-repeat`,
        }}
        className="h-full md:h-[96vh] md:max-h-[1080px] flex items-center"
      >
        <div className="pt-20 md:pt-32 pb-12 w-full max-w-[1920px] mx-auto backdrop-blur-3xl md:max-h-[1080px] h-full relative">
          <Container px="5%">
            <div className="md:flex gap-10">
              {/* Movie Poster */}
              <div className="md:w-1/4">
                <div className="w-full max-w-sm rounded-md">
                  <div className="relative group">
                    <img
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w400${poster_path}`
                          : CardImg
                      }
                      alt=""
                      className="w-full rounded-md"
                    />
                    {videos.results && videos.results.length > 0 && (
                      <div className="hidden absolute top-0 left-0 w-full h-full group-hover:grid place-items-center bg-gradient-to-b from-black/30 to-black/50">
                        <button
                          onClick={findOfficialTrailer}
                          className="w-14 h-14 grid place-items-center rounded-full bg-white/30"
                        >
                          <FaPlay size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="md:w-3/4">
                <div className="flex justify-between flex-1 gap-3">
                  <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mt-10">
                    {title ? title : name}
                    <span className="text-sm text-white/50 font-normal border border-white/50 rounded px-[4px] py-[1px]">
                      {release_date
                        ? release_date.slice(0, 4)
                        : first_air_date.slice(0, 4)}
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
                    <span className="text-white/50">
                      {release_date ? release_date : first_air_date}
                    </span>
                  </p>
                  {runtime && (
                    <p className="flex items-center gap-2">
                      <LuClock size={18} />
                      <span className="text-white/50">
                        {runtimeConvert(runtime)}
                      </span>
                    </p>
                  )}
                  {seasons && (
                    <p className="flex items-center gap-2">
                      <PiTelevision size={21} />
                      <span className="text-white/50">{seasons.length}</span>
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xl mb-2">Overview</p>
                  <p className="text-white/50">{overview}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  {videos.results.length > 0 && (
                    <button
                      onClick={findOfficialTrailer}
                      className="flex items-center gap-x-1 bg-[#ffb43a] px-6 py-3 rounded-md font-medium uppercase text-sm"
                    >
                      <FaPlay></FaPlay>play trailer
                    </button>
                  )}
                  <button className="bg-black/40 border-2 px-6 py-3 rounded-md font-medium flex items-center gap-x-1 uppercase text-sm">
                    <FaPlus /> Watchlist
                  </button>
                </div>
              </div>
            </div>
          </Container>

          {/* ==>*** Youtube Trailer Modal For Medium to Upper Devices *** <== */}
          {playTrailer && officialTrailer && (
            <div
              onClick={() => setPlayTrailer(false)}
              className="hidden md:block absolute top-0 left-0 w-full h-full bg-blue-gray/90 z-10 py-16"
            >
              <div className="px-[5%] relative h-full">
                <YouTube
                  videoId={officialTrailer.key}
                  className="h-full w-full flex items-center justify-center mt-12"
                  iframeClassName="w-full h-auto md:w-[80%] md:h-[80%]"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlayTrailer(false)}
                  className="absolute top-[4%] right-[14%] border border-custom-orange px-3"
                >
                  Close
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Container px="5%">
        {/* <==*** Cast Section ***==> */}
        <div className="py-14">
          <p className="text-xl md:text-3xl font-bold border-l-4 border-[#ffb43a] pl-3 mb-8">
            Top Cast
          </p>
          <div className="grid place-items-start grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {credits.cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="text-center">
                <Link to={`/person/${actor.id}`}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${
                            actor.profile_path
                          }?api_key=${import.meta.env.VITE_API_KEY}`
                        : AvatarImg
                    }
                    alt=""
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                    loading="lazy"
                  />
                </Link>
                <Link
                  to={`/person/${actor.id}`}
                  className="text-lg font-semibold inline-block mt-4"
                >
                  {actor.name}
                </Link>
                <p className="text-sm text-white/90">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <==*** Simliar Movies Slider Section ***==> */}
        {similarMovies.length > 0 && (
          <div>
            <p className="text-xl md:text-3xl font-bold border-l-4 border-[#ffb43a] pl-3 mb-8">
              Similar {title ? "Movies" : "TV Shows"}
            </p>
            <Slider sliderData={similarMovies} />
          </div>
        )}
      </Container>
      {/* Youtube Trailer Video From 0px to 768px Devices */}
      {playTrailer && officialTrailer && (
        <div
          onClick={() => setPlayTrailer(false)}
          className="md:hidden fixed top-0 left-0 w-full h-full bg-black z-10"
        >
          <div className="px-[5%] relative h-full">
            <YouTube
              videoId={officialTrailer.key}
              className="h-full w-full mt-12 flex items-center"
              iframeClassName="w-full h-[50%] sm:h-[70%]"
            />
            <button
              onClick={() => setPlayTrailer(false)}
              className="absolute top-0 right-[5%] border px-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MovieDetails;
