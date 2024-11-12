import { useLocation } from "react";
import PackingList from "../../components/PackingList/PackingList";
import "./PackingListPage.scss";

const PackingListPage = () => {
  const location = useLocation();
  const { packingList } = location.state || {};

  if (!packingList) {
    return <p>No packing list data available.</p>;
  }

  const handleSave = () => {
    // logic to save the packing list
  };

  return (
    <div>
      <h2>Your Packing List</h2>
      <PackingList items={packingList} />
      {/* <button onClick={onSave}>Save Packing List</button> */}
    </div>
  );
};

export default PackingListPage;
