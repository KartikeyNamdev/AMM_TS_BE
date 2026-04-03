type LP = {
  x: number;
  y: number;
  k: number;
};
export function swapXForY(lp: LP, x: number) {
  // When we give the potatoes, it calculates : A trader comes and want to give 7k potatoes to the pool and wants apples
  // 1. Increased potatoes => From 50k to 57k
  // 2. Maintain the constant and find the apples => 2,500,000,000 / 57,000 = 43,859.6491228
  // 3. There should be 43,859.6491228 apples but in reality we have 50k apples
  // 4. So we return the extra, because we need to maintain the constant k => 50k - 43,859.6491228 = 6140.3508772
  // Gave 6140.3508772 apples to trader in return of his 7k potatoes
  const currentPool = lp;
  const oldX = currentPool.x;
  const fee = 0.003;
  const amountWithFee = x * (1 - fee);

  const newX = oldX + amountWithFee;
  const oldY = currentPool.y;
  const newY = lp.k / newX;
  const extraY = oldY - newY;
  return {
    newPool: {
      x: newX,
      y: newY,
      k: lp.k,
    },
    extraY,
  };
}
export function swapYForX(lp: LP, y: number) {
  const currentPool = lp;
  const oldX = currentPool.x;
  const fee = 0.003;
  const amountWithFee = y * (1 - fee);
  const oldY = currentPool.y;
  const newY = oldY + amountWithFee;
  const extraX = oldX - lp.k / newY;
  return {
    newPool: {
      x: extraX,
      y: newY,
      k: lp.k,
    },
    extraX,
  };
}

export default swapXForY;
