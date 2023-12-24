import { useEffect, useState } from "react";
import { getCredits } from "../../../api/personApi";
import { FaStar } from "react-icons/fa6";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import ErrorImage from "../../../assets/icons/image-error.png";
import { Link } from "react-router-dom";

const Credits = ({ id }) => {
  const [value, setValue] = useState("combined_credits");
  const [credits, setCredits] = useState([]);
  const options = [
    { label: "All Credits", value: "combined_credits" },
    { label: "Movies", value: "movie_credits" },
    { label: "Tv Shows", value: "tv_credits" },
  ];

  useEffect(() => {
    getCredits(id, value).then((data) => setCredits(data));
  }, [id, value]);

  return (
    <>
      <div className="text-black my-14">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl md:text-3xl font-bold border-l-4 border-custom-orange pl-3">
            Credits
          </h3>
          <select
            onChange={(e) => setValue(e.target.value)}
            name="selectCredits"
            className="bg-custom-orange/30 px-3 py-1 border-none outline-none border-custom-orange rounded hover:bg-custom-orange/50 transition-all cursor-pointer"
          >
            {options.map((option, index) => (
              <option
                key={index}
                className="bg-white text-black"
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Credits List */}
        <ul className="md:border-2 rounded-md md:pl-4 py-8">
          <li className="border-b font-medium text-gray-600 pb-1">
            Total Results: {credits.length}
          </li>
          {credits.map((credit, index) => (
            <li
              key={index}
              className="flex gap-4 border-b last:border-b-0 py-3"
            >
              <div className="w-14 h-[84px]">
                <Link
                  to={
                    (credit.media_type === "movie" && `/movie/${credit.id}`) ||
                    (credit.media_type === "tv" && `/tv/${credit.id}`) ||
                    (value === "movie_credits" && `/movie/${credit.id}`) ||
                    (value === "tv_credits" && `/tv/${credit.id}`)
                  }
                >
                  <img
                    className="w-full h-full object-cover"
                    loading="lazy"
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w200${
                            credit.poster_path
                          }?api_key=${import.meta.env.VITE_API_KEY}`
                        : ErrorImage
                    }
                    alt={
                      credit.poster_path
                        ? `poster image of${
                            credit.title ? credit.name : credit.title
                          }`
                        : `erro image from the noun project`
                    }
                  />
                </Link>
              </div>
              <div className="w-full flex justify-between md:items-center md:pr-10">
                <div>
                  <Link
                    to={
                      (credit.media_type === "movie" &&
                        `/movie/${credit.id}`) ||
                      (credit.media_type === "tv" && `/tv/${credit.id}`) ||
                      (value === "movie_credits" && `/movie/${credit.id}`) ||
                      (value === "tv_credits" && `/tv/${credit.id}`)
                    }
                    className="text-lg font-bold transition-all hover:text-custom-orange/90"
                  >
                    {credit.title ? credit.title : credit.name}
                  </Link>
                  <div className="flex items-center gap-3">
                    {credit.vote_average > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaStar className="text-custom-orange" />
                        <p className="mt-[3px]">
                          {credit.vote_average &&
                            credit.vote_average.toFixed(1)}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 uppercase">
                      {credit.media_type === "tv" && <p>{credit.media_type}</p>}
                    </p>
                  </div>
                  {credit.character && (
                    <p className="text-sm text-gray-500 leading-normal mt-[3px]">
                      {credit.character}
                    </p>
                  )}
                </div>
                <div className="flex md:items-center gap-5 mt-1 md:mt-0">
                  <div>
                    {credit.release_date && (
                      <p className="text-sm text-gray-500">
                        {credit.release_date.slice(0, 4)}
                      </p>
                    )}
                    {credit.first_air_date && (
                      <p className="text-sm text-gray-500">
                        {credit.first_air_date.slice(0, 4)}
                      </p>
                    )}
                  </div>
                  <Link
                    to={
                      (credit.media_type === "movie" &&
                        `/movie/${credit.id}`) ||
                      (credit.media_type === "tv" && `/tv/${credit.id}`) ||
                      (value === "movie_credits" && `/movie/${credit.id}`) ||
                      (value === "tv_credits" && `/tv/${credit.id}`)
                    }
                  >
                    <IoEllipsisHorizontalCircle className="text-3xl text-custom-orange" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Credits;
