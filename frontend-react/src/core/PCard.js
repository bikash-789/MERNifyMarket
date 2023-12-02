import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  CardHeader,
  Button,
} from "@nextui-org/react";

function PCard({ product }) {
  const [redirect, setRedirect] = useState(false);
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

  return (
    <div className="drop-shadow-sm rounded-2xl border-2 border-slate-100 p-1">
      <div className="rounded-tl-2xl rounded-tr-2xl" style={{ width: "18rem" }}>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <div className="p-1">
          <h5 className="text-bold">
            {product.name && product.name.substring(0, 25)}
          </h5>
          <small className="">
            {product.description && product.description.substring(0, 30)}
          </small>
          <br />
          <p className="text-xl">{`Rs. ${product.price}/-`}</p>
          <small
            className={`rounded-lg px-2 py-[1px] shadow-sm ${
              product.quantity > 0
                ? "bg-green-500 text-green-100"
                : "bg-red-500 text-red-100"
            }`}
          >
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </small>
        </div>
        <div className="flex px-2 py-2 gap-2">
          <Link to={`/product/${product._id}`} className="">
            <Button color="warning" variant="flat">
              View Details
            </Button>
          </Link>
          <Button color="primary" variant="ghost" onClick={addToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PCard;
