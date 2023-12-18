import { useEffect, useState } from "react";
import { externalIds } from "../../../api/api";
import FacebookIcon from "../../../assets/icons/facebook-icon.png";
import InstagramIcon from "../../../assets/icons/instagram-icon.png";
import TwitterIcon from "../../../assets/icons/twitter-icon.png";
import ImdbIcon from "../../../assets/icons/imdb-icon.png";

const Biography = ({ personDetails }) => {
  const {
    biography,
    birthday,
    id,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
  } = personDetails;

  const [fullBio, setFullBio] = useState(false);
  const [socialIds, setSocialIds] = useState({});
  const { facebook_id, imdb_id, instagram_id, twitter_id } = socialIds;
  console.log(socialIds);

  useEffect(() => {
    externalIds(id).then((data) => setSocialIds(data));
  }, [id]);

  return (
    <div className="pt-20 md:pt-32 pb-12 md:flex gap-16">
      <div className="md:w-1/4">
        <img
          src={`https://image.tmdb.org/t/p/w400${profile_path}?api_key=${
            import.meta.env.VITE_API_KEY
          }`}
          alt={`poster of ${name}`}
          loading="lazy"
          className="w-full"
        />
      </div>
      <div className="mt-10 md:w-3/4 md:mt-0">
        <h3 className="text-5xl font-semibold">{name}</h3>
        <p className="text-white/80 mt-3">
          <span className="font-medium text-custom-white">Known For: </span>
          {known_for_department}
        </p>
        <p className="text-white/80 mt-2">
          <span className="font-medium text-custom-white">Birthday: </span>
          {birthday}
        </p>
        <p className="text-white/80 mt-2">
          <span className="font-medium text-custom-white">
            Place of Birth:{" "}
          </span>
          {place_of_birth}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p className="font-medium text-custom-white">Available On:</p>
          <div className="flex flex-wrap items-center gap-2">
            {facebook_id && (
              <a
                href={`https://www.facebook.com/${facebook_id}`}
                target="_blanck"
              >
                <img src={FacebookIcon} className="w-7" alt="facebook logo" />
              </a>
            )}
            {instagram_id && (
              <a
                href={`https://www.instagram.com/${instagram_id}`}
                target="_blanck"
              >
                <img src={InstagramIcon} className="w-7" alt="instagram logo" />
              </a>
            )}
            {twitter_id && (
              <a
                href={`https://www.twitter.com/${twitter_id}`}
                target="_blanck"
              >
                <img src={TwitterIcon} className="w-7" alt="twitter logo" />
              </a>
            )}
            <p>|</p>
            {imdb_id && (
              <a href={`https://www.imdb.com/name/${imdb_id}`} target="_blanck">
                <img src={ImdbIcon} className="w-10" alt="imdb logo" />
              </a>
            )}
          </div>
        </div>
        <p className="text-2xl font-medium mt-6 mb-2">Biography</p>
        {biography.length > 400 && !fullBio ? (
          <div>
            <p className="max-w-[820px]">
              {biography.slice(0, 397)}...
              <span
                onClick={() => setFullBio(true)}
                className="capitalize text-custom-orange font-medium cursor-pointer"
              >
                read more
              </span>
            </p>
          </div>
        ) : (
          <p className="max-w-[820px]">{biography}</p>
        )}
      </div>
    </div>
  );
};

export default Biography;
