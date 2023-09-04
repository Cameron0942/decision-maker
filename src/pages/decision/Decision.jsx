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
import NotFound from "../../components/404/NotFoundComponent";

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
  const [is404, setIs404] = useState(false);

  const currentURL = window.location.href;

  //* focus input when decision changes
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [decisions]);

  const fetchDecisionsFromServer = async () => {
    const guid = window.location.pathname.split("/")[2];

    try {
      setIs404(false);

      const response = await axios.get(
        `${import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL}/decision/${guid}`
      );

      if (response.data && response.data.finalDecision !== null) {
        navigate(`/decision/${guid}/choice`);
        return;
      }
      return response.data;
    } catch (error) {
      setIs404(true);
      console.error("Error fetching decisions:", error);
      // navigate("/404/");
    }
  };

  useEffect(() => {
    const updateDecisions = async () => {
      try {
        setIsLoading(true);
        const decisionsData = await fetchDecisionsFromServer();
        setDecisions(decisionsData);

        // NOTE FOR GITHUB
        //* custom event to pass data between 2 separate components
        const event = new CustomEvent("colorSchemeEvent", {
          detail: decisionsData.colorScheme,
        });
        window.dispatchEvent(event);
      } catch (e) {
        console.error("Problem fetching decisions", e);
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
      {is404 ? (
        <NotFound />
      ) : (
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
                  Click or tap this text to copy the link, and share it with your group
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    defaultValue={window.location.href}
                  />
                </span>
                <p>Or</p>
                <p>Scan this to share</p>
                <QRCode value={currentURL} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Decision;
