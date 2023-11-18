import React from "react";

function Carousel() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=jpg&quality=90&v=1614559651"
            className="d-block w-100"
            alt="electronics"
            style={{
              backgroundRepeat: "noRepeat",
              height: "20rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://qph.fs.quoracdn.net/main-qimg-1566b540237fb844b0e545081ab5efb1"
            className="d-block w-100"
            alt="payments-methods"
            style={{
              backgroundRepeat: "noRepeat",
              height: "20rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://d3eys52k95jjdh.cloudfront.net/wp-content/uploads/2018/09/new-amazon-echo-alexa-devices.png"
            className="d-block w-100"
            alt="payments-methods"
            style={{
              backgroundRepeat: "noRepeat",
              height: "20rem",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
