import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProceedToCheckout = ({ cartItems }) => {
  const history = useHistory();

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
        cartItems,
      });

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>Proceed to Checkout</button>
  );
};

export default ProceedToCheckout;
