//? REACT
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";
import BarLoader from "../../components/loaders/barLoader/BarLoader";

//? BACKGROUND SVGs
import bgWavesOrange from "../../assets/bg-svg/layered-waves-haikei-orange.svg"

//? SASS
import "./DecisionNew.scss";

const DecisionNew = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [guid, setGUID] = useState("");
  const [title, setTitle] = useState("");
  const [firstDecision, setFirstDecision] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //* focus input on page load
    if (inputRef.current) inputRef.current.focus();
    document.body.style.backgroundImage = `url(${bgWavesOrange})`;
  }, []);

  useEffect(() => {
    navigate(`/decision/${guid}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: title,
      decision: firstDecision,
    };

    try {
      let createDecision = await axios.post(
        `${import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL}/decision`,
        payload
      );
      setGUID(createDecision.data.guid);
    } catch (e) {
      console.log("Error submitting", e.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className="newDecisionContainer">
        <h1>Creating a decision</h1>
        <p>
          Entering a title lets your group understand what kind of ideas need to
          be added
        </p>
        <form className="newDecisionInputContainer" onSubmit={handleSubmit}>
          <input
            className="input-styled"
            type="text"
            name="title"
            value={title}
            ref={inputRef}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a Title (i.e. What to eat?)"
            required
          />
          <input
            className="input-styled"
            type="text"
            name="idea"
            value={firstDecision}
            onChange={(e) => setFirstDecision(e.target.value)}
            placeholder="Enter First Idea (i.e. Sushi)"
            required
          />
          {loading ? (
            <BarLoader />
          ) : (
            <button type="submit" className="makeGroupButton">
              Make group
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default DecisionNew;
