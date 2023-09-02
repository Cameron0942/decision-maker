//? REACT
import { Link } from "react-router-dom";

//? SASS
import "./NavBar.scss";

const NavBar = () => {
  const handleClick = (colorScheme) => {
    const event = new CustomEvent("resetBG", { detail: colorScheme });
    window.dispatchEvent(event);
  };

  return (
    <div className="navBarContainer">
      <div className="linksContainer">
        <Link
          className="link"
          to="/"
          onClick={() => handleClick("default")}
        >
          <span>Home</span>
        </Link>
        <Link
          className="link"
          to="/how-it-works"
          onClick={() => handleClick("default")}
        >
          <span>How It Works</span>
        </Link>
        <Link
          className="link"
          to="/contact"
          onClick={() => handleClick("default")}
        >
          <span>Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
