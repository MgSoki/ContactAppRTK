import React from "react";
import Wrapper from "./Wrapper.component";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModalBox } from ".";

const Navbar = () => {
  const nav = useNavigate();
  const confirmLogout = () => {
    localStorage.removeItem("auth");
    nav("/");
  };
  return (
    <div className=" fixed top-0 w-screen bg-primary-foreground py-3">
      <Wrapper>
        <div className="flex justify-between items-center">
          <Link
            to={"/home"}
            className="font-medium text-lg md:text-2xl text-primary font-serif"
          >
            Contact App
          </Link>
          <div className=" flex text-primary items-center gap-3">
            <NavLink to="/home" end>
              Home
            </NavLink>
            <ModalBox
              size="sm"
              variant="destructive"
              trigger={"Log Out"}
              title={"Are you sure you want to log out?"}
              description={"You can still close the site without logging out!"}
              confirm={"Yes! Log out"}
              fun={confirmLogout}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
