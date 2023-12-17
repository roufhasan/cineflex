import { useEffect, useState } from "react";
import { movieLists, tvSeriesLists } from "../../../api/api";
import Container from "../../../components/Shared/Container";
import { Link } from "react-router-dom";

const TopRated = () => {
  const [topRatedList, setTopRatedList] = useState([]);
  const [apiPath, setApiPath] = useState(true);

  useEffect(() => {
    if (apiPath) {
      tvSeriesLists("top_rated").then((data) => setTopRatedList(data));
    } else {
      movieLists("top_rated").then((data) => setTopRatedList(data));
    }
  }, [apiPath]);

  return (
    <Container px="0%">
      {topRatedList && topRatedList.length > 0 && (
        <div className="w-full py-14">
          <p className="text-2xl font-medium pb-2 border-b border-b-gray-400">
            Top Rated
          </p>
          <p className="text-gray-500 pt-4 pb-7 flex flex-wrap gap-3">
            <span
              onClick={() => setApiPath(true)}
              className={`cursor-pointer ${
                apiPath ? "text-[#f98616]" : "text-gray-500"
              }`}
            >
              TV Series
            </span>
            <span
              onClick={() => setApiPath(false)}
              className={`cursor-pointer ${
                apiPath ? "text-gray-500" : "text-[#f98616]"
              }`}
            >
              Movies
            </span>
          </p>
          <ul className="lg:[&>*:nth-child(9)]:hidden lg:[&>*:nth-child(8)]:border-b-0 2xl:[&>*:nth-child(9)]:block 2xl:[&>*:nth-child(8)]:border-b">
            {topRatedList &&
              topRatedList.length > 0 &&
              topRatedList.slice(0, 9).map((topRated) => (
                <li
                  key={topRated.id}
                  className="flex border-b border-b-gray-300 py-2 last:border-b-0 gap-4"
                >
                  <Link
                    to={
                      apiPath ? `/tv/${topRated.id}` : `/movie/${topRated.id}`
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        topRated.poster_path
                      }?api_key=${import.meta.env.VITE_API_KEY}`}
                      alt={`poster of ${
                        topRated.original_name
                          ? topRated.original_name
                          : topRated.original_title
                      }`}
                      loading="lazy"
                      className="w-[74px]"
                    />
                  </Link>
                  <div>
                    <p className="text-sm text-[#ffffff9c]">
                      {topRated.first_air_date
                        ? topRated.first_air_date.slice(0, 4)
                        : topRated.release_date.slice(0, 4)}
                    </p>
                    <p className="text-lg font-medium">
                      <Link
                        to={
                          apiPath
                            ? `/tv/${topRated.id}`
                            : `/movie/${topRated.id}`
                        }
                      >
                        {topRated.original_name
                          ? topRated.original_name
                          : topRated.original_title}
                      </Link>
                    </p>
                    <p className="text-sm text-[#ffffff9c]">
                      {topRated.vote_average.toFixed(1)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default TopRated;
