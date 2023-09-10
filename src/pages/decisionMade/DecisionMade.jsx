//? REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? SASS
import "./DecisionMade.scss";

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
    const fetchDecisionsFromServer = async () => {
      // the guid should be after /decision/ so guid is in the [2] spot
      const guid = window.location.pathname.split("/")[2];
      setIsLoading(true);

      async function makeGetRequest(url) {
        try {
          const response = await axios.get(url, {
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.data || !response.data.finalDecision) {
            // Navigate back
            navigate(`/decision/${guid}`);
            return;
          }

          if (response.status === 200) {
            const data = response.data;
            setDecisions(data);

            //* SET BACKGROUND
            //* custom event to pass data between 2 separate components
            const event = new CustomEvent("colorSchemeEvent", {
              detail: data.colorScheme,
            });
            window.dispatchEvent(event);

            setIsLoading(false);
          } else {
            console.log(
              `HTTP Error: ${response.status} ${response.statusText}`
            );
            setIsLoading(false);
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
          setIsLoading(false);
        }
      }
      makeGetRequest(`${import.meta.env.VITE_PROD_WEB_URL}/decision/${guid}`);
    };

    const updateDecisions = async () => {
      try {
        setIsLoading(true);
        await fetchDecisionsFromServer();
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
              <span className="centered-text">
                <span>{decisions.finalDecision}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DecisionMade;
