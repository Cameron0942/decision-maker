//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

import "./HowItWorks.scss";

const HowItWorks = () => {
  return (
    <>
      <NavBar />
      <div className="howItWorksContainer">
        <h1>ChanceWave was created to help people make decisions.</h1>
        <p>
          ChanceWave lets a person or group of people compile a list. Then,
          using an advanced random number generation algorithim, ChanceWave
          chooses an idea from the list.
        </p>
        <span>
          ChanceWave is a pet project and an opportunity to develop and release
          a fullstack application that someone might use. I was inspired by
          another developer at a local technology meetup who made a similar
          project. I wanted to create my own version but with a little more
          flavor. I hope you enjoy using ChanceWave!
        </span>
      </div>
    </>
  );
};

export default HowItWorks;
