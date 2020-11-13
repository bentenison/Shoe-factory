import React from "react";

export const CartItem = ({ item }) => {
  return (
    <div className="col s12 m12">
      <h5 className="header">{item.productTitle}</h5>
      <div className="card horizontal hoverable">
        <div className="card-image">
          <img src={item.image} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p className="hide-on-small-only">{item.description}</p>
            <h5 className="right-align">RS.{item.price}</h5>
          </div>
        </div>
      </div>
      <div class="card-action">
      <a class="waves-effect waves-light btn red accent-4 z-depth-0">remove</a>
      <a class="waves-effect waves-light btn z-depth-0">back</a>
      </div>
    </div>
  );
};
