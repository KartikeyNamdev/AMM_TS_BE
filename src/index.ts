import express from "express";
import { swapXForY, swapYForX } from "./potatoAppleLP.js";

const app = express();
const allPools: pool[] = [];
type pool = {
  asset1: string;
  asset1Amount: number;
  asset2: string;
  asset2Amount: number;
  k: number;
};

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AMM ",
  });
});
app.post("/swap", (req, res) => {
  const { asset1, asset2, fromAsset, amount } = req.body;

  if (!asset1 || !asset2 || !fromAsset || !amount) {
    res.json({
      error: "Please provide asset1, asset2, fromAsset, and amount",
    });
    return;
  }

  const poolIndex = allPools.findIndex(
    (p) =>
      (p.asset1 === asset1 && p.asset2 === asset2) ||
      (p.asset1 === asset2 && p.asset2 === asset1),
  );

  if (poolIndex === -1) {
    res.json({
      error: "Pool not found",
    });
    return;
  }

  const pool = allPools[poolIndex]!;
  // Map pool to LP type: x = asset1Amount, y = asset2Amount
  const lp = {
    x: pool.asset1Amount,
    y: pool.asset2Amount,
    k: pool.k,
  };

  try {
    let result;
    if (fromAsset === pool.asset1) {
      result = swapXForY(lp, amount);
      pool.asset1Amount = result.newPool.x;
      pool.asset2Amount = result.newPool.y;
      res.json({
        message: `Traded ${amount} ${pool.asset1} for ${result.extraY} ${pool.asset2}`,
        pool,
      });
    } else if (fromAsset === pool.asset2) {
      result = swapYForX(lp, amount);
      pool.asset1Amount = result.newPool.x;
      pool.asset2Amount = result.newPool.y;
      res.json({
        message: `Traded ${amount} ${pool.asset2} for ${result.extraX} ${pool.asset1}`,
        pool,
      });
    } else {
      res.json({
        error: "fromAsset must be one of the pool assets",
      });
    }
  } catch (e) {
    res.json({
      error: e instanceof Error ? e.message : String(e),
    });
  }
});
app.get("/ticker", (req, res) => {
  res.json({
    pools: allPools,
  });
});

app.get("/getRatio", (req, res) => {
  const { asset1, asset2 } = req.body;
  const pool = allPools.find(
    (p) =>
      (p.asset1 === asset1 && p.asset2 === asset2) ||
      (p.asset1 === asset2 && p.asset2 === asset1),
  );

  if (!pool) {
    res.json({ error: "Pool not found" });
    return;
  }

  const ratio = pool.asset1Amount / pool.asset2Amount;
  res.json({
    asset1: pool.asset1,
    asset2: pool.asset2,
    ratio,
  });
});
app.post("/addPool", (req, res) => {
  const asset1 = req.body.asset1;
  const asset1Amount = req.body.asset1Amount;
  const asset2 = req.body.asset2;
  const asset2Amount = req.body.asset2Amount;

  if (!asset1 || !asset1Amount || !asset2 || !asset2Amount) {
    res.json({
      error: "Please provide all the required fields",
    });
    return;
  }

  const newPool = {
    asset1: asset1,
    asset1Amount: asset1Amount,
    asset2: asset2,
    asset2Amount: asset2Amount,
    k: asset1Amount * asset2Amount,
  };
  allPools.push(newPool);
  res.json({
    message: "Pool added successfully",
    newPool,
  });
});
app.post("/addLiquidity", (req, res) => {
  const { asset1, asset2, asset1Amount, asset2Amount } = req.body;
  if (!asset1 || !asset2 || !asset1Amount || !asset2Amount) {
    res.json({
      error: "Please provide assets name and assets amount",
    });
    return;
  }
  const pool = allPools.find(
    (p) =>
      (p.asset1 === asset1 && p.asset2 === asset2) ||
      (p.asset1 === asset2 && p.asset2 === asset1),
  );

  if (!pool) {
    res.json({
      error: "Pool not found",
    });
    return;
  }

  // Ratio of x and y should be same before or after adding liquidity
  const currentRatio = pool.asset1Amount / pool.asset2Amount;
  const contributionRatio = asset1Amount / asset2Amount;

  // Allow for small floating point differences
  if (Math.abs(currentRatio - contributionRatio) > 0.000001) {
    res.json({
      error: `Current ratio is ${currentRatio}. You must add liquidity in the same ratio.`,
    });
    return;
  }

  pool.asset1Amount += asset1Amount;
  pool.asset2Amount += asset2Amount;
  pool.k = pool.asset1Amount * pool.asset2Amount;

  res.json({
    message: "Liquidity added successfully",
    pool,
  });
});
app.listen(3000, () => {
  console.log("AMM Backend started on port 3000");
});
