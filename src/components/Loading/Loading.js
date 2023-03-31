import React from "react";
import "./Loading.css"
import { BeatLoader } from "react-spinners";
//npm install react-spinners
const Loading = () => {
  return (
    <div className="loading-container">
      <BeatLoader color={"#44f22e"} loading={true} />
    </div>
  );
};

export default Loading;
