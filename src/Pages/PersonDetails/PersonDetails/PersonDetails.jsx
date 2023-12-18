import { useLoaderData } from "react-router-dom";
import Biography from "../Biography/Biography";
import Container from "../../../components/Shared/Container";

const PersonDetails = () => {
  const personDetails = useLoaderData();

  return (
    <Container px="5%">
      <Biography personDetails={personDetails} />
    </Container>
  );
};

export default PersonDetails;
