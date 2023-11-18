import React from "react";

function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3 card-img-top"
        style={{
          objectFit: "fill",
          height: "200px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default ShowImage;
