import React from "react";
import { NavLink } from "react-router-dom";
import { SignOutLinks } from "../auth/SignOutLinks";
import { SignedInLinks } from "../auth/SignedInLinks";
import { SignedInLinksMobile } from "./Signinlinksmobile";
import { SignOutLinksMobile } from "./Signoutlinksmobile";
import { Logout } from "../../redux/actions/AuthActions";
import { connect, useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirestoreConnect } from "react-redux-firebase";
const Nav = ({ Logout }) => {
  const auth = useSelector((state) => state.firebase.auth);
  let cartitem = null;
  let count = null;
  useFirestoreConnect(["carts"]);
  const carts = useSelector((state) => state.firestore.ordered.carts);
  const user = auth.uid;
  if (carts) {
    cartitem = carts.filter((cart) => cart.userId === user);
    count = cartitem.length;
  }

  console.log(count);

  return (
    <div>
      <nav>
        <div className="nav-wrapper grey darken-3">
          <NavLink to="/" className="brand-logo">
            <img src={require("../../img/logoeccc.svg")} style={{width:"70px",height:"70px",marginLeft:"20px"}} alt="logo" />
          </NavLink>
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <SignedInLinks Logout={Logout} count ={count}/>
            </ul>
          ) : (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <SignOutLinks />
            </ul>
          )}
        </div>
      </nav>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src={require("../../img/office.jpg")} />
            </div>
            <a href="#user">
              <img className="circle" src={require("../../img/user.jpg")} />
            </a>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        {isLoaded(auth) && !isEmpty(auth) ? (
          <SignedInLinksMobile Logout={Logout} count={count} />
        ) : (
          <SignOutLinksMobile />
        )}

        {/* <li>
          <div class="divider"></div>
        </li> */}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch(Logout),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
