import React, { useState } from "react";
import { updateItem, removeItem, addItem } from "./cartHelpers";
import ShowImageL from "./ShowImageL";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@nextui-org/react";
// Product card
const ProductCard = ({
  product,
  showAddToCartButton,
  cartUpdate,
  cartRemove,
  cartModificationCallback,
}) => {
  const [count, setCount] = useState(product.count);
  const [redirect, setRedirect] = useState(false);
  // Function to add items to cart
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = (redirect) => {
    if (redirect) {
      // console.log('redirected to cart');
      return <Redirect to="/cart" />;
    }
  };
  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
    cartModificationCallback();
  };

  // show the option to increment/decrement quantity of product
  const cartUpdateOptions = () => {
    return (
      <div className="flex items-center justify-start gap-1">
        <small className="inline-block font-medium">Adjust Quantity: </small>
        <input
          type="number"
          className="border-1 border-slate-200 inline-block w-12 font-sans text-slate-600 rounded-md px-1"
          value={count}
          onChange={handleChange(product._id)}
        />
      </div>
    );
  };
  // show the option to remove from cart
  const cartRemoveOption = () => {
    return (
      <Button
        color="danger"
        variant="ghost"
        className="mt-2"
        onClick={() => {
          removeItem(product._id);
          cartModificationCallback();
        }}
      >
        Remove
      </Button>
    );
  };
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center w-full">
      {shouldRedirect(redirect)}
      <div className="w-full lg:w-4/12 flex items-center justify-center">
        <ShowImageL item={product} url="product" />
      </div>
      <div className="w-full lg:w-8/12 p-4">
        <p className="text-2xl">{product.name}</p>
        <p className="text-xl text-slate-700">{product.description}</p>
        <p className="text-xl text-slate-700">Rs. {product.price}/-</p>
        <small
          className={`rounded-lg px-2 py-[1px] shadow-sm ${
            product.quantity > 0
              ? "bg-green-600 text-green-100"
              : "bg-red-600 text-red-100"
          }`}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </small>
        <br />
        <br />
        <p className="text-slate-700">
          ~{product.category && product.category.name}
        </p>
        {showAddToCartButton && (
          <Button
            color="primary"
            variant="ghost"
            onClick={addToCart}
            className="mt-4"
          >
            Add to Cart
          </Button>
        )}
        {cartUpdate && cartUpdateOptions()}
        {cartRemove && cartRemoveOption()}
      </div>
    </div>
  );
};
export default ProductCard;
