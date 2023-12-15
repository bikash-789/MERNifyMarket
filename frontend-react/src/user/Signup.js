import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Spinner } from "@nextui-org/react";

// Signup Component
function Signup() {
  // Create a state hook to store form details
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "", // this will help us to find out what gone wrong
    success: false,
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Object destructuring
  const { name, email, password, error, success, loading } = values;

  // Method to handle the changes in form data if there is
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      error: false,
      [name]: value,
    });
  };
  // Method that displays loading message
  const showLoading = () => {
    return loading && <Spinner />;
  };

  // Method to submit the form data to backend
  const handleSubmit = (e) => {
    // This will prevent the page from reloading
    e.preventDefault();
    setValues({ ...values, loading: true });
    // signup - a method that sends form data to backend and returns the response
    signup({ name, email, password }).then((data) => {
      // If error in response - we set the error state to response error
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: false,
          success: true,
          loading: false,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <div className=" w-11/12 px-4 mx-auto lg:w-4/12 flex flex-col items-center bg-white shadow-lg rounded-xl pb-3 pt-2 mt-10 mb-1">
        <h1 className="text-2xl text-center text-slate-600">Sign up</h1>
        <br />
        <Input
          type="text"
          variant="bordered"
          label="Name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="max-w-xs"
        />
        <br />
        <Input
          type="email"
          variant="bordered"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="max-w-xs"
        />
        <br />
        <Input
          label="Password"
          variant="bordered"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
        <Button
          color="primary"
          variant="flat"
          onClick={handleSubmit}
          className="mt-4"
        >
          Signup
        </Button>
        {showLoading()}
      </div>
    );
  };

  // Method that displays error
  const showError = () => {
    return (
      <div
        className="mt-3 md:20 shadow-md rounded-md bg-red-200 text-red-800 px-3 py-2 w-fit flex justify-start items-center mx-auto"
        style={{ display: error ? "" : "none" }}
      >
        Error: {error}
      </div>
    );
  };

  // Method that displays successful signup message
  const showSuccess = () => {
    return (
      <div
        className="mt-3 md:20 shadow-md rounded-md bg-green-200 text-green-800 px-3 py-2 w-fit flex justify-start items-center mx-auto"
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
