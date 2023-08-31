//? REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? BACKGROUND SVG
import bgWavesOrange from "../../assets/bg-svg/layered-waves-haikei-orange.svg";

//? SASS
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/decision");
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgWavesOrange})`;
  }, []);

  return (
    <>
      <NavBar />
      <div className="homeContainer">
        <h1 style={{ color: "white" }}>
          Give me a list of decisions and I will choose one for you
        </h1>
        <p style={{ color: "white" }}>
          Need help making a tough decision? [APP NAME] is here to help. Give
          [APP NAME] your choices and let it decide.
        </p>
        <button
          className="getStartedButton"
          type="button"
          onClick={handleGetStartedClick}
        >
          Get started
        </button>
      </div>
    </>
  );
};

export default Home;
