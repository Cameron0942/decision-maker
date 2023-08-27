//? EXPRESS
import { Router, json } from "express";
const postRouter = Router();

//? CONTROLLERS
import createDecision from "../controllers/createDecision.js";
import addDecision from "../controllers/addDecision.js";
// import makeDecision from "../controllers/makeDecision.js";

postRouter.use(json());

//* POST methods available to anyone
postRouter.post("/", createDecision);
postRouter.post("/:guid", addDecision);
// postRouter.post("/:guid", makeDecision);

export default postRouter;