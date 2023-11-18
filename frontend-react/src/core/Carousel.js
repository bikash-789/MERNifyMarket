import React from "react";
import Cover1 from "../assets/cover-1.jpeg";
import Cover2 from "../assets/cover-2.png";
import Cover3 from "../assets/cover-3.png";
import Cover4 from "../assets/cover-4.jpeg";
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
            src={Cover1}
            className="d-block w-100"
            alt="electronics"
            style={{
              backgroundRepeat: "noRepeat",
              height: "25rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={Cover2}
            className="d-block w-100"
            alt="payments-methods"
            style={{
              backgroundRepeat: "noRepeat",
              height: "25rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={Cover3}
            className="d-block w-100"
            alt="payments-methods"
            style={{
              backgroundRepeat: "noRepeat",
              height: "25rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={Cover4}
            className="d-block w-100"
            alt="payments-methods"
            style={{
              backgroundRepeat: "noRepeat",
              height: "25rem",
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
