import getSomeData from "./getSomeData.js";

const handleOldData = (async () => {
    console.log("running HOD!")
    try{
        const finalDecisions = await getSomeData();
        console.log("FROM HOD", finalDecisions)
    }
    catch(error){
        console.error('error getting some data', error)
    }
    finally{
        console.log("Exiting function")
    }
  })();

export default handleOldData;
