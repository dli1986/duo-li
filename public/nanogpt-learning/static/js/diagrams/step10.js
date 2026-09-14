function drawStep10(ctx, canvasWidth, canvasHeight) {
  const tblX = 980, tblY = 90, rows = 65, cols = 13, cw = 14, ch = 8;
  const hlRows = [0.1, 0.35, 0.65, 0.9].map(f => Math.floor(f * 65)); // = [6,22,42,58]
  ctx.fillStyle = "#e6edf3"; ctx.font = "15px monospace"; ctx.textAlign = "left";
  ctx.fillText("lm_head.weight", tblX - 10, tblY - 24);
  ctx.fillStyle = "#8b949e"; ctx.font = "12.5px monospace";
  ctx.fillText("(65,64) \u2014 ALL rows shown, 4 sample rows highlighted", tblX - 10, tblY - 8);
  drawMiniLookupTable(ctx, tblX, tblY, rows, cols, cw, ch, hlRows, 98765);
  ctx.fillStyle = "#f0883e"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("rows = vocab (same 65 as embedding)", tblX - 10, tblY + rows * ch + 18);
  ctx.fillStyle = "#8b949e"; ctx.font = "11.5px monospace";
  ctx.fillText("cols = INDEPENDENTLY learned", tblX - 10, tblY + rows * ch + 36);
  ctx.fillText("(separate weights, not EMB_W)", tblX - 10, tblY + rows * ch + 52);

  const bW = 6, bH = 3, bD = 20, bScale = 32, bOX = 760, bOY = 175;
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    highlightCells: [{ t: 0, h: 0, color: "#e3b341", label: "?" }],
    heatFn: (c, d, W_, D_) => {
      const dim = Math.floor(d / D_ * 64);
      const vocabRow = Math.floor(d / D_ * 65);
      const v = LM_W[vocabRow][dim] * EMB_W[TOKEN_GRID[0][c]][dim];
      return divColor(Math.max(-1, Math.min(1, v * 3)));
    },
    title: "logits = lm_head(ln_f(x))",
    seqLabel: "Sequence Length (T)", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "vocab_size=65 (was Embedding=64)",
  });

  const fc = frontCellCenter(0, 0, bD, bScale, bOX, bOY);
  hlRows.forEach(row => {
    const srcX = tblX - 24, srcY = tblY + row * ch + ch / 2;
    ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(227,179,65,0.6)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(srcX, srcY); ctx.lineTo(fc[0], fc[1]); ctx.stroke(); ctx.restore();
  });
  ctx.fillStyle = "#e3b341"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("unlike step 3: NOT a single-row gather \u2014 all 65 rows each", fc[0] + 95, fc[1] - 90);
  ctx.fillText("contribute one dot-product value to this column (a real matmul)", fc[0] + 95, fc[1] - 74);
  ctx.fillText("4 sample rows shown above; reverse direction from step 3\u2019s table:", fc[0] + 95, fc[1] - 58);
  ctx.fillText("there, ONE row was gathered FROM an index; here, ONE vector is", fc[0] + 95, fc[1] - 42);
  ctx.fillText("compared AGAINST every row, producing a score per row.", fc[0] + 95, fc[1] - 26);
}
