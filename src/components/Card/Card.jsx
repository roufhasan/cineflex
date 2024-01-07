import { FaStar } from "react-icons/fa6";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useWatchlist from "../../hooks/useWatchlist";

const Card = ({ trending }) => {
  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = trending;
  const { user } = useContext(AuthContext);
  const [watchlist, refetch] = useWatchlist();
  const navigate = useNavigate();
  const [watchlistData, setWatchlistData] = useState([]);
  const [reloadWatchlist, setReloadWatchlist] = useState(false);

  const isInWatchlist = watchlistData.find((item) => item.tmdbId === id);

  const handleWatchlist = async () => {
    try {
      if (user && user.email) {
        const watchlistItem = {
          tmdbId: id,
          poster_path,
          vote_average,
          email: user.email.toLowerCase(),
          media_type: `${title ? "movie" : "tv"}`.toLowerCase(),
          name: `${title ? title : name}`,
          year: `${
            release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4)
          }`,
        };

        const response = await fetch(
          "https://cineflex-server.vercel.app/watchlist",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(watchlistItem),
          }
        );

        const data = await response.json();

        if (data.insertedId) {
          setReloadWatchlist(true);
          refetch();
          toast.success("Added to watchlist");
        } else {
          toast.error("Already exist in watchlist.");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleDeleteList = async () => {
    try {
      if (isInWatchlist && isInWatchlist._id) {
        const response = await fetch(
          `https://cineflex-server.vercel.app/watchlist/id/${isInWatchlist._id}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (data.deletedCount > 0) {
          setReloadWatchlist(true);
          refetch();
          toast.success("Removed from watchlist.");
        } else {
          toast.error("Invalid watchlist item.");
        }
      }
    } catch (error) {
      console.error("Error deleting from watchlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email && watchlist) {
          const response = await fetch(
            `https://cineflex-server.vercel.app/watchlist?email=${user.email}`
          );
          const data = await response.json();
          setWatchlistData(data);
        }
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
    };

    fetchData();
  }, [user, reloadWatchlist, watchlist]);

  return (
    <div className="relative group">
      <Link to={name ? `/tv/${id}` : `/movie/${id}`}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}?api_key=${
                  import.meta.env.VITE_TMDB_API_KEY
                }`
              : CardImg
          }
          alt={`${title ? title : name} movie poster`}
          loading="lazy"
          className="w-full h-72 sm:h-[315px] md:h-[352px] 2xl:h-[384px] object-cover rounded-xl"
        />
      </Link>
      <div className="w-full h-full bg-black/40 opacity-0 rounded-xl absolute top-0 left-0  transition ease-in-out group-hover:opacity-100 group-hover:duration-500 hidden md:block">
        <div className="relative h-full w-full flex items-center justify-center">
          {isInWatchlist ? (
            <div
              onClick={handleDeleteList}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <BsBookmarkDash size={32} color="red" />
            </div>
          ) : (
            <div
              onClick={handleWatchlist}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <BsBookmarkPlus size={32} />
            </div>
          )}
          <Link
            to={name ? `/tv/${id}` : `/movie/${id}`}
            className="text-xl font-medium border-b transition-all hover:text-custom-orange hover:border-b-custom-orange"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-between bg-gradient-to-t from-black/50 to-black/30 backdrop-blur-sm rounded-b-xl opacity-100 group-hover:opacity-0 px-2 py-3 absolute bottom-0 left-0 transition ease-in-out group-hover:duration-500">
        {title && (
          <>
            <p className="font-medium lg:hidden">
              {title.length > 9 ? title.slice(0, 7) + ".." : title}
            </p>
            <p className="text-lg font-medium hidden lg:block">
              {title.length > 15 ? title.slice(0, 13) + "..." : title}
            </p>
          </>
        )}
        {name && (
          <>
            <p className="font-medium lg:hidden">
              {name.length > 9 ? name.slice(0, 7) + ".." : name}
            </p>
            <p className="text-lg font-medium hidden lg:block">
              {name.length > 15 ? name.slice(0, 13) + "..." : name}
            </p>
          </>
        )}
        <div className="flex items-center gap-1 sm:gap-3 font-medium">
          <FaStar color="#f5c518" />
          {vote_average > 0 && vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default Card;
