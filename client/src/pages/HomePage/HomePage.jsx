import TripForm from "../../components/TripForm/TripForm";
import "./HomePage.scss";

const HomePage = ({ isDarkMode }) => {
  const handleTripSubmit = (tripDetails) => {
    // logic to generate packing list
  };

  return (
    <main className="main">
      <h1 className="main__title">Packing Checklist Generator</h1>
      <TripForm onSubmit={handleTripSubmit} isDarkMode={isDarkMode} />
    </main>
  );
};

export default HomePage;
