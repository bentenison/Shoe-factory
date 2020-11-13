import React, { useState } from "react";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";
const Checkout = ({ Total_price, items, AddOrder }) => {
  const [name, setName] = useState("Tanvir");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    //const price={amount:Total_price}
    const data = await fetch("https://payittome.herokuapp.com/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Total_price }),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_R9ppVcaZDmlxNR" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "SHOE FACTORY",
      description: "Pay your cart value and enjoy shopping wiyh us.",
      image: "https://payittome.herokuapp.com/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        AddOrder(items);
      },
      prefill: {
        name,
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      <button
        className="btn waves-effect waves-light orange darken-2 right"
        onClick={displayRazorpay}
      >
        Checkout
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};
export default Checkout;
