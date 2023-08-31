//? REACT
import { useEffect } from "react";

//? BACKGROUND SVGs
import bgWaves from "../../assets/bg-svg/layered-waves-haikei-orange.svg";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? SASS
import "./NotFound.scss";

const NotFound = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgWaves})`;
  }, []);

  return (
    <>
      <NavBar />
      <span className="notFoundComponentText" style={{ color: "#ffffff" }}>
        4🤔4 Page Not Found
      </span>
    </>
  );
};

export default NotFound;
