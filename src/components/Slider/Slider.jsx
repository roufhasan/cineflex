import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Card from "../Card/Card";
import { FreeMode, Navigation } from "swiper/modules";

const Slider = ({ sliderData }) => {
  return (
    <>
      {/* Slider for Mobile to Tablet Devices*/}
      <div className="sm:hidden">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
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
      </div>

      {/* Cards for Small to Medium Devices */}
      <div className="hidden sm:block md:hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
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
      </div>

      {/* Cards for Medium to Large Devices */}
      <div className="hidden md:block lg:hidden">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          navigation={true}
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
      </div>
      {/* Cards for Large to Upper Devices */}
      <div className="hidden lg:block">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          navigation={true}
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
      </div>
    </>
  );
};

export default Slider;
