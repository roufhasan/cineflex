import { useEffect, useState } from "react";
import PersonSlider from "../../../components/PersonSilder/PersonSlider";
import { popularPersons } from "../../../api/personApi";

const PopularPerson = () => {
  const [popularPersonList, setPopularPersonList] = useState([]);

  useEffect(() => {
    popularPersons().then((data) => setPopularPersonList(data));
  }, []);

  return (
    <section>
      <h3 className="text-xl md:text-3xl font-bold border-l-4 border-[#ffb43a] pl-3 mb-8">
        Popular Person
      </h3>
      {popularPersonList && popularPersonList.length > 0 && (
        <PersonSlider personData={popularPersonList} />
      )}
    </section>
  );
};

export default PopularPerson;
