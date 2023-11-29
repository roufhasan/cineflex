import Container from "../../../components/Shared/Container";
import Hero from "../Hero/Hero";
import NowPlaying from "../NowPlaying/NowPlaying";
import Trending from "../Trending/Trending";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Trending />
      <NowPlaying />
    </Container>
  );
};

export default Home;
