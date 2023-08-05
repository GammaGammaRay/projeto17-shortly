import { Router } from "express";
import validateSchema from "../middleware/validateSchema.js";
import { getRank } from "../controllers/rank.controller.js";

const rankRouter = Router();

rankRouter.get("/customers", getRank)


export default rankRouter;