import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPlay, FaRegCalendar, FaStar, FaSwatchbook } from "react-icons/fa6";
import { motion } from "framer-motion";
import { tvSeriesLists } from "../../../api/api";
import { getGenre } from "../../../customData/generateGenre";
import "swiper/css/pagination";
import "swiper/css";

const PopularShows = () => {
  const [popularSerieses, setPopularSeries] = useState([]);

  const showGenreNames = (genreIds) => {
    const genreNames = getGenre(genreIds).join("/");
    return genreNames;
  };

  useEffect(() => {
    tvSeriesLists("popular").then((data) => setPopularSeries(data));
  }, []);
  return (
    <section className="py-14">
      <h3 className="text-xl font-bold border-l-4 border-[#f98606] pl-3 mb-8 md:text-3xl">
        Popular TV Shows
      </h3>
      <div>
        {popularSerieses && popularSerieses.length > 0 && (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {popularSerieses &&
              popularSerieses.length > 0 &&
              popularSerieses.slice(0, 5).map((popularSeries) => (
                <SwiperSlide key={popularSeries.id}>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${`https://image.tmdb.org/t/p/original${
                        popularSeries.backdrop_path
                      }?api_key=${import.meta.env.VITE_API_KEY}`}) `,
                    }}
                    className="bg-no-repeat bg-cover bg-center md:px-[5%] md:py-14 md:flex gap-10"
                  >
                    {/* Card image and watch button */}
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={`https://image.tmdb.org/t/p/original${
                            popularSeries.poster_path
                          }?api_key=${import.meta.env.VITE_API_KEY}`}
                          alt=""
                          className="w-full h-[500px] object-cover border-2 md:w-80 md:h-80 md:border-0 xl:h-[400px] 2xl:h-[500px]"
                        />
                        <div className="text-xl font-bold py-4 bg-black md:hidden">
                          <Link to="/">{popularSeries.original_name}</Link>
                        </div>
                      </Link>
                      <div className="md:inline-block cursor-pointer">
                        <motion.div
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center gap-x-2 bg-[#f98606] px-6 py-3 font-medium md:justify-normal md:mt-7 md:rounded-md"
                        >
                          <FaPlay /> <span>Watch Now</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Title, name etc... */}
                    <div className="hidden md:block">
                      <h1 className="text-5xl font-bold mb-2">
                        {popularSeries.original_name}
                      </h1>
                      <div className="flex items-center flex-wrap gap-x-10 gap-y-1">
                        <div className="flex items-center gap-3 text-lg">
                          <FaStar />
                          {popularSeries.vote_average.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-3 text-lg">
                          <FaRegCalendar />
                          {popularSeries.first_air_date.slice(0, 4)}
                        </div>
                        <div className="flex items-center gap-3 text-lg">
                          <FaSwatchbook />
                          <p>{showGenreNames(popularSeries.genre_ids)}</p>
                        </div>
                      </div>
                      <div className="max-w-2xl text-base mt-10">
                        <p>
                          {popularSeries.overview.slice(0, 200)}{" "}
                          <span className="text-[#f98616]">
                            <Link to={`/`}>see more...</Link>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default PopularShows;
