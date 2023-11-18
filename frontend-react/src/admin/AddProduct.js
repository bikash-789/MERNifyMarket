import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";

function AddProduct() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: "",
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  //load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true,
    });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={handleSubmit}>
        <h4 className="my-2">
          <i className="bi bi-upload mx-2" />
          Upload product image
        </h4>
        <div className="form-group my-2">
          <label className="btn btn-secondary">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group my-2">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group my-2">
          <label className="text-muted">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group my-2">
          <label className="text-muted">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            min="0"
            onChange={handleChange("price")}
          />
        </div>

        <div className="form-group my-2">
          <label className="text-muted">Category</label>
          <select className="form-control" onChange={handleChange("category")}>
            <option>Select Category</option>
            {categories &&
              categories.map((c, i) => {
                return (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group my-2">
          <label className="text-muted">Shipping</label>
          <select className="form-control" onChange={handleChange("shipping")}>
            <option>Select Shipping Option</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group my-2">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            min="1"
            onChange={handleChange("quantity")}
          />
        </div>
        <button className="btn btn-outline-dark mt-3">Create Product</button>
      </form>
    );
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger mt-2"
        style={{ display: error ? "" : "none" }}
      >
        <p>{error}</p>
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-success mt-2"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <p>{`Product: ${createdProduct} has been successfully created!`}</p>
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info mt-2">
          <p>Loading....</p>
        </div>
      )
    );
  };
  return (
    <Layout
      title="Create Product"
      description={`Welcome ${user.name}, add some products!`}
      showCarousel={false}
    >
      <div className="row">
        <div className="col col-8 offset-2 col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
