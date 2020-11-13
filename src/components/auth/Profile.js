import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"
export const Profile = () => {
  useFirestoreConnect(["users"]);
  const auth = useSelector((state) => state.firebase.auth);
  const users = useSelector((state) => state.firestore.ordered.users);
  let profile = null;
  if (users) {
    profile = users.filter((user) => user.id === auth.uid)[0];
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="col s12 m7">
          <h4 className="header center">User Profile</h4>
          <div className="card horizontal">
            <div className="card-image">
              <img src={profile.dp} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h6>Username:</h6>
                <h5>{profile.firstname + profile.lastname}</h5>
                <h6>Email:</h6>
                <h5>{auth.email}</h5>
              </div>
              <div className="card-action">
                <a href="/orders">Your Orders</a>
                <a href="/">Home</a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="center-align">Loading...</h1>
      </div>
    );
  }
};
