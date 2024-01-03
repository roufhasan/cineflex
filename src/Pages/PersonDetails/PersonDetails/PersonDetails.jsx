import { useLoaderData } from "react-router-dom";
import Biography from "../Biography/Biography";
import Container from "../../../components/Shared/Container";
import Photos from "../Photos/Photos";
import Credits from "../Credits/Credits";
import PageTitle from "../../../components/PageTitle/PageTitle";

const PersonDetails = () => {
  const personDetails = useLoaderData();
  const id = personDetails.id;

  return (
    <>
      <PageTitle title={`${personDetails.name} | CineFlex`} />
      <Container px="5%">
        <Biography personDetails={personDetails} />
      </Container>
      <div className="bg-white px-[5%] py-14 max-w-[1920px] mx-auto">
        <Photos id={id} />
        <Credits id={id} />
      </div>
    </>
  );
};

export default PersonDetails;
