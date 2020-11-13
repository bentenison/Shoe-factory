import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Nav from "./components/layout/Nav";
import { Dashboard } from "./components/product/Dashboard";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Add from "./components/product/Add";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase,
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore,
  reduxFirestore,
} from "redux-firestore"; // <- needed if using firestore
import authReducer from "./redux/reducers/authReducer";
import productReducer from "./redux/reducers/productReducer";
import thunk from "redux-thunk";
import { Profile } from "./components/auth/Profile";
import Cart from "./components/product/Cart";
import { Orders } from "./components/auth/Orders";
import { Menu } from "./components/layout/Menu";
import {AnimatePresence} from "framer-motion"
var firebaseConfig = {
  apiKey: "AIzaSyBWg3SdjO-7OTnf_qt-4b894QGayTTHgpE",
  authDomain: "ecommerce-tan.firebaseapp.com",
  databaseURL: "https://ecommerce-tan.firebaseio.com",
  projectId: "ecommerce-tan",
  storageBucket: "ecommerce-tan.appspot.com",
  messagingSenderId: "556351330523",
  appId: "1:556351330523:web:188ebf66ec95df976354fe",
  measurementId: "G-VHY3SC1X34",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer, // <- needed if using firestore
  product: productReducer,
});
const rfConfig = {};
// Create store with reducers and initial state
const initialState = {};
const middleware = [thunk.withExtraArgument(getFirestore, getFirebase)];
const createStoreWithFirebase = compose(
  reduxFirestore(firebase, rfConfig) // firebase instance as first argument, rfConfig as optional second
)(createStore);
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* <Router> */}
        <Nav />
        <Menu />
        <div className="App">
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path="/" exact component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/add" component={Add} />
              <Route path="/profile" component={Profile} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={Orders} />
              {/* <Route path="/checkout" component={Checkout} /> */}
            </Switch>
          </AnimatePresence>
        </div>
        {/* </Router> */}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
