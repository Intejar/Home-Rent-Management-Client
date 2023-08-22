import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51M8jIFCRKiTr81AEwQ9Uwa2VTyvep9sHhbne0P978NBiDUImftN0oVCx4etDWsh2ebV3OfCD9lWbh2zuGYO0dtS400XUCYc8uc"
);

const PayementPage = () => {
  const location = useLocation();
  const { id, email, name, type, img, apartment_id, rent } = location.state;
  console.log(id, email, name, type, img, apartment_id);
  const data = {
    name: name,
    email: email,
    apartment_id: apartment_id,
    type: type,
    img: img,
    id: id,
    rent: rent,
  };
  return (
    <div>
      <h1 className="text-xl font-bold">
        Hi {name} make PAYMENT for Apartment Id:{apartment_id}{" "}
      </h1>
      <p>Please pay {rent} Taka !</p>
      <div className="w-1/2 mt-10 mx-auto bg-orange-200 p-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm data={data} />
        </Elements>
      </div>
    </div>
  );
};

export default PayementPage;
