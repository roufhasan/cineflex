import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../../../components/Shared/Container";
import { trendingLists } from "../../../api/api";
import Slider from "../../../components/Slider/Slider";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState();
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    trendingLists("movie", timeWindow)
      .then((data) => {
        setTrendingMovies(data);
      })
      .catch((err) => console.log(err));
  }, [timeWindow, trendingMovies]);

  return (
    <Container px="5%">
      <section className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-y-3 mb-8">
          <h3 className="text-xl md:text-3xl font-bold border-l-4 border-[#f98606] pl-3">
            Trending Movies
          </h3>
          <div className="inline-block">
            <div className="flex items-center border border-[#f98606] rounded-full">
              <motion.div
                onClick={() => setTimeWindow("day")}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center gap-x-2 px-2 md:px-3 text-sm py-1 rounded-full font-medium cursor-pointer ${
                  timeWindow == "day" ? "bg-[#f98606]" : "bg-black/40"
                }`}
              >
                Today
              </motion.div>
              <motion.div
                onClick={() => setTimeWindow("week")}
                whileTap={{ scale: 0.9 }}
                className={`${
                  timeWindow == "week" ? "bg-[#f98606]" : "bg-black/40"
                } px-2 md:px-3 py-1 rounded-full text-sm font-medium cursor-pointer`}
              >
                This Week
              </motion.div>
            </div>
          </div>
        </div>
        {trendingMovies && trendingMovies.length > 0 && (
          <Slider sliderData={trendingMovies} />
        )}
      </section>
    </Container>
  );
};

export default Trending;
