//? REACT
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? QRCODE
import QRCode from "qrcode.react";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";
import TileLoader from "../../components/loaders/tileLoader/TileLoader";
import BarLoader from "../../components/loaders/barLoader/BarLoader";

//? BACKGROUND SVGs
// import wavesDefault from "../../assets/bg-svg/layered-waves-haikei-orange.svg";
import wavesBlueGreen from "../../assets/bg-svg/options/layered-waves-haikei-blue-green.svg";
import wavesPinkPurple from "../../assets/bg-svg/options/layered-waves-haikei-pink-purple.svg";
import wavesPurpleYellow from "../../assets/bg-svg/options/layered-waves-haikei-purple-yellow.svg";
import wavesBluePink from "../../assets/bg-svg/options/layered-waves-haikei-blue-pink.svg";
import wavesRedPink from "../../assets/bg-svg/options/layered-waves-haikei-red-pink.svg";

//? SASS
import "./Decision.scss";

const Decision = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [decisions, setDecisions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [makeDecisionLoading, setMakeDecisionLoading] = useState(false);
  const [idea, setIdea] = useState("");
  
  const currentURL = window.location.href;

  //* focus input when decision changes
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [decisions]);

  useEffect(() => {
    document.body.style.backgroundImage = `url()`;
    document.body.style.backgroundColor = "#001220";
  }, []);

  const fetchDecisionsFromServer = async () => {
    const guid = window.location.pathname.split("/")[2];

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL}/decision/${guid}`
      );

      if (response.data && response.data.finalDecision !== null) {
        navigate(`/decision/${guid}/choice`);
        return;
      }

      switch (response.data.colorScheme) {
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
      return response.data;
    } catch (error) {
      console.error("Error fetching decisions:", error);
      navigate("/404/");
    }
  };

  useEffect(() => {
    const updateDecisions = async () => {
      try {
        setIsLoading(true);
        const decisionsData = await fetchDecisionsFromServer();
        setDecisions(decisionsData);
      } finally {
        setIsLoading(false);
      }
    };

    updateDecisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guid = window.location.pathname.split("/").pop();
    setIsSubmissionLoading(true);

    let payload = {
      idea: idea,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL}/decision/${guid}`,
        payload
      );
      let autoUpdateDecisions = await fetchDecisionsFromServer();
      setDecisions(autoUpdateDecisions);
    } catch (error) {
      console.error("Error posting idea:", error);
    } finally {
      setIdea("");
      setIsSubmissionLoading(false);
    }
  };

  const handleMakeDecision = async () => {
    const guid = window.location.pathname.split("/")[2];
    setMakeDecisionLoading(true);

    try {
      await axios.get(
        `${
          import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL
        }/decision/${guid}/choice`
      );
      navigate(`/decision/${guid}/choice`);
    } catch (e) {
      console.error("Error sending makeDecision request", e);
      setMakeDecisionLoading(false);
    } finally {
      setMakeDecisionLoading(false);
    }
  };

  const handleCopyClick = () => {
    // Create a new textarea element
    const textArea = document.createElement("textarea");
    textArea.value = currentURL;

    // Append the textarea to the document
    document.body.appendChild(textArea);

    // Select and copy the URL from the textarea
    textArea.select();
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textArea);
    alert("link copied");
  };

  return (
    <>
      <NavBar />
      <div className="decisionContainer">
        <h1>{decisions.title}</h1>
        {isLoading ? (
          <TileLoader />
        ) : (
          <>
            <ol className="listOfIdeas">
              {Object.keys(decisions.decisions).map((key, index) => (
                <li key={index}>{decisions.decisions[key]}</li>
              ))}
            </ol>
            <form className="decisionInputContainer" onSubmit={handleSubmit}>
              <input
                className="input-styled"
                type="text"
                placeholder="Tap here to enter a new idea"
                value={idea}
                ref={inputRef}
                onChange={(e) => setIdea(e.target.value)}
                required
                disabled={isSubmissionLoading}
              />
              {isSubmissionLoading ? (
                <TileLoader />
              ) : (
                <button type="submit" className="addIdeaButton">
                  Add to list
                </button>
              )}
            </form>
            {makeDecisionLoading ? (
              <BarLoader />
            ) : (
              <button
                type="button"
                className="makeChoiceButton"
                onClick={handleMakeDecision}
                disabled={isSubmissionLoading || makeDecisionLoading}
              >
                Make choice
              </button>
            )}
            <div className="qrCodeContainer">
              <span onClick={handleCopyClick}>
                Share this link with your friends and let them add to the list
              <textarea name="" id="" cols="30" rows="3">{window.location.href}</textarea>
              </span>
              <p>Scan this to share</p>
              <QRCode value={currentURL} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Decision;
