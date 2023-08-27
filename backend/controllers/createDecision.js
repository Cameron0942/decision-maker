// import path from 'path';

//? CRYPTO
import crypto from 'crypto';

//? MONGODB
import decisionModel from '../models/decisionModel.js';

// Generate a crypto GUID
function generateGUID() {
    return crypto.randomBytes(16).toString('hex');
  }

const createDecision = async (req, res) => {
    const guid = generateGUID();
    const responseObj = {
        guid: guid
    };

    try{
        await decisionModel.create({
            title: req.body.title,
            decisions: req.body.decision,
            guid: guid
        });
    }
    catch(e){
        console.log("Error saving to MongoDB", e);
    }

    res.json(responseObj);
};

export default createDecision;