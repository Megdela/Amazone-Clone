const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // Frontend URL (port 3000)
    "http://localhost:3004", // Frontend URL (port 3004)
  ],
 
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10) || 0;

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100, // Convert to cents
        currency: "usd",
      });

      console.log(paymentIntent);
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe error:", error);
      res
        .status(500)
        .json({ error: "Payment processing failed", details: error.message });
    }
  } else {
    res.status(400).json({ message: "Total must be greater than 0" });
  }
});

exports.api = onRequest(app);
