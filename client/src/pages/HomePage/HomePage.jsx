import TripForm from "../../components/TripForm/TripForm";
import "./HomePage.scss";

const HomePage = ({ isDarkMode }) => {
  return (
    <main className="main">
      <h1 className="main__title">Packing Checklist Generator</h1>
      <TripForm isDarkMode={isDarkMode} />
    </main>
  );
};

export default HomePage;
