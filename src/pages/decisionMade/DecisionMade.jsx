//? REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? AXIOS
import axios from "axios";

const DecisionMade = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [decisions, setDecisions] = useState({});

  useEffect(() => {
    const fetchDecisionsFromServer = async () => {
      // the guid should be after /decision/ so guid is in the [2] spot
      const guid = window.location.pathname.split("/")[2];

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

        return response.data;
      } catch (error) {
        console.error("Error fetching decisions:", error);
        return { decisions: {} };
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

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Decision Made</h1>
          <p>Chosen Decision: {decisions.finalDecision}</p>
        </div>
      )}
    </div>
  );
};

export default DecisionMade;
