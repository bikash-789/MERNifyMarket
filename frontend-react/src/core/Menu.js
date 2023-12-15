import React from "react";
import { Link as Linkk, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Badge,
} from "@nextui-org/react";
import MernifyLogo from "../assets/logo.svg";
import "./Menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return true;
  } else return false;
};

function Menu({ history }) {
  const { name, email, role } = isAuthenticated() && isAuthenticated().user;
  const fullName = name && name.split(" ");
  const firstName = fullName && fullName[0][0];
  const lastName = fullName && fullName[1] && fullName[1][0];
  return (
    <Navbar>
      <NavbarBrand>
        <Linkk to="/">
          <img src={MernifyLogo} width={170} height={170} alt="brand-logo" />
        </Linkk>
      </NavbarBrand>

      <NavbarContent
        className="hidden lg:flex sm:w-2/5 w-11/12 gap-4"
        justify="center"
      >
        <NavbarItem isActive={isActive(history, "/") === true ? true : false}>
          <Linkk to="/" className="text-black">
            Home
          </Linkk>
        </NavbarItem>
        <NavbarItem
          isActive={isActive(history, "/shop") === true ? true : false}
        >
          <Linkk to="/shop" className="text-black">
            Shop
          </Linkk>
        </NavbarItem>
        <NavbarItem
          isActive={isActive(history, "/cart") === true ? true : false}
        >
          <Linkk to="/cart" className="text-black">
            <Badge content={itemTotal()} color="danger" placement="top-right">
              Cart
            </Badge>
          </Linkk>
        </NavbarItem>
      </NavbarContent>

      {!isAuthenticated() ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary" variant="light">
              <Linkk to="/signin">Login</Linkk>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="ghost">
              <Linkk to="/signup" className="link">
                Signup
              </Linkk>
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {/* <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={name}
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              /> */}
              <div className="bg-orange-500 rounded-full w-[45px] h-[45px] flex justify-center items-center border-2 border-slate-400">
                <span className="text-white">
                  {firstName !== null ? firstName + lastName : "U"}
                </span>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard">
                <Linkk to={role === 0 ? "/user/dashboard" : "/admin/dashboard"}>
                  Profile
                </Linkk>
              </DropdownItem>
              {role === 0 ? (
                <DropdownItem key="mypurchasehistory">
                  <Linkk to="/">My Purchase history</Linkk>
                </DropdownItem>
              ) : (
                ""
              )}
              <DropdownItem key="shop">
                <Linkk to="/shop">Shop</Linkk>
              </DropdownItem>
              {role === 0 ? (
                <DropdownItem key="cart">
                  <Linkk to="/cart">Cart</Linkk>
                </DropdownItem>
              ) : (
                ""
              )}
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
export default withRouter(Menu);
