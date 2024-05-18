import React from "react";
import { Link } from "react-router-dom";

const Navigator = ({ info, path, name }) => {
  return (
    <p className="text-center text-sm capitalize select-none">
      <span className="opacity-70">{info}</span>
      {" "}
      <Link
        to={path}
        className=" font-medium opacity-85 hover:opacity-100 underline cursor-pointer"
      >
        {name} here
      </Link>
    </p>
  );
};

export default Navigator;
