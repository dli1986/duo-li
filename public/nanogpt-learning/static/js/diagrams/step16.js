function drawStep16(ctx, canvasWidth, canvasHeight) {
  const r = seededRng(2468); const probs = []; let sum = 0;
  for (let i = 0; i < 24; i++) { const v = Math.pow(r(), 2.2); probs.push(v); sum += v; }
  const maxP = Math.max(...probs);
  const sampled = 5;
  for (let i = 0; i < 24; i++) {
    const h = (probs[i] / maxP) * 170;
    ctx.fillStyle = i === sampled ? "#e3b341" : "rgba(48,80,110,0.5)";
    ctx.fillRect(20 + i * 44, 210 - h, 36, h);
  }
  ctx.fillStyle = "#e3b341"; ctx.font = "16px monospace"; ctx.textAlign = "center";
  ctx.fillText("\u2193 sampled", 20 + sampled * 44 + 18, 232);
  ctx.fillText("torch.multinomial(probs, num_samples=1)", canvasWidth / 2, 280);
}
