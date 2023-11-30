import Container from "../../../components/Shared/Container";
import Hero from "../Hero/Hero";
import NowPlaying from "../NowPlaying/NowPlaying";
import Trending from "../Trending/Trending";
import Upcoming from "../Upcoming/Upcoming";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Trending />
      <NowPlaying />
      <Upcoming />
    </Container>
  );
};

export default Home;
