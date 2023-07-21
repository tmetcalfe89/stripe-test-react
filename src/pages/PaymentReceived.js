import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentReceived() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function registerPaymentIntent() {
      const paymentIntentId = searchParams.get("payment_intent");
      await fetch("/api/stripe/paymentreceived", {
        method: "POST",
        body: JSON.stringify({
          paymentIntent: paymentIntentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    registerPaymentIntent();
  }, [searchParams]);

  return <div>Payment Received!</div>;
}
