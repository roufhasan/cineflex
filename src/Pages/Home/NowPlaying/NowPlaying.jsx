import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import { movieLists } from "../../../api/api";
import Slider from "../../../components/Slider/Slider";

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    movieLists("now_playing")
      .then((data) => setNowPlaying(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container px="5%">
      <section className="py-14">
        <div className="flex flex-wrap items-center justify-between gap-y-3 mb-8">
          <h3 className="text-xl md:text-3xl font-bold">
            Currently In Theatres
          </h3>
        </div>
        <Slider sliderData={nowPlaying} />
      </section>
    </Container>
  );
};

export default NowPlaying;
