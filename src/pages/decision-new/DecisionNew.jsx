//? REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";
import BarLoader from "../../components/loaders/barLoader/BarLoader";

//? SASS
import "./DecisionNew.scss";

const DecisionNew = () => {
  const navigate = useNavigate();
  // const inputRef = useRef(null);
  const [guid, setGUID] = useState("");
  const [title, setTitle] = useState("");
  const [firstDecision, setFirstDecision] = useState("");
  const [loading, setLoading] = useState(false);

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
          setGUID(data.guid);
        } else {
          console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    makePostRequest(`${import.meta.env.VITE_PROD_WEB_URL}/decision`);
  };

  return (
    <>
      <NavBar />
      <div className="newDecisionContainer">
        <h1>Creating a group</h1>
        <h3 style={{ color: "white" }}>
          Think of a title for the group along with the first idea to get things
          started
        </h3>
        <p>
          Adding a title helps your group understand what type of ideas to
          include in the list
        </p>
        <form className="newDecisionInputContainer" onSubmit={handleSubmit}>
          <input
            className="input-styled"
            type="text"
            name="title"
            value={title}
            // ref={inputRef}
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
