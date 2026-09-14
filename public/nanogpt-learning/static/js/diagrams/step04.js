function drawStep4(ctx, canvasWidth, canvasHeight) {
  const tblX = 1350, tblY = 110, rows = 32, cols = 13, cw = 14, ch = 13;
  const tracedPos = 0;
  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("position_embedding_table.weight", tblX - 10, tblY - 22);
  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace";
  ctx.fillText("(32,64) full table, row " + tracedPos + " highlighted", tblX - 10, tblY - 4);
  drawMiniLookupTable(ctx, tblX, tblY, rows, cols, cw, ch, [tracedPos], 55555);
  ctx.fillStyle = "#3fb950"; ctx.font = "14px monospace";
  ctx.fillText("rows = position slot (0..31)", tblX - 10, tblY + rows * ch + 22);
  ctx.fillText("cols = semantics", tblX - 10, tblY + rows * ch + 42);
  ctx.fillStyle = "#8b949e"; ctx.font = "12.5px monospace";
  ctx.fillText("all 32 rows shown \u2014 block_size is small enough", tblX - 10, tblY + rows * ch + 62);
  ctx.fillText("to fit completely (unlike vocab\u2019s 65 rows in step 3)", tblX - 10, tblY + rows * ch + 78);

  const bW = 6, bH = 3, bD = 16, bScale = 40, bOX = 700, bOY = 185;

  const srcX = tblX - 24, srcY = tblY + tracedPos * ch + ch / 2;
  const rowTargets = [0, 1, 2].map(h => frontCellCenter(0, h, bD, bScale, bOX, bOY));

  rowTargets.forEach(tgt => {
    ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(srcX, srcY); ctx.lineTo(tgt[0], tgt[1] - 9); ctx.stroke();
    const ang = Math.atan2(tgt[1] - 9 - srcY, tgt[0] - srcX);
    ctx.beginPath(); ctx.moveTo(tgt[0], tgt[1] - 9);
    ctx.lineTo(tgt[0] - 9 * Math.cos(ang - 0.4), tgt[1] - 9 - 9 * Math.sin(ang - 0.4));
    ctx.lineTo(tgt[0] - 9 * Math.cos(ang + 0.4), tgt[1] - 9 - 9 * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fillStyle = "#3fb950"; ctx.fill();
  });
  ctx.fillStyle = "#3fb950"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("row-gather ONCE:", 1050, 178);
  ctx.fillText(`pos=${tracedPos} \u2192 fans into all 3 batch rows`, 1050, 196);
  ctx.fillText("(3 real arrows shown, not 1)", 1050, 214);

  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    highlightCells: [
      { t: 0, h: 0, color: "#e3b341", label: "pos=0" },
      { t: 0, h: 1, color: "#e3b341", label: "pos=0" },
      { t: 0, h: 2, color: "#e3b341", label: "pos=0" },
    ],
    heatFn: (c, d, W_, D_) => {
      const dim = Math.floor(d / D_ * 64);
      return divColor(POS_W[c][dim]);
    },
    title: "pos_emb = position_embedding_table(arange(T))",
    seqLabel: "Sequence = Position (T)", seqSubLabel: "",
    heightLabel: "Batch Size (B) \u2014 identical every row!", depthLabel: "Embedding Dimension (n_embd=64)",
  });

  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("unlike step 3: ONE row feeds the WHOLE t=0 column at once \u2014 no per-batch difference possible here", 16, canvasHeight - 16);
}
