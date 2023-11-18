import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import "./dashboard.css";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

function UserDashboard() {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);
  return (
    <div className="container">
      <Layout showCarousel={false}>
        <div className="container">
          <div className="row p-3">
            <div className="col col-12 col-md-4 border profile-col">
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
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "orange" }}
                  >
                    <i className="bi bi-bag-fill mx-2">My Cart</i>
                  </Link>
                  <Link
                    to={`/profile/${_id}`}
                    style={{ textDecoration: "none", color: "green" }}
                  >
                    <i className="bi bi-person-lines-fill mx-2">
                      Update Profile
                    </i>
                  </Link>
                </div>
                <p
                  className="user-status"
                  style={{
                    color: "red",
                    borderBottom: "2px solid black",
                    borderTop: "2px solid black",
                  }}
                >
                  {role === 1 ? "Admin" : "Registered user"}
                </p>
              </div>
            </div>
            <div className="col col-12 col-md-8 my-2">
              <div className="card">
                <div
                  className="card-header"
                  style={{ color: "indigo", borderBottom: "2px solid red" }}
                >
                  <i className="bi bi-receipt" />
                  &nbsp; Purchase History
                </div>
                <div>
                  {history &&
                    history.map((h, oIndex) => (
                      <ul className="list-group list-group-flush">
                        {h.products.map((p, pIndex) => (
                          <li key={pIndex} className="list-group-item">
                            {`${p.name} on ${p.createdAt}`}
                          </li>
                        ))}
                      </ul>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UserDashboard;
