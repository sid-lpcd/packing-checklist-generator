import "./ListItem.scss";

const ListItem = ({ item, onToggle }) => {
  return (
    <li onClick={onToggle} className="item-list__item">
      <input type="checkbox" name="packed" checked={item.isCrossed} readOnly />
      <label
        htmlFor="packed"
        className={`item-list__label ${
          item.isCrossed ? "item-list__label--crossed" : ""
        }`}
      >
        {item.name}
      </label>
    </li>
  );
};

export default ListItem;
