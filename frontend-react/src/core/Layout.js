import React from "react";
import Carousel from "./Carousel";

function Layout({ title, description, className, children, showCarousel }) {
  return (
    <div>
      {showCarousel ? <Carousel /> : ""}
      <div className={className}>
        {title && description && (
          <div className="flex flex-col py-5 px-5 bg-opacity-50 bg-secondary">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Layout;
