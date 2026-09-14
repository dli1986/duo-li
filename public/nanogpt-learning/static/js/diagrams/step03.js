function drawStep3(ctx, canvasWidth, canvasHeight) {
  const tblX = 980, tblY = 110, rows = 24, cols = 13, cw = 14, ch = 13;
  const tracedToken = TOKEN_GRID[0][0]; // = 18 ('F' of "First")
  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "left";
  ctx.fillText("token_embedding_table.weight", tblX - 10, tblY - 22);
  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace";
  ctx.fillText("(65,64) preview, row " + tracedToken + " highlighted", tblX - 10, tblY - 4);
  drawMiniLookupTable(ctx, tblX, tblY, rows, cols, cw, ch, [tracedToken], 12345);
  ctx.fillStyle = "#3fb950"; ctx.font = "14px monospace";
  ctx.fillText("rows = identity", tblX - 10, tblY + rows * ch + 22);
  ctx.fillText("cols = semantics", tblX - 10, tblY + rows * ch + 42);

  const bW = 6, bH = 3, bD = 16, bScale = 30, bOX = 600, bOY = 175;
  function BP(x, y, z) { const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6); return [bOX + (x - z) * c * bScale, bOY + ((x + z) * s - y) * bScale]; }

  const fc = [BP(0, 0, bD), BP(1, 0, bD), BP(1, 1, bD), BP(0, 1, bD)];
  const targetX = fc.reduce((s, p) => s + p[0], 0) / 4, targetY = fc.reduce((s, p) => s + p[1], 0) / 4;

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
    title: "tok_emb = token_embedding_table(idx)",
    seqLabel: "Sequence Length (T)", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "",
  });

  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("front face = the real (B,T) input shape (Sequence \u00d7 Batch); top face = the resulting dense values after lookup", 16, canvasHeight - 16);
}
