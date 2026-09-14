function drawStep19(ctx, canvasWidth, canvasHeight) {
  const blockSize = 6;
  const seq = [10, 20, 30, 40, 52, 82, 85, 75, 69];
  const windowStart = Math.max(0, seq.length - blockSize);
  ctx.textAlign = "center"; ctx.font = "16px monospace";
  seq.forEach((v, i) => {
    const inWin = i >= windowStart;
    ctx.fillStyle = inWin ? (i === seq.length - 1 ? "#e3b341" : "rgba(31,111,235,0.4)") : "#161b22";
    ctx.fillRect(16 + i * 116, 90, 100, 56); ctx.strokeStyle = inWin ? "#58a6ff" : "#30363d"; ctx.lineWidth = 2; ctx.strokeRect(16 + i * 116, 90, 100, 56);
    ctx.fillStyle = inWin ? "#e6edf3" : "#484f58"; ctx.fillText(String(v), 66 + i * 116, 124);
  });
  ctx.fillStyle = "#f85149"; ctx.font = "15px monospace";
  ctx.fillText(`block_size=${blockSize}: oldest ${windowStart} entries evicted from window`, canvasWidth / 2, 200);
  ctx.fillStyle = "#8b949e"; ctx.fillText("k_cache = k_cache[:, -block_size:]  \u2014 same rule, applied to K/V", canvasWidth / 2, 230);
}
