import React from "react";
import { TbChefHat } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  let tasteProfileElement;
  if (props.tasteProfileOn === "true") {
    tasteProfileElement = <TbChefHat />;
  }
  return (
    <div class="topheader">
      <a href="/">
      <div id="logo">Filmic Forensics</div>
      </a>
      <ul class="topnav">
        <NavbarItem path="/Trending" name="Trending" />
        <NavbarItem path="/Best-Rated" name="Best Rated" />
        <NavbarItem path="/Genres" name= "Genres" />
        <NavbarItem path="/Quiz" name="Quiz" />
      </ul>
      <div class="actions">
        <div class="prof-icon">
          <NavLink to="/Search">
            {" "}
            <IoSearch />{" "}
          </NavLink>
        </div>
        <div class="prof-icon">
          <a href="./."> {tasteProfileElement} </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const NavbarItem = ({ path, name }) => {
  return (
    <li>
      <NavLink to={path}>{name}</NavLink>
    </li>
  );
};

export default Header;