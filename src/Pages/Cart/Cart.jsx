import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket?.reduce((amount, item) => item.price + amount, 0);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Your Amazon Cart is empty</p>
          ) : (
            basket?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
              />
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            
              <p>
                Subtotal ({basket?.length} items)
                <CurrencyFormat amount={total} />
              </p>
           
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>

            <a href="/payments">Continue to checkout</a>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
