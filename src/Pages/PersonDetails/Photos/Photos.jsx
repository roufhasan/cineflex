import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { getPhotos } from "../../../api/api";
import "swiper/css";

const Photos = ({ id }) => {
  const [photos, setPhotos] = useState([]);
  const [allImages, setAllImages] = useState(false);

  useEffect(() => {
    getPhotos(id).then((data) => setPhotos(data));
  }, [id]);

  return (
    <>
      <h3 className="text-xl text-black md:text-3xl font-bold border-l-4 border-custom-orange pl-3 mb-8">
        Photos
      </h3>
      {photos && photos.length > 1 ? (
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
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {photos &&
            photos.length > 0 &&
            !allImages &&
            photos.slice(1, 8).map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w300${
                    photo.file_path
                  }?api_key=${import.meta.env.VITE_API_KEY}`}
                />
              </SwiperSlide>
            ))}
          {photos &&
            photos.length > 0 &&
            allImages &&
            photos.slice(1).map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w300${
                    photo.file_path
                  }?api_key=${import.meta.env.VITE_API_KEY}`}
                />
              </SwiperSlide>
            ))}
          {!allImages && photos.length > 7 && (
            <SwiperSlide>
              <div className="relative">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w300${
                    photos[0]?.file_path
                  }?api_key=${import.meta.env.VITE_API_KEY}`}
                />
                <div className="absolute top-0 left-0 backdrop-blur-2xl bg-white/10 w-full h-full flex items-center justify-center">
                  <button onClick={() => setAllImages(true)}>
                    View All Photos
                  </button>
                </div>
              </div>
            </SwiperSlide>
          )}
          ;
        </Swiper>
      ) : (
        <p className="text-2xl text-black font-medium text-center">
          No photo found :(
        </p>
      )}
    </>
  );
};

export default Photos;
