import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../../../store/Slices/cartSlice";

const ProductCard = ({item}) => {
  const { id, title, imgs, price, cat } = item;


  const dispatch = useDispatch();

  const addToCart = () => {
    
    dispatch(
      addItem(item)
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
      <img src={imgs?.imgUrls}  alt={title} />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/₦{id}`}>{title}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">₦{price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
