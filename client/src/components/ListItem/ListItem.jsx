import "./ListItem.scss";

const ListItem = ({ item, onToggle }) => {
  return (
    <li onClick={onToggle}>
      <input type="checkbox" checked={item.isCrossed} readOnly />
      {item.name}
    </li>
  );
};

export default ListItem;
