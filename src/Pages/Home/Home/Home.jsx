import React, { Suspense } from "react";
import Container from "../../../components/Shared/Container";
import PageTitle from "../../../components/PageTitle/PageTitle";
const Hero = React.lazy(() => import("../Hero/Hero"));
const Trending = React.lazy(() => import("../Trending/Trending"));
const NowPlaying = React.lazy(() => import("../NowPlaying/NowPlaying"));
const Upcoming = React.lazy(() => import("../Upcoming/Upcoming"));
const PopularShows = React.lazy(() => import("../PopularShows/PopularShows"));
const TopRated = React.lazy(() => import("../TopRated/TopRated"));
const PopularPerson = React.lazy(() =>
  import("../PopularPerson/PopularPerson")
);

const Home = () => {
  return (
    <Container>
      <PageTitle title={"CineFlex"} />

      {/* Hero */}
      <Suspense fallback={""}>
        <Hero />
      </Suspense>

      {/* Trending */}
      <Suspense fallback={""}>
        <Trending />
      </Suspense>

      {/* Now Playing */}
      <Suspense fallback={""}>
        <NowPlaying />
      </Suspense>

      {/* Upcoming */}
      <Suspense fallback={""}>
        <Upcoming />
      </Suspense>

      <div className="lg:flex gap-12 px-[5%] lg:max-h-[1400px]">
        {/* Popular TV Shows */}
        <div className="w-full lg:w-3/4">
          <Suspense fallback={""}>
            <PopularShows />
          </Suspense>

          {/* Popular Person */}
          <Suspense fallback={""}>
            <div className="hidden md:block">
              <PopularPerson />
            </div>
          </Suspense>
        </div>

        {/* Top Rated */}
        <Suspense fallback={<p>Now plyaing loading..</p>}>
          <div className="w-full lg:w-1/4">
            <TopRated />
          </div>
        </Suspense>

        {/* Popular Person */}
        <Suspense fallback={<p>Now plyaing loading..</p>}>
          <div className="md:hidden">
            <PopularPerson />
          </div>
        </Suspense>
      </div>
    </Container>
  );
};

export default Home;
