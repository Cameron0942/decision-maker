//? MODEL
import decision from "../models/decisionModel.js";

const getDecisions = async (req, res) => {
  const guid = req.params.guid;

  try {
    const findDecision = await decision.findOne({ guid: guid });

    if (!findDecision) {
      return res.status(404).json({ error: "Decision not found" });
    }
    
    res.json(findDecision);
  } catch (error) {
    console.error("Error fetching decision:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getDecisions;
