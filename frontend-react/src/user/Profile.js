import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Profile({ match }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: false,
  });

  const { name, email, password, success, error } = values;
  const { user, token } = isAuthenticated();
  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };
  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };
  const profileUpdate = (name, email, password) => {
    return (
      <form className="w-25 mx-auto my-2">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>
        <br />
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };
  return (
    <Layout
      showCarousel={false}
      className={`container-fluid`}
      title={"Profile"}
      description={"Update your profile"}
    >
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
}

export default Profile;
