function drawStep15(ctx, canvasWidth, canvasHeight) {
  const r = seededRng(2468); const probs = []; let sum = 0;
  for (let i = 0; i < 24; i++) { const v = Math.pow(r(), 2.2); probs.push(v); sum += v; }
  const maxP = Math.max(...probs);
  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("P(next char) \u2014 illustrative distribution, real mechanism", 16, 30);
  for (let i = 0; i < 24; i++) {
    const h = (probs[i] / maxP) * 230;
    ctx.fillStyle = probs[i] === maxP ? "#3fb950" : "#30506e";
    ctx.fillRect(20 + i * 44, 270 - h, 36, h);
  }
}
