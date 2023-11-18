import React, { useState, useEffect, Fragment } from "react";

function RadioBox({ prices, handleFilters }) {
  // state to manage input change
  const [value, setValue] = useState(0);

  // Handle changes to input
  const handleChange = (event) => {
    // function call - returns filtered products
    handleFilters(event.target.value);
    // update the state
    setValue(event.target.value);
  };
  return prices.map((p, i) => {
    return (
      <div key={i}>
        <input
          onChange={handleChange}
          type="radio"
          name={p}
          className="ms-2"
          value={`${p._id}`}
        />
        <label className="form-check-label mx-2">{p.name}</label>
      </div>
    );
  });
}

export default RadioBox;
