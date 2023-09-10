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

  useEffect(() => {
    const updateDecisions = async () => {
      try {
        await fetchDecisionsFromServer();
      } catch (e) {
        console.error("Problem fetching decisions", e);
      }
    };

    updateDecisions();
  }, []);

  //* focus input when decision changes
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [decisions]);

  const fetchDecisionsFromServer = async () => {
    const guid = window.location.pathname.split("/")[2];

    async function makeGetRequest(url) {
      try {
        setIs404(false);
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data && response.data.finalDecision !== null) {
          // navigate(`/decision/${guid}/choice`);
          window.location.href = `/decision/${guid}/choice`;
          return;
        }

        if (response.status === 200) {
          const data = response.data;
          setDecisions(data);
          setIsLoading(false);

          //* SET BACKGROUND
          //* custom event to pass data between 2 separate components
          const event = new CustomEvent("colorSchemeEvent", {
            detail: data.colorScheme,
          });
          window.dispatchEvent(event);
        } else {
          console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    makeGetRequest(`${import.meta.env.VITE_PROD_WEB_URL}/decision/${guid}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guid = window.location.pathname.split("/").pop();
    setIsSubmissionLoading(true);

    let payload = {
      idea: idea,
    };
    async function makePostRequest(url) {
      try {
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          await fetchDecisionsFromServer();
        } else {
          console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      } finally {
        setIdea("");
        setIsSubmissionLoading(false);
      }
    }
    makePostRequest(`${import.meta.env.VITE_PROD_WEB_URL}/decision/${guid}`);
  };

  const handleMakeDecision = async () => {
    const guid = window.location.pathname.split("/")[2];
    setMakeDecisionLoading(true);

    async function makeGetRequest(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          // window.location.href = `/decision/${guid}/choice`;
          navigate(`/decision/${guid}/choice`);
        } else {
          console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
        setMakeDecisionLoading(false);
      } finally {
        setMakeDecisionLoading(false);
      }
    }
    makeGetRequest(
      `${import.meta.env.VITE_PROD_WEB_URL}/decision/${guid}/choice`
    );
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
                  placeholder="Tap here to enter an idea"
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
                  Click or tap this text to copy the link, and share it with
                  your group
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
