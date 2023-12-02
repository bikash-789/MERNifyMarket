import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { listRelated, read } from "./apiCore";
import ProductCard from "./ProductCard";
import PCard from "./PCard";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related product
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <div className="h-[100svh]">
      <div className="flex flex-col justify-start">
        <div className="w-full">
          {product && product.description && (
            <ProductCard product={product} showAddToCartButton={true} />
          )}
        </div>
        <br />
        <hr className="text-slate-400 mx-12 h-2" />
        <div className="w-full px-12 py-2">
          <h1 className="text-3xl font-normal text-slate-600 font-sans">
            You might also like
          </h1>
          <br />
          <div className="flex flex-row flex-wrap mt-2">
            {relatedProduct.map((p, i) => {
              return <PCard key={i} product={p} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
