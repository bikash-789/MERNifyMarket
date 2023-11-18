import React from "react";
import Layout from "../core/Layout";
import "./dashboard.css";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
function AdminDashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <div className="container">
      <Layout showCarousel={false}>
        <div className="container">
          <div className="row p-3 fs-3">
            <div className="col col-12 offset-md-3 col-md-6 border profile-col">
              <div className="image-cont d-flex justify-content-center align-items-center">
                <img
                  src="https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45837377.jpg"
                  alt="profile"
                />
              </div>
              <div className="profile-card d-flex flex-column justify-content-evenly align-items-center">
                <p>{name}</p>
                <p>{email}</p>
                <div
                  className="d-flex flex-wrap justify-content-center align-items-center"
                  style={{ width: "100%" }}
                >
                  <ul type="none">
                    <li className="p-2">
                      <Link
                        to="/admin/create/category"
                        className="mx-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="bi bi-cart-plus" /> Create Category
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link
                        to="/admin/create/product"
                        className="mx-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i class="bi bi-patch-plus"></i> Create Product
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link
                        to="/admin/orders"
                        className="mx-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i class="bi bi-minecart-loaded"></i> View Orders
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link
                        to="/admin/products"
                        className="mx-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i class="bi bi-kanban"></i> Manage Products
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="user-status">
                  {role === 1 ? "Admin" : "Registered user"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AdminDashboard;
