function drawStep5(ctx, canvasWidth, canvasHeight) {
  const bW = 6, bH = 3, bD = 16, bScale = 40, bOX = 700, bOY = 185;
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    highlightCells: [{ t: 0, h: 0, color: "#e3b341", label: "+" }],
    heatFn: (c, d, W_, D_) => {
      const dim = Math.floor(d / D_ * 64);
      const v = (EMB_W[TOKEN_GRID[0][c]][dim] + POS_W[c][dim]) / 2;
      return divColor(v);
    },
    title: "x = tok_emb + pos_emb",
    seqLabel: "Sequence Length (T)", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "Embedding Dimension (n_embd=64)",
  });

  const tblX = 1020, tblY = 160, cellW = 52, cellH = 42;
  const tokId = TOKEN_GRID[0][0];
  ctx.fillStyle = "#e6edf3"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("x[0] = tok_emb[0] + pos_emb[0]  (first 5 of 64 dims, real)", tblX - 10, tblY - 16);

  function row(label, color, values, y) {
    ctx.fillStyle = color; ctx.font = "12px monospace"; ctx.textAlign = "right";
    ctx.fillText(label, tblX - 6, y + cellH / 2 + 4);
    values.forEach((v, i) => {
      ctx.fillStyle = "#1c2333"; ctx.fillRect(tblX + i * cellW, y, cellW - 4, cellH - 6);
      ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.strokeRect(tblX + i * cellW, y, cellW - 4, cellH - 6);
      ctx.fillStyle = color; ctx.font = "12px monospace"; ctx.textAlign = "center";
      ctx.fillText(v.toFixed(2), tblX + i * cellW + (cellW - 4) / 2, y + cellH / 2 + 4);
    });
  }
  const tokVals = [0, 1, 2, 3, 4].map(d => EMB_W[tokId][d]);
  const posVals = [0, 1, 2, 3, 4].map(d => POS_W[0][d]);
  const sumVals = [0, 1, 2, 3, 4].map(d => tokVals[d] + posVals[d]);
  row(`tok_emb[${tokId}]`, "#58a6ff", tokVals, tblY);
  row("pos_emb[0]", "#e3b341", posVals, tblY + cellH + 8);
  ctx.strokeStyle = "#8b949e"; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(tblX - 6, tblY + 2 * cellH + 18); ctx.lineTo(tblX + 5 * cellW - 10, tblY + 2 * cellH + 18); ctx.stroke();
  ctx.fillStyle = "#8b949e"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("+", tblX - 24, tblY + cellH + 8 + cellH / 2 + 6);
  row("x[0]", "#3fb950", sumVals, tblY + 2 * cellH + 26);
  ctx.fillStyle = "#8b949e"; ctx.font = "11.5px monospace"; ctx.textAlign = "left";
  ctx.fillText("plain elementwise add (steps 3+4 tables)", tblX - 10, tblY + 3 * cellH + 50);
}
