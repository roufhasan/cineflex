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
        }}
        navigation={true}
        className="mySwiper"
      >
        {personData &&
          personData.length > 0 &&
          personData.slice(0, 10).map((person) => (
            <SwiperSlide key={person.id}>
              <div className="group text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    person.profile_path
                  }?api_key=${import.meta.env.VITE_API_KEY}`}
                  alt=""
                  className="max-h-96"
                />
                <Link
                  to={`/person/${person.id}`}
                  className="text-lg font-medium inline-block mt-2 text-center group-hover:text-white/70"
                >
                  {person.original_name}
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PersonSlider;
