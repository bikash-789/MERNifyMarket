import React, { useState } from "react";
import ShowImage from "./ShowImage";
import moment from "moment";
import {updateItem, removeItem} from "./cartHelpers";


function ProductCard({ product, showAddToCartButton, cartUpdate, cartRemove, cartModificationCallback }) {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
    cartModificationCallback();
  };

  // show the option to increment/decrement quantity of product
  const cartUpdateOptions = () =>{
    return <div>
      <div className="input-group-prepend">
        <span className="input-group-text">Adjust Quantity</span>
      </div>
      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
    </div>
  }
  // show the option to remove from cart
  const cartRemoveOption = ()=>{
    return <button className="btn-danger" onClick={()=>{
      removeItem(product._id);
      cartModificationCallback();
    }}>
      Remove 
    </button>
  }
  // show if the product is in stock
  const showStock = (quantity)=>{
    return quantity > 0 ? (<span className="badge badge-pill badge-primary text-primary">In Stock</span>) : (<span className="badge badge-danger badge-pill">Out of Stock</span>)
  }
  return (
    <>
      <div className="card mt-3 mx-auto" style={{ width: "30rem" }}>
        <ShowImage item={product} url="product" />
        <div className="card-body light-gray">
          <p className="lead mt-2 font-weight-bold ">
            {product.name && product.name.substring(0, 25)}
          </p>
          <p className="card-text">
            {product.description && product.description.substring(0, 30)}
          </p>
          <p className="black-10">{`Rs. ${product.price}`}</p>
          <p className="black-9">Category : {product.category && product.category.name}</p>
          <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
        </div>
        {showAddToCartButton && <div className="card-footer">
          <button className="btn btn-outline-primary">Add to Cart</button>
        </div>}
        {cartUpdate && cartUpdateOptions()}
        {cartRemove && cartRemoveOption()}
      </div>
    </>
  );
}
export default ProductCard;
