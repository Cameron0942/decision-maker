//? REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

const Decision = () => {
  const navigate = useNavigate();
  const [decisions, setDecisions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [idea, setIdea] = useState("");

  useEffect(() => {
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
        return response.data;
      } catch (error) {
        console.error("Error fetching decisions:", error);
        navigate("/404/");
      }
    };

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

  const handleSubmit = async () => {
    if (!idea) return;

    const guid = window.location.pathname.split("/").pop();

    let payload = {
      idea: idea,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL}/decision/${guid}`,
        payload
      );
      window.location.reload();
    } catch (error) {
      console.error("Error posting idea:", error);
    }
  };

  const handleMakeDecision = async () => {
    const guid = window.location.pathname.split("/")[2];

    try {
      await axios.get(
        `${
          import.meta.env.VITE_LOCALTEST_HOSTED_WEB_URL
        }/decision/${guid}/choice`
      );
      navigate(`/decision/${guid}/choice`);
    } catch (e) {
      console.error("Error sending makeDecision request", e);
    }
  };

  return (
    <>
      <h1>{decisions.title}</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Object.keys(decisions.decisions).map((key, index) => (
          <h3 key={index}>{decisions.decisions[key]}</h3>
        ))
      )}
      <div>
        <input
          type="text"
          placeholder="Tap here to enter a new idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button onClick={handleSubmit}>Add idea</button>
      </div>
      <button onClick={handleMakeDecision}>Make choice</button>
    </>
  );
};

export default Decision;
