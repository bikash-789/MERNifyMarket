import React, { useState } from "react";

function CheckBox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);
  // ON checked checkbox this function gets triggered 
  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    //if currently checked was not already in checked state, push into checked
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    }
    //else pull off
    else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // update the state with new categories
    setChecked(newCheckedCategoryId);
    // function call - returns filtered products
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => {
    return (
      <li key={i} className="list-unstyled">
        <input
          onChange={handleToggle(c._id)}
          type="checkbox"
          className="form-check-input"
          value={checked.indexOf(c._id) === -1}
        />
        <label className="form-check-label mx-2">{c.name}</label>
      </li>
    );
  });
}

export default CheckBox;
