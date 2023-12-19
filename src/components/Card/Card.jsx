import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";

const Card = ({ trending }) => {
  const { id, title, name, poster_path, vote_average } = trending;

  return (
    <div className="relative group">
      <Link to={name ? `/tv/${id}` : `/movie/${id}`}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}?api_key=${
                  import.meta.env.VITE_API_KEY
                }`
              : CardImg
          }
          alt={`${title ? title : name} movie poster`}
          loading="lazy"
          className="h-72 max-h-96 w-full sm:h-auto object-cover"
        />
        <div className="w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 absolute top-0 left-0  transition ease-in-out group-hover:duration-500">
          <p className="h-full w-full grid place-items-center text-xl font-medium">
            View Details
          </p>
        </div>
        <div className="w-full flex justify-between bg-gradient-to-t from-black/50 to-black/30 backdrop-blur-sm opacity-100 group-hover:opacity-0 px-2 py-3 absolute bottom-0 left-0 transition ease-in-out group-hover:duration-500">
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
      </Link>
    </div>
  );
};

export default Card;
