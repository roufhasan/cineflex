import { FaStar } from "react-icons/fa6";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useWatchlist from "../../hooks/useWatchlist";

const Card = ({ trending }) => {
  const { id, title, name, poster_path, vote_average } = trending;
  const { user } = useContext(AuthContext);
  const [, refetch] = useWatchlist();
  const navigate = useNavigate();
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/watchlist?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setWatchlistData(data));
    }
  }, [user]);

  const isInWatchlist = watchlistData.find((item) => item.tmdbId === id);

  const handleWatchlist = () => {
    if (user && user.email) {
      const watchlistItem = {
        tmdbId: id,
        poster_path,
        vote_average,
        email: user.email.toLowerCase(),
        media_type: `${title ? "movie" : "tv"}`.toLowerCase(),
        name: `${title ? title : name}`,
      };

      fetch("http://localhost:5000/watchlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(watchlistItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged && data.insertedId) {
            refetch();
            setWatchlistData((prevData) => [...prevData, watchlistItem]);
            return toast.success("Added to watchlist");
          }
          toast.error("Already exist in watchlist.");
        });
    } else {
      navigate("/login");
    }
  };

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
      <div className="w-full h-full bg-black/40 opacity-0 rounded-xl absolute top-0 left-0  transition ease-in-out group-hover:opacity-100 group-hover:duration-500">
        <div className="relative h-full w-full flex items-center justify-center">
          <p
            onClick={handleWatchlist}
            className="absolute right-2 top-2 cursor-pointer"
          >
            {isInWatchlist ? (
              <BsBookmarkDash size={32} color="red" />
            ) : (
              <BsBookmarkPlus size={32} />
            )}
          </p>
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
