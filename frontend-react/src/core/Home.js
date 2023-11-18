import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Searchbar from "./Searchbar";
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
    <Layout showCarousel={true} className={`container-fluid`}>
      <Searchbar />
      <p className="display-5">Products by arrival</p>
      <hr />
      <div className="row">
        {productsByArrival && productsByArrival.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
      <br />
      <br />
      <p className="display-5">Best Sellers</p>
      <hr />
      <div className="row d-flex flex-wrap justify-content-center justify-content-md-start align-items-start">
        {productsBySell && productsBySell.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </Layout>
  );
}

export default Home;
