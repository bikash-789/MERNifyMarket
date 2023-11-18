import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth/index";
import "./Signin.css";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/index";

// Signin component
function Signin() {
  // Create a state hook to store form details
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectTo: false,
  });

  // Object destructuring
  const { email, password, error, loading, redirectTo } = values;
  
  // Checks if user is authenticated or not based on cookie set / not set
  const { user } = isAuthenticated();

  // Method to handle the changes in form data if there is
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Method to submit the form data to backend
  const handleSubmit = (e) => {
    // This will prevent the page from reloading
    e.preventDefault();
    // signin - a method that sends form data to backend and returns the response
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          redirectTo: false,
        });
      } else {
        // A method to authenticate user - add user details in local storage
        authenticate(data, () => {
          setValues({
            ...values,
            redirectTo: true,
          });
        });
      }
    });
  };

   // Method that displays error
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  };
  // Method that displays loading message
  const showLoading = () => {
    return loading && (
      <div className="alert alert-infor">
        <h2>Loading...</h2>
      </div>
    );
  };

  // Method that redirects user to user/admin dashboard
  const redirectUser = () => {
    if (redirectTo) {
      if (user.role === 1) {
        console.log(user);
        return <Redirect to="/admin/dashboard" />;
      }
      return <Redirect to="/user/dashboard" />;
    }
  };

  // Signin form
  const signInForm = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-12 col-md-6 offset-md-3 d-flex flex-column align-items-center form-content">
              <h1>Sign In</h1>
              <form>
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <div>
      <Layout showCarousel={true}>
        {showError()}
        {showLoading()}
        {redirectUser()}
        {signInForm()}
      </Layout>
    </div>
  );
}

export default Signin;
