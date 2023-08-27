//? MODEL
import decision from "../models/decisionModel.js";

const addDecision = async (req, res) => {
  const guid = req.params.guid;

  try {
    const findDecision = await decision.findOne({ guid: guid });

    if (!findDecision) {
      return res.status(404).json({ error: "Decision not found" });
    }

    // Add the new idea to the decisions array
    findDecision.decisions.push(req.body.idea);

    // Save the updated decision with the new idea
    await findDecision.save();

    res.json(findDecision.decisions);
  } catch (error) {
    console.error("Error finding or updating decision:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addDecision;
