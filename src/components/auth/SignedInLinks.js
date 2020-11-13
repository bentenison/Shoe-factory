import React from "react";
import { NavLink } from "react-router-dom";
export const SignedInLinks = ({ Logout, count }) => {
  return (
    <>
      <li>
        <NavLink to="/" className="waves-effect ">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/add" className="waves-effect">
          Add
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" className="waves-effect">
          Cart<span class=" badge orange white-text">{count} items</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className="waves-effect ">
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" className="waves-effect ">
          Orders
        </NavLink>
      </li>
      <li>
        <a
          onClick={Logout}
          className="btn-floating btn-small waves-effect waves-light red"
        >
          Logout
        </a>
      </li>
    </>
  );
};
