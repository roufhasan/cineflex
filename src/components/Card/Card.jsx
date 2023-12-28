import { FaStar } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";

const Card = ({ trending }) => {
  const { id, title, name, poster_path, vote_average } = trending;

  const handleWatchlist = (title) => {
    if (title) {
      console.log("it is a movie");
    } else {
      console.log("it is tv shows");
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
            onClick={() => handleWatchlist(title)}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <BsBookmarkPlus size={32} />
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
