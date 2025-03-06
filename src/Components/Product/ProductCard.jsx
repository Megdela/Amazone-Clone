import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product ,flex,renderDesc}) {
  const { image, title, id, rating = { rate: 0, count: 0 }, price ,description} = product;
  return (
    <div className={`${classes.card_container} ${flex?classes.product_flexed:''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>}
       
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small className={classes.count}>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
