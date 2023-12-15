import React, { useEffect, useState } from "react";
import { getProducts } from "./apiCore";
import PCard from "./PCard";
import Searchbar from "./Searchbar";
import Carousel from "./Carousel";
function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <div className="px-1 md:px-5 pb-5">
      <Carousel />
      <br />
      <Searchbar />
      <h1 className="text-xl md:text-4xl md:px-10">Products by arrival</h1>
      <div className="flex flex-row justify-center lg:justify-between items-center gap-5 flex-wrap mt-2 md:px-10">
        {productsByArrival &&
          productsByArrival.map((product, index) => {
            return <PCard key={index} product={product} />;
          })}
      </div>
      <br />
      <br />
      <p className="text-xl md:text-4xl md:px-10">Best Sellers</p>
      <div className="flex flex-row justify-center lg:justify-between items-center gap-5 flex-wrap mt-2 md:px-10">
        {productsBySell &&
          productsBySell.map((product, index) => {
            return <PCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
}

export default Home;
