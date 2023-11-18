import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Card({ product }) {
  const [redirect, setRedirect] = useState(false);
  const addToCart = ()=>{
    addItem(product, ()=>{
      setRedirect(true);
    })
  }

  const shouldRedirect = redirect =>{
    if(redirect){
      console.log('redirected to cart');
      return <Redirect to="/cart"/>
    }
  }

  return (
    <>
      <div className="col mb-3">
        <div className="card mt-3" style={{ width: "18rem" }}>
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <div className="card-body">
            <h5 className="card-title">
              {product.name && product.name.substring(0, 25)}
            </h5>
            <p className="card-text">
              {product.description && product.description.substring(0, 30)}
            </p>
            <h4>{`Rs. ${product.price}`}</h4>
          </div>
          <div className="card-footer">
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-outline-warning mx-2">
                View Details
              </button>
            </Link>
            <button onClick={addToCart} className="btn btn-outline-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
