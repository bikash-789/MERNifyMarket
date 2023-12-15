import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth/index";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/index";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Spinner } from "@nextui-org/react";

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
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Object destructuring
  const { email, password, error, loading, redirectTo } = values;

  // Checks if user is authenticated or not based on cookie set / not set
  const { user } = isAuthenticated();

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
    setValues({ ...values, loading: true });
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
            loading: false,
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
        className="mt-3 md:20 shadow-md rounded-md bg-red-200 text-red-800 px-3 py-2 w-fit flex justify-start items-center mx-auto"
        style={{ display: error ? "" : "none" }}
      >
        Error: {error}
      </div>
    );
  };
  // Method that displays loading message
  const showLoading = () => {
    return loading && <Spinner />;
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

  const signInForm = () => {
    return (
      <div className=" w-11/12 px-4 mx-auto lg:w-4/12 flex flex-col items-center bg-white shadow-lg rounded-xl pb-5 pt-2 mt-10">
        <h1 className="text-2xl text-center text-slate-600">Login</h1>
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
        <br />
        <Button
          color="primary"
          variant="flat"
          onClick={handleSubmit}
          className="mt-4"
        >
          Login
        </Button>
        {showLoading()}
      </div>
    );
  };

  return (
    <div>
      <Layout showCarousel={true}>
        {showError()}
        {redirectUser()}
        {signInForm()}
      </Layout>
    </div>
  );
}

export default Signin;
