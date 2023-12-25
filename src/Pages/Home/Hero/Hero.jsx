import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPlay, FaRegCalendar, FaStar } from "react-icons/fa6";
import { LiaTagSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { listOfShows } from "../../../api/moviesAndShowsApi";
import "swiper/css/pagination";
import "swiper/css";
import { getGenre } from "../../../customData/generateGenre";
import { MdArrowForwardIos } from "react-icons/md";
import YouTube from "react-youtube";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const autoPlayStart = () => {
    setShowPlayer(false);
    setPlayTrailer(null);
  };

  // This function's convert genre code into genre name
  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  // Get movie trailer videos along with cast names
  const getTrailers = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&append_to_response=credits,videos`
    );
    const data = await res.json();

    const trailers = data?.videos?.results;

    const trailer = trailers.find((vid) => vid.name === "Official Trailer");
    const anyTrailer = trailers[0];

    if (trailer) {
      setPlayTrailer(trailer.key);
    } else {
      setPlayTrailer(anyTrailer.key);
    }
    setShowPlayer(true);
  };

  // Get popular movies
  useEffect(() => {
    listOfShows("movie", "popular").then((data) => setMovies(data.slice(0, 5)));
  }, []);

  return (
    <div>
      {movies && movies.length > 0 && (
        <Swiper
          key={playTrailer ? "withTrailer" : "withoutTrailer"}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={
            playTrailer ? null : { delay: 7500, disableOnInteraction: false }
          }
          modules={
            playTrailer
              ? [Pagination, Navigation]
              : [Autoplay, Pagination, Navigation]
          }
          className="mySwiper h-screen max-h-[1080px] md:min-h-[600px]"
        >
          {movies &&
            movies.length > 0 &&
            movies.map((myshow) => (
              <SwiperSlide key={myshow.id}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to top right,rgba(22,24,29,0.85) 45%, rgba(33,36,44,0.2)),url(${`https://image.tmdb.org/t/p/original${
                      myshow.backdrop_path
                    }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`})`,
                  }}
                  className="h-full bg-no-repeat bg-cover bg-center px-[5%] relative"
                >
                  <div className="md:flex items-center gap-[15%] h-full">
                    <motion.div
                      initial={{ y: "-20vh" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1 }}
                      className="h-full md:w-1/2 flex flex-col justify-center gap-8"
                    >
                      <div>
                        <h1 className="text-4xl md:text-5xl leading-tight font-bold">
                          {myshow.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 md:gap-x-10">
                          <div className="flex items-center gap-3 text-lg">
                            <FaStar className="text-custom-orange" />
                            {myshow.vote_average.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-3 text-lg">
                            <FaRegCalendar className="text-custom-orange" />
                            {myshow.release_date.slice(0, 4)}
                          </div>
                          <div className="flex items-center gap-3 text-lg">
                            <LiaTagSolid
                              size={22}
                              className="text-custom-orange"
                            />
                            <p>{showGenreNames(myshow.genre_ids)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="max-w-2xl text-base">
                        {myshow.overview.slice(0, 170)}...
                      </p>
                      <div className="flex items-center gap-x-6">
                        <motion.div
                          onClick={() => getTrailers(myshow.id)}
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-x-2 bg-[#ffb43a] px-6 py-3 rounded-full font-medium cursor-pointer"
                        >
                          <span>Watch Now</span> <FaPlay />
                        </motion.div>
                        <motion.div
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            to={`/movie/${myshow.id}`}
                            className="bg-blue-gray/40 border-2 px-6 py-3 rounded-full font-medium inline-block"
                          >
                            <div className="flex items-center gap-x-2">
                              <span>Details</span> <MdArrowForwardIos />
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Movie Image Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      className="hidden md:block w-1/2"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${
                          myshow.poster_path
                        }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`}
                        alt=""
                        className="w-80 h-[500px] object-cover rounded-xl"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                  {/* Youtube Video Trailer Modal For Medium to Upper Devices */}
                  {playTrailer && showPlayer && (
                    <div
                      onClick={autoPlayStart}
                      className="hidden md:block absolute top-0 left-0 w-full h-full bg-blue-gray/60 z-10 backdrop-blur-xl py-16"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 4 }}
                        className="px-[5%] relative h-full"
                      >
                        <YouTube
                          videoId={playTrailer}
                          className="h-full w-full flex items-center justify-center"
                          iframeClassName="w-full h-auto md:w-[80%] md:h-[80%]"
                        />
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPlayTrailer(false)}
                          className="absolute top-[4%] right-[14%] border border-custom-orange px-3"
                        >
                          Close
                        </motion.button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {/* Youtube Trailer Video From 0px to 768px Devices */}
      {playTrailer && showPlayer && (
        <div
          onClick={() => setPlayTrailer(false)}
          className="md:hidden fixed top-0 left-0 w-full h-full bg-black z-10"
        >
          <div className="px-[5%] relative h-full">
            <YouTube
              videoId={playTrailer}
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
    </div>
  );
};

export default Hero;
