import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------- DP LOGIC (Minimize Knapsack) ----------
function minimizeKnapsack(requiredValue, items) {
  const maxValue = requiredValue + Math.max(...items.map(i => i.value));
  const dp = Array(maxValue + 1).fill(Infinity);
  dp[0] = 0;

  for (const item of items) {
    for (let v = maxValue; v >= item.value; v--) {
      dp[v] = Math.min(dp[v], dp[v - item.value] + item.weight);
    }
  }

  let minWeight = Infinity;
  let achievedValue = 0;

  for (let v = requiredValue; v <= maxValue; v++) {
    if (dp[v] < minWeight) {
      minWeight = dp[v];
      achievedValue = v;
    }
  }

  return { minWeight, achievedValue };
}

// --------- HTML FORM ----------
app.get("/", (req, res) => {
  res.send(`
    <h1>Minimize Knapsack DP Calculator</h1>

    <form method="POST" action="/calculate">
      <label>Required Value:</label><br/>
      <input name="requiredValue" required /><br/><br/>

      <label>Items (weight:value comma separated)</label><br/>
      <input name="items" placeholder="10:20,20:30,30:40" required /><br/><br/>

      <button type="submit">Calculate</button>
    </form>
  `);
});

// --------- HANDLE FORM SUBMISSION ----------
app.post("/calculate", (req, res) => {
  const requiredValue = Number(req.body.requiredValue);
  const items = req.body.items.split(",").map(pair => {
    const [weight, value] = pair.split(":").map(Number);
    return { weight, value };
  });

  const result = minimizeKnapsack(requiredValue, items);

  res.send(`
    <h1>Result</h1>
    <p><b>Minimum Weight:</b> ${result.minWeight}</p>
    <p><b>Achieved Value:</b> ${result.achievedValue}</p>
    <a href="/">Try Again</a>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
