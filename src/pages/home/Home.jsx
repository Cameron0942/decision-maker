//? REACT
import { useNavigate } from "react-router-dom";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? SASS
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/decision");
  };

  return (
    <>
      <NavBar />
      <div className="homeContainer">
        <h1>Give ChanceWave a list of ideas and it will choose one for you</h1>
        <p>
          Need help making a tough decision? ChanceWave is here to help. Give
          ChanceWave your choices and let it decide!
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
