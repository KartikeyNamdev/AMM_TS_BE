import express from "express";
import swapPotatoesForApples from "./potatoAppleLP.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AMM ",
  });
});
let potatoAppleLP = {
  potatoes: 50000,
  apples: 50000,
  k: 50000 * 50000,
};
app.post("/swap", (req, res) => {
  const potatoesAmount = req.body.potatoesAmount;
  if (!potatoesAmount) {
    res.json({
      error: "Please provide potatoes amount",
    });
    return;
  }
  try {
    const result = swapPotatoesForApples(potatoAppleLP, potatoesAmount);
    potatoAppleLP = result.newPool;
    res.json({
      message: `Traded your ${potatoesAmount} potatoes for ${result.extraApples} apples`,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});
app.get("/ticker", (req, res) => {
  res.json({
    message: potatoAppleLP,
  });
});

app.post("/addLiquidity", (req, res) => {
  const { potatoesAmount, applesAmount } = req.body;
  if (!potatoesAmount || !applesAmount) {
    res.json({
      error: "Please provide potatoes and apples amount",
    });
    return;
  }

  potatoAppleLP.potatoes += potatoesAmount;
  potatoAppleLP.apples += applesAmount;
  res.json({
    message: {
      potatoAppleLP,
    },
  });
});
app.listen(3000, () => {
  console.log("AMM Backend started on port 3000");
});
