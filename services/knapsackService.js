export const minKnapsack = (requiredValue, items) => {
  const maxValue = items.reduce((sum, item) => sum + item.value, 0);
  const INF = Number.MAX_SAFE_INTEGER;

  const dp = Array(maxValue + 1).fill(INF);
  dp[0] = 0;

  for (const item of items) {
    for (let v = maxValue; v >= item.value; v--) {
      dp[v] = Math.min(dp[v], dp[v - item.value] + item.weight);
    }
  }

  let minWeight = INF;
  let achievedValue = -1;

  for (let v = requiredValue; v <= maxValue; v++) {
    if (dp[v] < minWeight) {
      minWeight = dp[v];
      achievedValue = v;
    }
  }

  if (minWeight === INF) return null;

  return {
    minWeight,
    achievedValue
  };
};
