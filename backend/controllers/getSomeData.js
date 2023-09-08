//? MODEL
import decision from "../models/decisionModel.js";

const getSomeData = async () => {
    try {
      console.log("running GSD");
  
      const data = await decision.find({});
      console.log(data);
  
      const finalDecisions = data.map((item) => item.finalDecision);

      console.log(finalDecisions)
  
    return finalDecisions;
    } catch (error) {
      console.error('Error handling old data:', error);
    } 
  };

export default getSomeData;
