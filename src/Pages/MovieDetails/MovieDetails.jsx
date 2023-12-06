import { useLoaderData } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { FaPlay, FaPlus } from "react-icons/fa6";

const MovieDetails = () => {
  const movieDetails = useLoaderData();
  const {
    backdrop_path,
    genres,
    original_title,
    overview,
    poster_path,
    release_date,
    runtime,
    status,
    tagline,
  } = movieDetails;
  console.log(movieDetails);

  const runtimeConvert = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <section
      style={{
        background: `linear-gradient(to left,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),url(${`https://image.tmdb.org/t/p/original${backdrop_path}?api_key=${
          import.meta.env.VITE_API_KEY
        }`}) center/cover no-repeat`,
      }}
    >
      <div className="py-12  backdrop-blur-3xl ">
        <Container px="5%">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="w-1/2 max-w-sm rounded-md">
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt=""
                    className="w-full rounded-md"
                  />
                  <div className="hidden absolute top-0 left-0 w-full h-full group-hover:grid place-items-center bg-gradient-to-b from-black/30 to-black/50">
                    <button className="w-14 h-14 grid place-items-center rounded-full bg-white/30">
                      <FaPlay size={24} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-x-1 bg-[#f98606] px-6 py-3 rounded-md font-medium uppercase text-sm">
                    <FaPlay></FaPlay>play trailer
                  </button>
                  <button className="bg-black/40 border-2 px-6 py-3 rounded-md font-medium flex items-center gap-x-1 uppercase text-sm">
                    <FaPlus /> Watchlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-5xl font-bold flex items-center gap-3">
                {original_title}{" "}
                <span className="text-sm text-white/50 font-normal border border-white/50 rounded px-[4px] py-[1px]">
                  {release_date.slice(0, 4)}
                </span>
              </h2>
              {/* <p className="text-sm italic text-white/60">{tagline}</p> */}
              <div className="flex flex-wrap gap-2 my-4">
                {genres.map((genre) => (
                  <p
                    key={genre.id}
                    className="text-sm text-white/80 border rounded-xl px-3 cursor-pointer hover:bg-white/10"
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
              <div className="flex gap-3 mt-4 mb-8">
                <p>
                  Status: <span className="text-white/50">{status}</span>
                </p>
                <p>
                  Release Date:{" "}
                  <span className="text-white/50">{release_date}</span>
                </p>
                <p>
                  Runtime:{" "}
                  <span className="text-white/50">
                    {runtimeConvert(runtime)}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xl mb-2">Overview</p>
                <p className="text-white/50">{overview}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default MovieDetails;
