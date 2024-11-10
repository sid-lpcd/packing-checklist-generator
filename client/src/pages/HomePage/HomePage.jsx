import TripForm from "../../components/TripForm/TripForm";
import "./HomePage.scss";

const HomePage = () => {
  const handleTripSubmit = (tripDetails) => {
    // logic to generate packing list
  };

  return (
    <main>
      <h1>Welcome to the Packing Checklist Generator</h1>
      <TripForm onSubmit={handleTripSubmit} />
    </main>
  );
};

export default HomePage;
