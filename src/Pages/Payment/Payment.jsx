import React, { useContext, useState } from 'react';
import classes from './Payment.module.css';
import Layout from '../../Components/Layout/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard";

import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { doc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Type } from "../../Utility/action.type"; 



function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };
const handlePayment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);

    // 1. Contact backend to get client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total}`,
    });

    const clientSecret = response.data?.clientSecret;

    // 2. Client-side confirmation with Stripe
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // Check paymentIntent structure
    console.log("Payment Intent:", paymentIntent);

    const intentId = paymentIntent.id; // Corrected access to paymentIntent.id
    if (!intentId) {
      console.error("PaymentIntent ID is undefined");
      setProcessing(false);
      return;
    }

    // 3. After confirmation, save order to Firestore and clear basket
    await setDoc(
      doc(db, "users", user.uid, "orders", intentId), // Use intentId here
      {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }
    );

    //empty the basket
    dispatch(
      {
        type:Type.EMPTY_BASKET
      }
    )

    setProcessing(false);
navigate("/orders", { state: { msg: "You have placed a new order" } });

  } catch (error) {
    console.log(error);
    setProcessing(false);
  }
};



  return (
    <Layout>
      <div className={classes.paymet_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* cart */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
