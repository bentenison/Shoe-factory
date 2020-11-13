import React from "react";
import { CartItem } from "./CartItem";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { useHistory } from "react-router";
import { AddOrder } from "../../redux/actions/OrderActions";
import Checkout from "../payments/Checkout";
import { motion } from "framer-motion";
const Cart = ({ AddOrder }) => {
  useFirestoreConnect(["carts"]);
  useFirestoreConnect(["products"]);
  const user = useSelector((state) => state.firebase.auth.uid);
  const carts = useSelector((state) => state.firestore.ordered.carts);

  const products = useSelector((state) => state.firestore.ordered.products);
  const history = useHistory();
  let cartItems = [];

  if (carts && products) {
    const items = carts.filter((cart) => cart.userId === user);
    const removeDuplicate = (data, key) => {
      return [...new Map(data.map((x) => [key(x), x])).values()];
    };
    const mycart = removeDuplicate(items, (it) => it.productId);
    mycart.forEach((item) => {
      const cartItem = products.filter(
        (product) => item.productId === product.id
      )[0];
      cartItems.push(cartItem);
    });
    const sum = (key) => {
      return cartItems.reduce((a, b) => parseInt(a) + parseInt(b[key] || 0), 0);
    };
    //console.log(items);
    const Total_price = sum("price");
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="row">
          <div className="card col s12 m12">
            {cartItems &&
              cartItems.map((item) => {
                return <CartItem item={item} key={item.id} />;
              })}
          </div>
          <div className="card col s12 m12">
            <div className="row">
              <div className="col s6 m6">
                <h5 className="grey-text text-darken-1 left-align">
                  CART TOTAL
                </h5>
              </div>
              <div className="col s6 m6">
                <h5 className="right-align">RS.{sum("price")}</h5>
              </div>
            </div>
            <div class="row">
              <div class="div col s6 m6">
                <button
                  className="btn waves-effect waves-light orange darken-2 left"
                  onClick={() => history.push("/")}
                >
                  Back
                  <i className="material-icons left">cancel</i>
                </button>
              </div>
              <div class="col s6 m6">
                <Checkout
                  Total_price={Total_price}
                  items={items}
                  AddOrder={AddOrder}
                />
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

const mapDispatchToProps = (dispatch) => {
  return {
    AddOrder: (items) => dispatch(AddOrder(items)),
  };
};
export default connect(null, mapDispatchToProps)(Cart);
