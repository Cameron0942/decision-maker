//? REACT
import { Link } from "react-router-dom";
import * as React from "react";

//? CUSTOM COMPONENTS
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";

//? SASS
import "./NavBar.scss";

const NavBar = () => {
  const handleClick = (colorScheme) => {
    const event = new CustomEvent("resetBG", { detail: colorScheme });
    window.dispatchEvent(event);
  };

  return (
    <>
      <HamburgerMenu />

      <div className="navBarContainer">
        <div className="linksContainer">
          <Link className="link" to="/" onClick={() => handleClick("default")}>
            <span>Home</span>
          </Link>
          <Link
            className="link"
            to="/how-it-works"
            onClick={() => handleClick("default")}
          >
            <span>How It Works</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
