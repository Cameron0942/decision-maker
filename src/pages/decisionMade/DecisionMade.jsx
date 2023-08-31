//? REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? SASS
import "./decisionMade.scss";

//? BACKGROUND SVGs
import wavesBlueGreen from "../../assets/bg-svg/options/layered-waves-haikei-blue-green.svg";
import wavesPinkPurple from "../../assets/bg-svg/options/layered-waves-haikei-pink-purple.svg";
import wavesPurpleYellow from "../../assets/bg-svg/options/layered-waves-haikei-purple-yellow.svg";
import wavesBluePink from "../../assets/bg-svg/options/layered-waves-haikei-blue-pink.svg";
import wavesRedPink from "../../assets/bg-svg/options/layered-waves-haikei-red-pink.svg";

//? ASSETS
import blob from "../../assets/shapes/blob.svg";
import orangeBlob from "../../assets/shapes/red-orange-blob.svg";
import purpleBlob from "../../assets/shapes/purple-blob.svg";
import greenBlob from "../../assets/shapes/green-blob.svg";
import redBlob from "../../assets/shapes/red-blob.svg";
import blueBlob from "../../assets/shapes/blue-blob.svg";

const blobOptions = [
  blob,
  orangeBlob,
  purpleBlob,
  greenBlob,
  redBlob,
  blueBlob,
];
const randomBlobIndex = Math.floor(Math.random() * blobOptions.length);
const selectedBlob = blobOptions[randomBlobIndex];

//? LOADERS
import TileLoader from "../../components/loaders/tileLoader/TileLoader";

const DecisionMade = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [decisions, setDecisions] = useState({});

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#001220";
  }, []);

  useEffect(() => {
    const fetchDecisionsFromServer = async () => {
      // the guid should be after /decision/ so guid is in the [2] spot
      const guid = window.location.pathname.split("/")[2];
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL
          }/decision/${guid}/choice/chosen`
        );

        if (!response.data || !response.data.finalDecision) {
          // Navigate back
          navigate(`/decision/${guid}`);
          return;
        }

        setIsLoading(false);

        return response.data;
      } catch (error) {
        console.error("Error fetching decisions:", error);
        setIsLoading(false);
        navigate(`/decision/${guid}/404`);
        return { decisions: {} };
      }
    };

    const updateDecisions = async () => {
      try {
        setIsLoading(true);
        const decisionsData = await fetchDecisionsFromServer();
        setDecisions(decisionsData);

        switch (decisionsData.colorScheme) {
          case 0:
            document.body.style.backgroundImage = `url(${wavesBlueGreen})`;
            break;
          case 1:
            document.body.style.backgroundImage = `url(${wavesPinkPurple})`;
            break;
          case 2:
            document.body.style.backgroundImage = `url(${wavesPurpleYellow})`;
            break;
          case 3:
            document.body.style.backgroundImage = `url(${wavesBluePink})`;
            break;
          case 4:
            document.body.style.backgroundImage = `url(${wavesRedPink})`;
            break;
          default:
            document.body.style.backgroundColor = "#001220";
            break;
        }
      } finally {
        setIsLoading(false);
      }
    };

    updateDecisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="decisionMadeContainer">
        {isLoading ? <TileLoader /> : <div />}
        {isLoading ? (
          <div></div>
        ) : (
          <div className="announcementContainer">
            <h1 style={{ color: "#ffffff" }}>And the winner is...</h1>
            <div className="svg-container">
              <object
                className="object-svg"
                data={selectedBlob}
                type="image/svg+xml"
              />
              <span className="centered-text">{decisions.finalDecision}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DecisionMade;
