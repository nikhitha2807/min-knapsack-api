import { minKnapsack } from "../services/knapsackService.js";

export const solveMinKnapsack = (req, res) => {
  const { requiredValue, items } = req.body;

  if (!requiredValue || !items || items.length === 0) {
    return res.status(400).json({
      message: "requiredValue and items are required"
    });
  }

  const result = minKnapsack(requiredValue, items);

  if (!result) {
    return res.status(400).json({
      message: "Target value cannot be achieved"
    });
  }

  res.json(result);
};
