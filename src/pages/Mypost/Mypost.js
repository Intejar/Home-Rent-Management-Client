import React from "react";
import { useLocation } from "react-router-dom";

const Mypost = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  console.log(id, email, name, type, img);
  return (
    <div>
      <h1 className="text-3xl font-bold ">No post availabe</h1>
    </div>
  );
};

export default Mypost;
