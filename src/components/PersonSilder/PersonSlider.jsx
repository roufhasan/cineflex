import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const PersonSlider = ({ personData }) => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 4,
          },
          1920: {
            slidesPerView: 5,
          },
        }}
        navigation={true}
        className="mySwiper flex items-center"
      >
        {personData &&
          personData.length > 0 &&
          personData.slice(0, 10).map((person) => (
            <SwiperSlide key={person.id}>
              <div className="group text-center">
                <Link to={`/person/${person.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      person.profile_path
                    }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`}
                    alt=""
                    className="h-full w-full"
                  />
                </Link>
                <Link
                  to={`/person/${person.id}`}
                  className="text-lg font-medium inline-block mt-2 text-center group-hover:text-white/70"
                >
                  {person.name}
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PersonSlider;
