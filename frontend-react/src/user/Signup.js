import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";
import "./Signin.css";


// Signup Component
function Signup() {
  // Create a state hook to store form details
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "", // this will help us to find out what gone wrong
    success: false,
  });

  // Object destructuring
  const { name, email, password, error, success } = values;
  
  // Method to handle the changes in form data if there is
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      error: false,
      [name]: value,
    });
  };

  // Method to submit the form data to backend
  const handleSubmit = (e) => {
    // This will prevent the page from reloading
    e.preventDefault();

    // signup - a method that sends form data to backend and returns the response
    signup({ name, email, password }).then((data) => {
      // If error in response - we set the error state to response error
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: false,
          success: true,
        });
      }
    });
  };

  // Signup form 
  const signUpForm = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-12 col-md-6 offset-md-3 d-flex flex-column align-items-center form-content">
              <h1>Sign Up</h1>
              <form>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={password}
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

  // Method that displays error
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  // Method that displays successful signup message
  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };
  return (
    <div>
      <Layout showCarousel={true}>
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </Layout>
    </div>
  );
}

export default Signup;
