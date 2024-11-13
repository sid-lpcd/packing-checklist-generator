import { useLocation } from "react-router-dom";
import PackingList from "../../components/PackingList/PackingList";
import "./PackingListPage.scss";

const PackingListPage = () => {
  const location = useLocation();
  const { packingList } = location.state || {};

  if (!packingList) {
    return <p>No packing list data available.</p>;
  }

  return (
    <main className="main-wrapper">
      <h2>Your Packing List</h2>
      <PackingList category={packingList} />
      {/* <button onClick={onSave}>Save Packing List</button> */}
    </main>
  );
};

export default PackingListPage;
