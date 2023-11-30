import Container from "../../../components/Shared/Container";
import Hero from "../Hero/Hero";
import LatestShows from "../LatestShows/LatestShows";
import NowPlaying from "../NowPlaying/NowPlaying";
import PopularShows from "../PopularShows/PopularShows";
import Trending from "../Trending/Trending";
import Upcoming from "../Upcoming/Upcoming";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Trending />
      <NowPlaying />
      <Upcoming />
      <div className="lg:flex gap-12 px-[5%]">
        <div className="w-full lg:w-3/4">
          <PopularShows />
        </div>
        <div className="w-full lg:w-1/4">
          <LatestShows />
        </div>
      </div>
    </Container>
  );
};

export default Home;
