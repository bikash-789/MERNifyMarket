import React from "react";
import { Link as Linkk, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
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

// function Menu({ history }) {
//   return (
//     <div>
//       <ul className="nav nav-tabs bg-dark py-2">
//         <li className="nav-item mx-2 p-1">
//           <Link className="hover-li" style={isActive(history, "/")} to="/">
//             Home
//           </Link>
//         </li>
//         <li className="nav-item mx-2 p-1">
//           <Link
//             className="hover-li"
//             style={isActive(history, "/shop")}
//             to="/shop"
//           >
//             Shop
//           </Link>
//         </li>
//         <li className="nav-item mx-2 p-1">
//           <Link
//             className="hover-li"
//             style={isActive(history, "/cart")}
//             to="/cart"
//           >
//             Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
//           </Link>
//         </li>
//         <li className="nav-item mx-2 p-1">
//           {isAuthenticated() && isAuthenticated().user.role === 1 ? (
//             <Link
//               className="hover-li"
//               style={isActive(history, "/admin/dashboard")}
//               to="/admin/dashboard"
//             >
//               Dashboard
//             </Link>
//           ) : (
//             <Link
//               className="hover-li"
//               style={isActive(history, "/user/dashboard")}
//               to="/user/dashboard"
//             >
//               Dashboard
//             </Link>
//           )}
//         </li>
//         {!isAuthenticated() && (
//           <>
//             <li className="nav-item mx-2 p-1">
//               <Link
//                 className="hover-li"
//                 style={isActive(history, "/signin")}
//                 to="/signin"
//               >
//                 Signin
//               </Link>
//             </li>
//             <li className="nav-item mx-2 p-1">
//               <Link
//                 className="hover-li"
//                 style={isActive(history, "/signup")}
//                 to="/signup"
//               >
//                 Signup
//               </Link>
//             </li>
//           </>
//         )}
//         {isAuthenticated() && (
//           <>
//             <li className="nav-item mx-2 p-1">
//               <span
//                 className="hover-li"
//                 style={{ cursor: "pointer", color: "white" }}
//                 onClick={() =>
//                   signout(() => {
//                     history.push("/");
//                   })
//                 }
//               >
//                 Signout
//               </span>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// }

function Menu({ history }) {
  const { name, email } = isAuthenticated() && isAuthenticated().user;
  return (
    <Navbar>
      <NavbarBrand>
        <Linkk to="/">
          <img src={MernifyLogo} width={170} height={170} />
        </Linkk>
      </NavbarBrand>

      <NavbarContent
        className="hidden lg:flex sm:w-2/5 w-11/12 gap-4"
        justify="center"
      >
        <NavbarItem isActive={isActive(history, "/") == true ? true : false}>
          <Linkk to="/" className="text-black">
            Home
          </Linkk>
        </NavbarItem>
        <NavbarItem
          isActive={isActive(history, "/shop") == true ? true : false}
        >
          <Linkk to="/shop" className="text-black">
            Shop
          </Linkk>
        </NavbarItem>
        <NavbarItem
          isActive={isActive(history, "/cart") == true ? true : false}
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
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={name}
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard">
                <Linkk to="/dashboard">Dashboard</Linkk>
              </DropdownItem>
              <DropdownItem key="mypurchasehistory">
                <Linkk to="/dashboard">My Purchase history</Linkk>
              </DropdownItem>
              <DropdownItem key="shop">
                <Linkk to="/shop">Shop</Linkk>
              </DropdownItem>
              <DropdownItem key="cart">
                <Linkk to="/cart">Cart</Linkk>
              </DropdownItem>
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
