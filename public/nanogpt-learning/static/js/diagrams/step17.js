function drawStep17(ctx, canvasWidth, canvasHeight) {
  const seq = [10, 20, 30, 40, 52];
  ctx.textAlign = "center"; ctx.font = "18px monospace";
  seq.forEach((v, i) => {
    ctx.fillStyle = i === seq.length - 1 ? "#e3b341" : "#1c2333";
    ctx.fillRect(40 + i * 140, 90, 120, 64); ctx.strokeStyle = i === seq.length - 1 ? "#e3b341" : "#30363d"; ctx.lineWidth = 2; ctx.strokeRect(40 + i * 140, 90, 120, 64);
    ctx.fillStyle = "#e6edf3"; ctx.fillText(String(v), 100 + i * 140, 130);
  });
  ctx.fillStyle = "#8b949e"; ctx.font = "16px monospace";
  ctx.fillText("idx = torch.cat((idx, idx_next), dim=1)", canvasWidth / 2, 200);
  ctx.fillStyle = "#e3b341"; ctx.fillText("new token appended \u2192 loop back to step 14", canvasWidth / 2, 230);
}
