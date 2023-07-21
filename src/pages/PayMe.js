import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function PayMe({ stripe }) {
  const [paymentIntent, setPaymentIntent] = useState(null);

  const handleCreatePaymentIntent = async () => {
    const piResponse = await fetch("/api/stripe/paymentintent", {
      method: "POST",
    });
    const paymentIntentData = await piResponse.json();

    console.log(paymentIntentData);

    setPaymentIntent(paymentIntentData);
  };

  const options = paymentIntent
    ? {
        clientSecret: paymentIntent.client_secret,
      }
    : undefined;

  return (
    <>
      <button onClick={handleCreatePaymentIntent}>Pay Me</button>
      {options && (
        <Elements stripe={stripe} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/paid",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default PayMe;
