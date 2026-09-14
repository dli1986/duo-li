function drawStep11(ctx, canvasWidth, canvasHeight) {
  const r = seededRng(777); const probs = []; let sum = 0;
  for (let i = 0; i < 20; i++) { const v = Math.pow(r(), 3); probs.push(v); sum += v; }
  const targetIdx = 6;
  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("predicted probs (blue) vs. the ONE correct target (green), one position", 16, 30);
  for (let i = 0; i < 20; i++) {
    const h = (probs[i] / sum) * 220;
    ctx.fillStyle = i === targetIdx ? "#3fb950" : "#58a6ff";
    ctx.fillRect(30 + i * 52, 260 - h, 40, h);
  }
  ctx.fillStyle = "#f85149"; ctx.font = "15px monospace";
  ctx.fillText("loss = -log(P(correct))  \u2014 low if green bar is tall, high if short", 16, 300);
}
