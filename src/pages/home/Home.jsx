// import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/decision");
  };

  return (
    <>
      <div>Give me a list of decisions and I will choose one for you</div>
      <button type="button" onClick={handleGetStartedClick}>Get started</button>
    </>
  );
};

export default Home;
