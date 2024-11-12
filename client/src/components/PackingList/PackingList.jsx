import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./PackingList.scss";
import { v4 as uuidv4 } from "uuid";

const PackingList = ({ items }) => {
  const [itemStates, setItemStates] = useState(
    items.map((item) => ({
      id: uuidv4(),
      name: item,
      isCrossed: false,
    }))
  );

  const handleToggle = (id) => {
    const newItemsStates = itemStates.map((item) =>
      item.id === id ? { ...item, isCrossed: !item.isCrossed } : item
    );
    setItemStates(newItemsStates);
  };

  return (
    <ul>
      {itemStates.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </ul>
  );
};

export default PackingList;
