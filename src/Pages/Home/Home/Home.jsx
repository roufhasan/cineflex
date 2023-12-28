import Container from "../../../components/Shared/Container";
import Hero from "../Hero/Hero";
import NowPlaying from "../NowPlaying/NowPlaying";
import PopularPerson from "../PopularPerson/PopularPerson";
import PopularShows from "../PopularShows/PopularShows";
import TopRated from "../TopRated/TopRated";
import Trending from "../Trending/Trending";
import Upcoming from "../Upcoming/Upcoming";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Trending />
      <NowPlaying />
      <Upcoming />
      <div className="lg:flex gap-12 px-[5%] lg:max-h-[1400px]">
        <div className="w-full lg:w-3/4">
          <PopularShows />
          <div className="hidden md:block">
            <PopularPerson />
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <TopRated />
        </div>
        <div className="md:hidden">
          <PopularPerson />
        </div>
      </div>
    </Container>
  );
};

export default Home;
