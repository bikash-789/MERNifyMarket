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
        <h2 className="p-3 text-lg font-medium">
          Your cart has {`${items.length}`} items
        </h2>
        <hr className="text-slate-400 mr-12 h-2 ml-3" />
        <div className="flex flex-col justify-start items-center gap-4 my-2 px-3">
          {items.map((product, i) => {
            return (
              <>
                <ProductCard
                  key={i}
                  product={product}
                  cartUpdate={true}
                  cartRemove={true}
                  // Pass the callback function to the child component
                  cartModificationCallback={handleCartModification}
                />
                <hr className="text-slate-400 mx-3 h-2" />
              </>
            );
          })}
        </div>
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
    <div className="h-[100vh] flex flex-col lg:flex-row">
      <div className="w-full lg:w-6/12 overflow-y-scroll">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </div>
      <div className="w-full lg:w-6/12 p-2">
        <h2 className="text-lg font-medium">Your cart summary</h2>
        <br />
        <hr className="text-slate-400 mr-12 h-2" />
        <Checkout
          products={items}
          cartModificationCallback={handleCartModification}
        />
      </div>
    </div>
  );
};

export default Cart;
