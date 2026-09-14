function drawStep12(ctx, canvasWidth, canvasHeight) {
  ctx.textAlign = "center";
  for (let i = 0; i < 4; i++) {
    const x = 70 + i * 250;
    ctx.fillStyle = "#1c2333"; ctx.fillRect(x, 120, 190, 120); ctx.strokeStyle = "#e3b341"; ctx.lineWidth = 2.4; ctx.strokeRect(x, 120, 190, 120);
    ctx.fillStyle = "#e3b341"; ctx.font = "19px monospace"; ctx.fillText(`Block ${i}`, x + 95, 168);
    ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.fillText("+ grad buffer", x + 95, 196);
    ctx.fillText("+ Adam state", x + 95, 216);
  }
  ctx.strokeStyle = "#f85149"; ctx.lineWidth = 2.4; ctx.font = "24px monospace"; ctx.fillStyle = "#f85149";
  for (let i = 0; i < 3; i++) { const x = 320 + i * 250; ctx.beginPath(); ctx.moveTo(x, 180); ctx.lineTo(x - 60, 180); ctx.stroke(); ctx.fillText("\u2190", x - 30, 188); }
  ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.fillText("loss.backward()  \u2014  gradient flows RIGHT \u2192 LEFT", canvasWidth / 2, 70);
  ctx.fillStyle = "#8b949e"; ctx.font = "15px monospace"; ctx.fillText("memory: params + activations + grads + optimizer state (~3-4\u00d7 params)", canvasWidth / 2, 300);
}
