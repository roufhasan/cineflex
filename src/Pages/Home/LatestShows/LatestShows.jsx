import { useEffect, useState } from "react";
import { tvSeriesLists } from "../../../api/api";
import Container from "../../../components/Shared/Container";

const LatestShows = () => {
  const [popularSerieses, setPopularSeries] = useState([]);
  useEffect(() => {
    tvSeriesLists("popular").then((data) => setPopularSeries(data));
  }, []);
  //   console.log(popularSerieses);
  return (
    <Container px="0%">
      <div className="w-full py-14">
        <p className="text-2xl font-medium pb-2 border-b border-b-gray-400">
          Latest Shows
        </p>
        <p className="text-gray-500 pt-4 pb-7">
          <span>Popular/</span>
          <span>Top Rated/</span>
          <span>Airing Today</span>
        </p>
        <ul>
          {popularSerieses &&
            popularSerieses.length > 0 &&
            popularSerieses.slice(0, 10).map((popular) => (
              <li
                key={popular.id}
                className="flex border-b border-b-gray-300 py-2 last:border-b-0 gap-4"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    popular.poster_path
                  }?api_key=${import.meta.env.VITE_API_KEY}`}
                  alt={`${popular.original_name} tv series poster`}
                  loading="lazy"
                  className="w-[74px]"
                />
                <div>
                  <p className="text-sm text-[#ffffff9c]">
                    {popular.first_air_date.slice(0, 4)}
                  </p>
                  <p className="text-lg font-medium">{popular.original_name}</p>
                  <p className="text-sm text-[#ffffff9c]">
                    {popular.vote_average.toFixed(1)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Container>
  );
};

export default LatestShows;
