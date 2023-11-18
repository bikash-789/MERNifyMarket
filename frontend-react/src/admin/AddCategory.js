import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";
function AddCategory() {
  const { user, token } = isAuthenticated();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //request to api for creating category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const showSuccess = () => {
    if (name && success) {
      return (
        <p className="alert alert-success">
          {`Successfully created ${name} category`}
        </p>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <p className="alert alert-danger">
          {`It seems like ${name} category already exists!`}
        </p>
      );
    }
  };

  return (
    <Layout
      title="Create Category"
      description={`Welcome ${user.name}, add some categories!`}
      showCarousel={false}
    >
      {showSuccess()}
      {showError()}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col col-md-6 offset-md-3 mb-3">
            <label for="category-name" className="form-label mt-3">
              Category name
            </label>
            <input
              type="text"
              name="categoryName"
              className="form-control"
              id="category-name"
              autoFocus
              required
              value={name}
              onChange={handleChange}
            />
            <div className="mt-3">
              <button className="btn btn-outline-dark">Create Category</button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default AddCategory;
