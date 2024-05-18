import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <div>
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#18181b"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingComponent;
