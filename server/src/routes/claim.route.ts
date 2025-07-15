import { Router } from "express";
import claimPoints from "../controllers/claim.controller";

const claimRouter = Router();

claimRouter.post("/claim-points", claimPoints);

export default claimRouter;
