import React from "react";
import ProductList from "../product/ProductList";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { ProductCarousel } from "../layout/ProductCarousel";
import { Redirect } from "react-router";
import { motion } from "framer-motion";
export const Dashboard = (props) => {
  useFirestoreConnect(["products"]);
  const products = useSelector((state) => state.firestore.ordered.products);
  const userId = useSelector((state) => state.firebase.auth.uid);
  // if (!userId) return<Redirect to="/" />;
  let list = null;
  if (products)
    list = products.map((product) => {
      return <ProductList product={product} key={product.id} userId={userId} />;
    });
  else
    list = (
      <div className="container">
        <h1 className="center-align">Loading...</h1>
      </div>
    );

  return (
    <>
      <ProductCarousel />
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="row">{list}</div>
      </motion.div>
    </>
  );
};
