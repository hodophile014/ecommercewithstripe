const express = require("express");
const  stripePayment = require("../controllers/stripeControllers");

const stripeRouter=express.Router();

stripeRouter.post("/create-checkout-session", stripePayment.createCheckoutSession)

module.exports=stripeRouter;