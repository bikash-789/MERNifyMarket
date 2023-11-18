import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Checkout from "./Checkout";

const Cart = () => {
    // this state keeps track of cart items
  const [items, setItems] = useState([]);

//   load the products that are in the cart from local storage (getCart is a function that returns items from local storage)
  useEffect(() => {
    // Fetch the initial cart items when the component mounts
    setItems(getCart());
  }, []);

  // This function will be called when there is a modification in the cart
  const handleCartModification = () => {
    // Update the items state with the latest cart items
    setItems(getCart());
  };

//   function to show products that are in the cart
  const showItems = (items) => {
    return (
      <div>
        <h2 className="p-2">Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => {
          return (
            <ProductCard
              key={i}
              product={product}
              cartUpdate={true}
              cartRemove={true}
              // Pass the callback function to the child component
              cartModificationCallback={handleCartModification}
            />
          );
        })}
      </div>
    );
  };

//   shows message to user when there is no any item in cart
  const noItemsMessage = () => {
    return (
      <h2>
        Your cart is empty
        <br />
        <Link to="/shop">Continue shopping</Link>
      </h2>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add/Remove/Checkout or Continue Shopping"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} cartModificationCallback = {handleCartModification}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
