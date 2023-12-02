import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoutes from "./auth/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

function Routes() {
  return (
    <BrowserRouter>
      <main className="w-full md:w-4/5 lg:w-9/12 mx-auto bg-white h-[100vh]">
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoutes
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoutes
            path="/admin/products"
            exact
            component={ManageProducts}
          />
          <AdminRoutes
            path="/admin/create/product"
            exact
            component={AddProduct}
          />
          <AdminRoutes
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
          <AdminRoutes path="/admin/orders" exact component={Orders} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default Routes;
