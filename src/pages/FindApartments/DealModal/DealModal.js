import React from "react";

const DealModal = ({ booking }) => {
  //   console.log(booking);
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1>Mobile-Broker</h1>
          <h3 className="text-lg font-bold my-3">Edit Previous Information</h3>
          <button
            // onClick={() =>
            //   handleDeal(
            //     post.apartment_id,
            //     post.apartment_area,
            //     post.apartment_no,
            //     post.apartment_rent,
            //     post.landlord_name,
            //     post.landlord_email,
            //     name,
            //     email,
            //     "unpaid"
            //   )
            // }
            className="btn btn-warning"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealModal;
