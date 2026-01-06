import { Router } from "express";
import { solveMinKnapsack } from "../controllers/knapsackController.js";

const router = Router();

router.post("/minimize", solveMinKnapsack);

export default router;
