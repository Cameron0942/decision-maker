//? MODEL
import decision from "../models/decisionModel.js";

const makeDecision = async (req, res) => {
  const guid = req.params.guid;

  try {
    const findDecision = await decision.findOne({ guid: guid });

    if (!findDecision) {
      return res.status(404).json({ error: "Decision not found" });
    }

    //* if decision has already been made
    if (findDecision.finalDecision !== null) {
      res.json({decision: "Decision has already been made."});
      return;
    }

    // Choose a random index from the decisions array
    const randomIndex = Math.floor(
      Math.random() * findDecision.decisions.length
    );

    // Get the decision at the random index
    const randomDecision = findDecision.decisions[randomIndex];

    // Update the document with the finalDecision field
    findDecision.finalDecision = randomDecision;
    await findDecision.save();

    res.json({ randomDecision });
  } catch (error) {
    console.error("Error finding or updating decision:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default makeDecision;
