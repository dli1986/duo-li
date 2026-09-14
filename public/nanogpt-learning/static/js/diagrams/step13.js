function drawStep13(ctx, canvasWidth, canvasHeight) {
  const tblX = 980, tblY = 110, rows = 24, cols = 13, cw = 14, ch = 13;
  const tracedToken = TOKEN_GRID[0][0];
  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("token_embedding_table.weight", tblX - 10, tblY - 22);
  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace";
  ctx.fillText("(65,64) preview, row " + tracedToken + " highlighted \u2014 FROZEN now", tblX - 10, tblY - 4);
  drawMiniLookupTable(ctx, tblX, tblY, rows, cols, cw, ch, [tracedToken], 12345);
  ctx.fillStyle = "#3fb950"; ctx.font = "14px monospace";
  ctx.fillText("same table as step 3", tblX - 10, tblY + rows * ch + 22);
  ctx.fillStyle = "#8b949e"; ctx.font = "12.5px monospace";
  ctx.fillText("weights no longer change \u2014 training is over,", tblX - 10, tblY + rows * ch + 42);
  ctx.fillText("this lookup is now a pure, fixed function", tblX - 10, tblY + rows * ch + 58);

  const bW = 6, bH = 3, bD = 16, bScale = 40, bOX = 700, bOY = 185;
  function BP(x, y, z) { const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6); return [bOX + (x - z) * c * bScale, bOY + ((x + z) * s - y) * bScale]; }
  const fc0 = [BP(0, 0, bD), BP(1, 0, bD), BP(1, 1, bD), BP(0, 1, bD)];
  const targetX = fc0.reduce((s, p) => s + p[0], 0) / 4, targetY = fc0.reduce((s, p) => s + p[1], 0) / 4;

  const srcX = tblX - 24, srcY = tblY + tracedToken * ch + ch / 2;
  ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(srcX, srcY); ctx.lineTo(targetX, targetY - 10); ctx.stroke();
  const ang = Math.atan2(targetY - srcY, targetX - srcX);
  ctx.beginPath(); ctx.moveTo(targetX, targetY - 10);
  ctx.lineTo(targetX - 11 * Math.cos(ang - 0.4), targetY - 10 - 11 * Math.sin(ang - 0.4));
  ctx.lineTo(targetX - 11 * Math.cos(ang + 0.4), targetY - 10 - 11 * Math.sin(ang + 0.4));
  ctx.closePath(); ctx.fillStyle = "#3fb950"; ctx.fill();
  ctx.fillStyle = "#3fb950"; ctx.font = "15px monospace"; ctx.textAlign = "center";
  ctx.fillText(`row-gather: idx=${tracedToken} \u2192 exact (t=0,b=0) cell`, (srcX + targetX) / 2 + 40, (srcY + targetY) / 2 - 60);

  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    highlightCells: [{ t: 0, h: 0, color: "#e3b341", label: String(tracedToken) }],
    heatFn: (c, d, W_, D_) => {
      const dim = Math.floor(d / D_ * 64);
      return divColor(EMB_W[TOKEN_GRID[0][c]][dim]);
    },
    title: "prefill: (B, P=6, n_embd) \u2014 same mechanism as Phase 1",
    seqLabel: "the whole prompt, P=6", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "Embedding Dimension (n_embd=64)",
  });

  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("identical mechanism to step 3 \u2014 only difference: the table is frozen, not learning anymore", 16, canvasHeight - 16);
}
