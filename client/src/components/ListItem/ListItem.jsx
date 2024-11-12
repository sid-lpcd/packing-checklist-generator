import "./ListItem.scss";

const ListItem = ({ itemName, onToggle }) => {
  return (
    <li onClick={() => onToggle(item.id)}>
      <input type="checkbox" checked={item.packed} readOnly />
      {itemName}
    </li>
  );
};

export default ListItem;
