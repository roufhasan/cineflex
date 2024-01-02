import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";
import ErrorImage from "../../assets/icons/image-error.png";
import { FaStar } from "react-icons/fa6";
import useWatchlist from "../../hooks/useWatchlist";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const WatchList = () => {
  const [watchlist, refetch] = useWatchlist();

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/watchlist/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Removed from watchlist.");
        }
      });
  };

  return (
    <Container px="5%">
      <section className="pt-20 mb-12 md:pt-32">
        <h3 className="text-xl md:text-3xl font-bold border-l-4 border-custom-orange pl-3 mb-8">
          Your Watchlist
        </h3>
        <ul className="md:border-2 rounded-md py-8">
          <li className="border-b font-medium text-gray-600 pb-1 md:px-4">
            Total Results: {watchlist.length}
          </li>
          {watchlist &&
            watchlist.length > 0 &&
            watchlist.map((list, index) => (
              <li
                key={index}
                className="flex gap-4 border-b last:border-b-0 py-3 px-2 md:pl-4"
              >
                <div className="w-14 h-[84px]">
                  <Link
                    to={
                      (list.media_type === "movie" &&
                        `/movie/${list.tmdbId}`) ||
                      (list.media_type === "tv" && `/tv/${list.tmdbId}`)
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
                        (list.media_type === "movie" &&
                          `/movie/${list.tmdbId}`) ||
                        (list.media_type === "tv" && `/tv/${list.tmdbId}`)
                      }
                      className="text-lg font-bold transition-all hover:text-custom-orange/90"
                    >
                      {list.name}
                      <span className="text-sm text-gray-400 font-normal ml-1">
                        ({list.year})
                      </span>
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
                        {list.media_type === "tv" && <p>{list.media_type}</p>}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(list._id)}
                  className="md:pr-4"
                >
                  <RiDeleteBin6Line
                    size={24}
                    className="hover:text-custom-orange"
                  />
                </button>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
};

export default WatchList;
