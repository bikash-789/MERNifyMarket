import React from "react";

function ShowImageL({ item, url }) {
  return (
    <img
      width={240}
      className="object-cover"
      src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
      alt={item.name}
    />
  );
}

export default ShowImageL;
