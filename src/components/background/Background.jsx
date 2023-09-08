//? REACT
import { useRef, useEffect, useState } from "react";

//? BACKGROUND SVG
import BGOrangeWaves from "../../assets/bg-svg/layered-waves-haikei-orange.svg";
import BGBlueGreenWaves from "../../assets/bg-svg/options/layered-waves-haikei-blue-green.svg";
import BGBluePinkWaves from "../../assets/bg-svg/options/layered-waves-haikei-blue-pink.svg";
import BGPinkPurpleWaves from "../../assets/bg-svg/options/layered-waves-haikei-pink-purple.svg";
import BGBPurpleYellowWaves from "../../assets/bg-svg/options/layered-waves-haikei-purple-yellow.svg";
import BGRedPinkWaves from "../../assets/bg-svg/options/layered-waves-haikei-red-pink.svg";

//? SASS
import "./Background.scss";

const Background = () => {
  const containerRef = useRef(null);
  const [activeBG, setActiveBG] = useState(null);

  const handleDataUpdate = (event) => {
    let colorSchemeNumber = event.detail;
    switch (colorSchemeNumber) {
      case 0:
        setActiveBG(BGBlueGreenWaves);
        break;
      case 1:
        setActiveBG(BGBluePinkWaves);
        break;
      case 2:
        setActiveBG(BGPinkPurpleWaves);
        break;
      case 3:
        setActiveBG(BGBPurpleYellowWaves);
        break;
      case 4:
        setActiveBG(BGRedPinkWaves);
        break;
      default:
        setActiveBG(BGOrangeWaves);
        break;
    }
  };

  useEffect(() => {
    //* Set Default BG before one is assigned
    setActiveBG(BGOrangeWaves);

    window.addEventListener("colorSchemeEvent", handleDataUpdate);
    window.addEventListener("resetBG", handleDataUpdate);

    return () => {
      window.removeEventListener("colorSchemeEvent", handleDataUpdate);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="background">
        <div className="root-svg-container">
          <object
            data={activeBG}
            className="bg-object-svg"
            type="image/svg+xml"
          />
        </div>
      </div>
    <footer className="footer" style={{color: 'white'}}>Cameron Burns 2023 — <a href='https://github.com/Cameron0942/decision-maker' target='_blank'  rel='noreferrer' style={{color: '#E6C892', textDecoration: 'none'}}>Created by Cameron0942</a></footer>
    </>
  );
};

export default Background;
