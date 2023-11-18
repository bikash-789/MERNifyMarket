import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      showCarousel={false}
      className={`container-fluid`}
      title={"Manage Products"}
      description={"Perform CRUD on products"}
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group-item">
            {products &&
              products.map((p, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <strong className="ml-0 d-block">{p.name}</strong>
                    <Link
                      to={`/admin/product/update/${p._id}`}
                      className="d-block"
                    >
                      <span
                        className="btn btn-success"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </span>
                    </Link>
                    <span
                      onClick={() => destroy(p._id)}
                      style={{ cursor: "pointer" }}
                      className="btn btn-danger d-block"
                    >
                      Delete
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
