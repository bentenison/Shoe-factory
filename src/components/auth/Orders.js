import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
export const Orders = () => {
  useFirestoreConnect(["orders"]);
  useFirestoreConnect(["products"]);
  const user = useSelector((state) => state.firebase.auth.uid);
  const getOrders = useSelector((state) => state.firestore.ordered.orders);
  const products = useSelector((state) => state.firestore.ordered.products);
  let userOrders = [];
  if (getOrders && products) {
    const orders = getOrders.filter((cart) => cart.userId === user);
    const removeDuplicate = (data, key) => {
      return [...new Map(data.map((x) => [key(x), x])).values()];
    };
    const myorders = removeDuplicate(orders, (it) => it.productId);
    myorders.forEach((item) => {
      const cartItem = products.filter(
        (product) => item.productId === product.id
      )[0];
      userOrders.push(cartItem);
    });
    console.log(orders);
    console.log(userOrders);

    //console.log(myOrders)
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="row">
          <div className="card col s12 m12">
            <table className="striped centered responsive-table">
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Product Title</th>
                  <th>Product Price</th>
                  <th>Delete</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {userOrders.map((order) => {
                  return (
                    <tr className="hoverable" key={order.id}>
                      <td>{order.vendor}</td>
                      <td>{order.productTitle}</td>
                      <td>{order.price}</td>
                      <td>
                        <a
                          href="#"
                          className="red-text text-accent-2 center-align btn-flat"
                        >
                          Cancel Order
                        </a>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="blue-text text-accent-2 center-align btn-flat"
                        >
                          Status
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
