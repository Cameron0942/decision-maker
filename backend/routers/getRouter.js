//? EXPRESS
import { Router, json } from "express";
const getRouter = Router();

//? CONTROLLERS
import getDecisions from "../controllers/getDecisions.js";
import makeDecision from "../controllers/makeDecision.js";
import getChosenDecision from "../controllers/getChosenDecision.js";

getRouter.use(json());

getRouter.get("/:guid", getDecisions);
getRouter.get("/:guid/choice", makeDecision);
getRouter.get("/:guid/choice/chosen", getChosenDecision);

export default getRouter;