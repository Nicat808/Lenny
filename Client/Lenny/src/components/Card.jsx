import React from "react";
import "../style/Card.scss";
import star from "../assets/star.png";
import favImg from "../assets/favImg.png"
const Card = ({ imageSource, productName, productPrice, onClick, sold }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="imageWrapper">
        <img className="card-image" src={imageSource} alt={productName} />
        <img src={favImg} className="fav"/>
      </div>
      <div className="product-details">
        <h3 className="productName">{productName}</h3>
        <div className="productPrice">${productPrice}</div>
      </div>
      <span id="location">North Purwokerto</span>
      <div className="sold-out-header">
        <img src={star} alt="" />
        <b>4,8</b>
        <div className="sold">{sold} sold</div>
      </div>
    </div>
  );
};

export default Card;
