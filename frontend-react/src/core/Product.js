import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { listRelated, read } from "./apiCore";
import ProductCard from "./ProductCard";
import Card from './Card';

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
        listRelated(data._id).then(data=>{
          if(data.error)
          {
            setError(data.error); 
          }
          else{
            setRelatedProduct(data);
          }
        })
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      

      <div className="row">
        <div className="col-8">
        {product && product.description && <ProductCard product={product} showAddToCartButton={true}/>}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((p, i)=>{
            return <Card key={i} product={p}/>
          })}
        </div>

      </div>
    </Layout>
  );
};

export default Product;
