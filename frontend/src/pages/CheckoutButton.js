import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QV7mCGmBhOn4xRamJpVLLpAFzaukFe2Eo7TUx5aINxq7KOgPeAkjcRhLCXe6i3rArU3A6IBlx4ZaivtjTIbCOMu006MLlSNW3"
);

const CheckoutButton = ({ cart, cookies }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const token = cookies.authToken;

    const sessionResponse = await axios.post(
      "http://localhost:4242/stripe/create-checkout-session",
      {
        products: cart,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { sessionId } = sessionResponse.data;

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" role="link" onClick={handleClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;