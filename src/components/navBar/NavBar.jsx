//? REACT
import { Link } from "react-router-dom";

//? SASS
import "./NavBar.scss";

const NavBar = () => {
  return (
    <>
      <div className="navBarContainer">
        <div className="linksContainer">
          <Link className="link" to="/">
            <span>Home</span>
          </Link>
          <Link className="link" to="/">
            <span>How It Works</span>
          </Link>
          <Link className="link" to="/">
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
