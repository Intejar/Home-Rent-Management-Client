import React from "react";
import { useLocation } from "react-router-dom";
import ReactTyped from "react-typed";

const UserProfile = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  console.log("userpro", name, email);
  return (
    <div className="mx-60 my-40">
      <div className="flex  space-x-2 my-3">
        <p className="sm:text-xl md:text-5xl text-blue-500 font-bold">
          Most Trustworthy Site For Apartment
        </p>
        <ReactTyped
          strings={["Post", "Rent"]}
          typeSpeed={120}
          cursorStyle="..."
          backSpeed={140}
          loop
          className="text-5xl font-bold text-warning"
        />
      </div>
      <div>
        {type === "landlord" && (
          <div className="mx-auto">
            <ul className="steps steps-vertical">
              <li className="step step-warning">Add Post</li>
              <li className="step step-warning">See Your Post</li>
              <li className="step">Sale Your Deal With Tenant</li>
              <li className="step">Get Payment Notification</li>
            </ul>
          </div>
        )}
        {type === "tenant" && (
          <div>
            <ul className="steps steps-vertical">
              <li className="step step-warning">
                Make A Deal By Clicking Handshake Button
              </li>
              <li className="step ">See Your Deal</li>
              <li className="step">Filter By Desire Area </li>
              <li className="step">Make Card Payment</li>
              <li className="step">Get Notified By Admin</li>
              <li className="step">Report To Admin</li>
            </ul>
          </div>
        )}
        {type === "admin" && (
          <div>
            <ul className="steps steps-vertical">
              <li className="step step-warning">Hi Admin</li>
              <li className="step ">See All Deal</li>
              <li className="step ">See All Report</li>
              <li className="step ">Delete Post</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
