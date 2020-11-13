import React from 'react'

export const ProductCarousel = () => {
    return (
        <div className="container">
        <h4 className="header grey-text text-darken-3 center-align">
          Our Featured Products
        </h4>
        <div className="carousel carousel-slider" id="product-carousel">
          <a className="carousel-item" href="#one!">
            <img
              className="responsive-img"
              src={require("../../img/shoe-1.jpg")}
            />
          </a>
          <a className="carousel-item" href="#two!">
            <img
              className="responsive-img"
              src={require("../../img/shoe-2.jpg")}
            />
          </a>
          <a className="carousel-item" href="#three!">
            <img
              className="responsive-img"
              src={require("../../img/shoe-3.jpg")}
            />
          </a>
          <a className="carousel-item" href="#four!">
            <img
              className="responsive-img"
              src={require("../../img/shoe-5.jpg")}
            />
          </a>
          <a className="carousel-item" href="#four!">
            <img
              className="responsive-img"
              src={require("../../img/Vans Casual.jpg")}
            />
          </a>
          <a className="carousel-item" href="#four!">
            <img
              className="responsive-img"
              src={require("../../img/Adidas Plimsolls.jpg")}
            />
          </a>
        </div>
      </div>
    )
}
