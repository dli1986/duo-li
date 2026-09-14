function drawStep20(ctx, canvasWidth, canvasHeight) {
  ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 3; ctx.textAlign = "center";
  ctx.beginPath(); ctx.arc(canvasWidth / 2, 110, 70, 0.2 * Math.PI, 1.9 * Math.PI); ctx.stroke();
  ctx.fillStyle = "#3fb950"; ctx.font = "34px monospace"; ctx.fillText("\u21bb", canvasWidth / 2, 122);
  ctx.fillStyle = "#e6edf3"; ctx.font = "17px monospace"; ctx.fillText("steps 14 \u2192 19 repeat, once per new token", canvasWidth / 2, 230);
}
