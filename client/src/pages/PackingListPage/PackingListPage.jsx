import { useLocation } from "react-router-dom";
import PackingList from "../../components/PackingList/PackingList";
import "./PackingListPage.scss";

const PackingListPage = ({ isDarkMode }) => {
  const location = useLocation();
  const { packingList } = location.state || {};

  if (!packingList) {
    return <p>No packing list data available.</p>;
  }
  console.log(packingList);

  return (
    <div>
      <h2>Your Packing List</h2>
      <PackingList category={packingList} />
      {/* <button onClick={onSave}>Save Packing List</button> */}
    </div>
  );
};

export default PackingListPage;
