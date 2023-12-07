import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardImg from "../../assets/movie-card.jpg";

const Card = ({ trending }) => {
  const { id, original_title, poster_path, vote_average } = trending;

  return (
    <div className="relative group">
      <Link to={`/movie/${id}`}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}?api_key=${
                  import.meta.env.VITE_API_KEY
                }`
              : CardImg
          }
          alt={`${original_title} movie poster`}
          loading="lazy"
          className="h-72 max-h-96 w-full sm:h-auto object-cover"
        />
        <div className="w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 absolute top-0 left-0  transition ease-in-out group-hover:duration-500">
          <p className="h-full w-full grid place-items-center text-xl font-medium">
            View Details
          </p>
        </div>
        <div className="w-full flex justify-between bg-gradient-to-t from-black/50 to-black/30 backdrop-blur-sm opacity-100 group-hover:opacity-0 px-2 py-3 absolute bottom-0 left-0 transition ease-in-out group-hover:duration-500">
          <p className="font-medium lg:hidden">
            {original_title.length > 9
              ? original_title.slice(0, 7) + ".."
              : original_title}
          </p>
          <p className="text-lg font-medium hidden lg:block">
            {original_title.length > 15
              ? original_title.slice(0, 13) + "..."
              : original_title}
          </p>
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
