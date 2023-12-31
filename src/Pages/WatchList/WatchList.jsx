import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";
import ErrorImage from "../../assets/icons/image-error.png";
import { FaStar } from "react-icons/fa6";
import useWatchlist from "../../hooks/useWatchlist";

const WatchList = () => {
  const [watchlist] = useWatchlist();

  return (
    <Container px="5%">
      <section className="pt-20 mb-12 md:pt-32">
        <h3 className="text-xl md:text-3xl font-bold border-l-4 border-custom-orange pl-3">
          Your Watchlist
        </h3>
        <ul className="md:border-2 rounded-md md:pl-4 py-8">
          <li className="border-b font-medium text-gray-600 pb-1">
            Total Results: {watchlist.length}
          </li>
          {watchlist &&
            watchlist.length > 0 &&
            watchlist.map((list, index) => (
              <li
                key={index}
                className="flex gap-4 border-b last:border-b-0 py-3"
              >
                <div className="w-14 h-[84px]">
                  <Link
                    to={
                      (list.type === "movie" && `/movie/${list.tmdbId}`) ||
                      (list.type === "tv" && `/tv/${list.tmdbId}`)
                    }
                  >
                    <img
                      className="w-full h-full object-cover"
                      loading="lazy"
                      src={
                        list.poster_path
                          ? `https://image.tmdb.org/t/p/w200${
                              list.poster_path
                            }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                          : ErrorImage
                      }
                      alt={
                        list.poster_path
                          ? `poster image of${list.name}`
                          : `error image from the noun project`
                      }
                    />
                  </Link>
                </div>
                <div className="w-full flex justify-between md:items-center md:pr-10">
                  <div>
                    <Link
                      to={
                        (list.type === "movie" && `/movie/${list.tmdbId}`) ||
                        (list.type === "tv" && `/tv/${list.tmdbId}`)
                      }
                      className="text-lg font-bold transition-all hover:text-custom-orange/90"
                    >
                      {list.name}
                    </Link>
                    <div className="flex items-center gap-3">
                      {list.vote_average > 0 && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FaStar className="text-custom-orange" />
                          <p className="mt-[3px]">
                            {list.vote_average && list.vote_average.toFixed(1)}
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 uppercase">
                        {list.type === "tv" && <p>{list.type}</p>}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
};

export default WatchList;
