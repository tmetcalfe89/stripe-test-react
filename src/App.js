import { loadStripe } from "@stripe/stripe-js";
import PayMe from "./pages/PayMe";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentReceived from "./pages/PaymentReceived";

const stripe = loadStripe(
  "pk_test_51MTphvIQbC6nvg4PIjNNjuyxqvqKCjEjpgscDOvgVpkpdIOOltQovaup7fH7rKq4pIfS7MaHvXSWLh1waL2aONRu00vcmZKF3x"
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PayMe stripe={stripe} />} />
        <Route path="/paid" element={<PaymentReceived />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
