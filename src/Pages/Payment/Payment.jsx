import React,{useContext,useState} from 'react'
import classes from './Payment.module.css'
import Layout from '../../Components/Layout/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard"
import {
  useStripe,
  useElements,
  CardElement
 
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

function Payment() {
  const [{user,basket}]=useContext(DataContext);
   const total = basket?.reduce(
     (amount, item) => item.price * item.amount + amount,
     0
   );

   const totalItem = basket?.reduce((amount, item) => {
     return item.amount + amount;
   }, 0);
   const [cardError,setCardError]=useState(null)
     const stripe = useStripe();
     const elements = useElements();
   const handleChange = (e) => {
     setCardError(e.error ? e.error.message : "");
   };


  return (
    <Layout>
      <div className={classes.paymet_header}>Checkout({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Addres</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,IL</div>
          </div>
        </div>
        <hr />

        {/* product */}

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* cart */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element*/}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex",gap:'10px' }}>
                      <p> Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment
