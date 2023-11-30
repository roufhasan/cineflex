import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import { movieLists } from "../../../api/api";
import Slider from "../../../components/Slider/Slider";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [upcoming, setUpComing] = useState([]);

  useEffect(() => {
    movieLists("upcoming")
      .then((data) => setUpComing(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container px="5%">
      <section className="py-14">
        <div className="flex flex-wrap items-center justify-between gap-y-3 mb-8">
          <h3 className="text-xl md:text-3xl font-bold border-l-4 border-[#f98606] pl-3">
            Coming Soon
          </h3>
          <Link
            to="/movies/upcoming"
            className="border-b-2 border-[#f98606] transition duration-500 hover:text-[#f98606]"
          >
            View All
          </Link>
        </div>
        <Slider sliderData={upcoming} />
      </section>
    </Container>
  );
};

export default Upcoming;
