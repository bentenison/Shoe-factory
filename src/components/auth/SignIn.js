import React, { useState } from "react";
import { NavLink, useHistory,Redirect } from "react-router-dom";
import { connect,useSelector } from "react-redux";
import { Login } from "../../redux/actions/AuthActions";
import {isEmpty,isLoaded} from "react-redux-firebase"
const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.firebase.auth);

  if (isLoaded(auth) && !isEmpty(auth)) {
    return <Redirect to="/" />;
  }
  const Handlesubmit = (e) => {
    e.preventDefault();
    const User = {
      email,
      password,
    };
    //console.log(User)
    props.Login(User);
    // if (!props.autherror) {
    //   return history.push("/");
    // }
    console.log(props.autherror);
  };
  return (
    <div className="container">
      <div className="card">
        <h3 className="header center-align orange-text text-darken-2">
          Sign In
        </h3>
        <div className="row">
          <form className="col s12" onSubmit={Handlesubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light orange darken-2 right"
              type="submit"
              name="action"
            >
              Sign In
              <i className="material-icons right">done_all</i>
            </button>
          </form>
          {props.autherror ? (
            <p className="red-text text-darken-3 center">
              {props.autherror.message}
            </p>
          ) : (
            ""
          )}

          <p>
            Dont have an account ? <NavLink to="/signup">Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Login: (User) => dispatch(Login(User)),
  };
};
const mapStateToProps = (state) => ({
  autherror: state.auth.autherror,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
