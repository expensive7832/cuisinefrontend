import React, { useCallback } from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../../../store/Slices/cartSlice";

const ProductCard = ({item}) => {
  const data = useCallback(() => item, [item])

  const { id, title, imgs, price, cat } = data();

 
  const dispatch = useDispatch();

  const addToCart = () => {

    dispatch(
      addItem({...item, imgurl: JSON.parse(item.imgs[0])?.url})
    );
    
  };

  return (
    <div className="product__card position-relative  ">
      <div className="product__item-backface face ">
        <div className="product__img">
        <img src={JSON.parse(imgs[0])?.url}  alt={title} />
        </div>

        <div className="product__content">
          <h5>
            <Link to={`/foods/${id}`}>{title}</Link>
          </h5>
          <div className=" d-flex align-items-center justify-content-between ">
            <span className="product__price">₦{price}</span>
            <button className="addTOCart__btn" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="product__item face ">
      <img src={JSON.parse(imgs[0])?.url}  alt={title} className="img-thumbnail" />
      </div>
  </div>
  );
};

export default ProductCard;
