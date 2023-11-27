import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import { FaPlay, FaRegCalendar, FaStar, FaSwatchbook } from "react-icons/fa6";
import { motion } from "framer-motion";

const Hero = () => {
  const [myShows, setMyShows] = useState([]);

  useEffect(() => {
    apiFetch("popular").then((data) => setMyShows(data.slice(0, 5)));
  }, []);
  return (
    <>
      {myShows && myShows.length > 0 && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-[calc(100vh-64.5px)] max-h-[1080px] md:min-h-[600px]"
        >
          {myShows &&
            myShows.length > 0 &&
            myShows.map((myshow) => (
              <SwiperSlide key={myshow.id}>
                {console.log(myshow)}
                <div
                  style={{
                    backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${`https://image.tmdb.org/t/p/original${
                      myshow.backdrop_path
                    }?api_key=${import.meta.env.VITE_API_KEY}`}) `,
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
                            <FaSwatchbook />
                          </div>
                        </div>
                      </div>
                      <p className="max-w-2xl text-base">
                        {myshow.overview.slice(0, 170)}...
                      </p>
                      <div className="flex items-center gap-x-6">
                        <motion.button
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-x-2 bg-[#f98606] px-6 py-3 rounded-full font-medium"
                        >
                          <FaPlay /> <span>Watch Now</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ translateY: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-black/40 border-2 px-6 py-3 rounded-full font-medium"
                        >
                          View Details
                        </motion.button>
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
