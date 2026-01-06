import express from "express";
import knapsackRouter from "./routes/knapsackRouter.js";

const app = express();

app.use(express.json());

app.use("/api/knapsack", knapsackRouter);

app.get("/", (req, res) => {
  res.send("Minimize Knapsack API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
