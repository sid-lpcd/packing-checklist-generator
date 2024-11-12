import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./PackingList.scss";
import { v4 as uuidv4 } from "uuid";

const PackingList = ({ category }) => {
  console.log(category);
  const [categoryStates, setCategoryStates] = useState(
    category.map((category) => ({
      name: category.name,
      id: uuidv4(),
      items: category.items.map((item) => ({
        id: uuidv4(),
        name: item,
        isCrossed: false,
      })),
    }))
  );

  const handleToggle = (categoryId, itemId) => {
    const newCategoryStates = categoryStates.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) =>
            item.id === itemId ? { ...item, isCrossed: !item.isCrossed } : item
          ),
        };
      }
      return category;
    });
    setCategoryStates(newCategoryStates);
  };

  return (
    <ul>
      {categoryStates.map((category) => (
        <div key={category.id} className="category">
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onToggle={() => handleToggle(category.id, item.id)}
              />
            ))}
          </ul>
        </div>
      ))}
    </ul>
  );
};

export default PackingList;
