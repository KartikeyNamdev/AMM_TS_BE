type LP = {
  potatoes: number;
  apples: number;
  k: number;
};
export function swapPotatoesForApples(lp: LP, amountPotatoes: number) {
  const currentPool = lp;
  const oldPotatoes = currentPool.potatoes;
  const oldApples = currentPool.apples;
  // When we give the potatoes, it calculates : A trader comes and want to give 7k potatoes to the pool and wants apples
  // 1. Increased potatoes => From 50k to 57k
  const newPotatoes = oldPotatoes + amountPotatoes;
  // 2. Maintain the constant and find the apples => 2,500,000,000 / 57,000 = 43,859.6491228
  const newApples = lp.k / newPotatoes;
  // 3. There should be 43,859.6491228 apples but in reality we have 50k apples
  const extraApples = oldApples - newApples;
  // 4. So we return the extra, because we need to maintain the constant k => 50k - 43,859.6491228 = 6140.3508772
  // Gave 6140.3508772 apples to trader in return of his 7k potatoes
  return {
    newPool: {
      potatoes: newPotatoes,
      apples: newApples,
      k: lp.k,
    },
    extraApples,
  };
}

export default swapPotatoesForApples;
