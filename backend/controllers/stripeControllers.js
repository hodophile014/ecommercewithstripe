const Stripe = require("stripe");
const { User } = require("../models/user.js");
const jwt =  require("jsonwebtoken");
const {Order} =  require('../models/Order.js')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripePayment = {
  createCheckoutSession: async (req, res) => {
    const { products } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const totalAmount = Math.floor(
      products.reduce((total, item) => total + item.price, 0)
    );

    try {
      const { email } = jwt.decode(token);

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const customerId = user.stripeCustomerId;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "usd",
        customer: customerId,
      });
      console.log(paymentIntent);

      const order = new Order({
        userId: user._id,
        products: products.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        })),
        totalAmount: paymentIntent.amount,
        paymentIntentId: paymentIntent.id,
        email: user.email,
      });
      await order.save();

      let quantity = 0;
      const quantityOfProduct = (productName) => {
        products.map((product) => {
          if (product.name === productName) {
            quantity = quantity + 1;
          }
        });
        return quantity;
      };

      const line_items = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: quantityOfProduct(product.name),
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: `http://localhost:5173/success`,
        cancel_url: "http://localhost:5173/cancel",
      });

      res.json({ paymentIntentId: paymentIntent.id, sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(400).json({ error: error.message });
    }
  },
};
module.exports=stripePayment;