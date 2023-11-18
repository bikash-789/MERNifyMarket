import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import "./Menu.css";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else return { color: "#ffffff" };
};

function Menu({ history }) {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark py-2">
        <li className="nav-item mx-2 p-1">
          <Link className="hover-li" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item mx-2 p-1">
          <Link
            className="hover-li"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item mx-2 p-1">
          <Link
            className="hover-li"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
          </Link>
        </li>
        <li className="nav-item mx-2 p-1">
          {isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Link
              className="hover-li"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="hover-li"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          )}
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item mx-2 p-1">
              <Link
                className="hover-li"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>
            <li className="nav-item mx-2 p-1">
              <Link
                className="hover-li"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item mx-2 p-1">
              <span
                className="hover-li"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
