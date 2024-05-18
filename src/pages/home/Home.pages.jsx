import { Navbar, PreventRoutes } from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <PreventRoutes path={"/"} isAuth={!localStorage.getItem("auth")}>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </PreventRoutes>
  );
};

export default HomePage;
