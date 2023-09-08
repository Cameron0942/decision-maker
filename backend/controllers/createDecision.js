//? CRYPTO
import crypto from 'crypto';

//? MONGODB
import decisionModel from '../models/decisionModel.js';

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

        const randomColorScheme = generateRandomNumber(0, 4);

        await decisionModel.create({
            title: req.body.title,
            decisions: req.body.decision,
            guid: guid,
            colorScheme: randomColorScheme,
            createdAt: new Date()
        });
    }
    catch(e){
        console.log("Error saving to MongoDB", e);
    }

    res.json(responseObj);
};

export default createDecision;