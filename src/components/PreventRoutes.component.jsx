import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreventRoutes = ({ path, isAuth, children }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (isAuth) {
      nav(path);
    }
  }, []);
  return <>{children}</>;
};

export default PreventRoutes;
