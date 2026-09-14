function drawStep18(ctx, canvasWidth, canvasHeight) {
  const bW = 1, bH = 3, bD = 4, bScale = 52, bOX = 600, bOY = 240;
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    highlightCells: [{ t: 0, h: 0, color: "#3fb950", label: "new" }],
    heatFn: (c, d, W_, D_) => {
      const dim = Math.floor(d / D_ * 4);
      const v = (EMB_W[TOKEN_GRID[0][0]][dim] + 1) / 2;
      return `rgba(63,185,80,${0.35 + v * 0.6})`;
    },
    title: "k_cache grows: (B, T_so_far, head_size)",
    seqLabel: "new position", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "head_size=4",
  });
  ctx.fillStyle = "#8b949e"; ctx.font = "13px monospace"; ctx.textAlign = "left";
  ctx.fillText("highlighted cell = k_new, this step\u2019s only new column \u2014 appended via torch.cat, not overwritten", 16, canvasHeight - 16);
}
