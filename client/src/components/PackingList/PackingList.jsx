import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./PackingList.scss";
import { v4 as uuidv4 } from "uuid";

const PackingList = ({ items }) => {
  const [isCrossed, setIsCrossed] = useState(false);

  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={uuidv4()}
          itemName={item}
          onToggle={() => {
            setIsCrossed(!isCrossed);
          }}
          isCrossed={isCrossed}
        />
      ))}
    </ul>
  );
};

export default PackingList;
