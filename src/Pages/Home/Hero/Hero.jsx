import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPlay, FaRegCalendar, FaStar } from "react-icons/fa6";
import { LiaTagSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { movieLists } from "../../../api/api";
import "swiper/css/pagination";
import "swiper/css";
import { getGenre } from "../../../customData/generateGenre";
import { MdArrowForwardIos } from "react-icons/md";

const Hero = () => {
  const [movies, setMovies] = useState([]);

  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  useEffect(() => {
    movieLists("popular").then((data) => setMovies(data.slice(0, 5)));
  }, []);
  return (
    <>
      {movies && movies.length > 0 && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-[calc(100vh-64.5px)] max-h-[1080px] md:min-h-[600px]"
        >
          {movies &&
            movies.length > 0 &&
            movies.map((myshow) => (
              <SwiperSlide key={myshow.id}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${`https://image.tmdb.org/t/p/original${
                      myshow.backdrop_path
                    }?api_key=${import.meta.env.VITE_API_KEY}`})`,
                  }}
                  className="h-full bg-no-repeat bg-cover bg-center px-[5%]"
                >
                  <div className="md:flex items-center gap-[15%] h-full">
                    <div className="h-full md:w-1/2 flex flex-col justify-center gap-8">
                      <div>
                        <h1 className="text-4xl md:text-5xl leading-tight font-bold">
                          {myshow.original_title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 md:gap-x-10">
                          <div className="flex items-center gap-3 text-lg">
                            <FaStar />
                            {myshow.vote_average.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-3 text-lg">
                            <FaRegCalendar />
                            {myshow.release_date.slice(0, 4)}
                          </div>
                          <div className="flex items-center gap-3 text-lg">
                            <LiaTagSolid size={22} />
                            <p>{showGenreNames(myshow.genre_ids)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="max-w-2xl text-base">
                        {myshow.overview.slice(0, 170)}...
                      </p>
                      <div className="flex items-center gap-x-6">
                        <motion.div
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-x-2 bg-[#f98606] px-6 py-3 rounded-full font-medium"
                        >
                          <span>Watch Now</span> <FaPlay />
                        </motion.div>
                        <motion.div
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            to={`/movie/${myshow.id}`}
                            className="bg-black/40 border-2 px-6 py-3 rounded-full font-medium inline-block"
                          >
                            <div className="flex items-center gap-x-2">
                              <span>Details</span> <MdArrowForwardIos />
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                    <div className="hidden md:block w-1/2">
                      <img
                        src={`https://image.tmdb.org/t/p/original${
                          myshow.poster_path
                        }?api_key=${import.meta.env.VITE_API_KEY}`}
                        alt=""
                        className="w-80 h-[500px] object-cover rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};

export default Hero;
