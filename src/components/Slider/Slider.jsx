import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Card from "../Card/Card";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "./slider.css";

const Slider = ({ sliderData }) => {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {sliderData &&
          sliderData.length > 0 &&
          sliderData.slice(0, 10).map((trending) => (
            <SwiperSlide key={trending.id}>
              <Card trending={trending} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;
