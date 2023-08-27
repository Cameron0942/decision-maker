import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

const DecisionNew = () => {
  const navigate = useNavigate();

  const [guid, setGUID] = useState("");
  const [title, setTitle] = useState("");
  const [firstDecision, setFirstDecision] = useState("");

  useEffect(() => {
    navigate(`/decision/${guid}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };
  return (
    <>
      <h1>Creating a decision</h1>
      <p>
        Entering a title lets your group understand what kind of ideas need to
        be decided
      </p>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title"
      />
      <input
        type="text"
        name="title"
        value={firstDecision}
        onChange={(e) => setFirstDecision(e.target.value)}
        placeholder="Enter first idea"
      />
      <button onClick={handleSubmit}>Make group</button>
    </>
  );
};

export default DecisionNew;
