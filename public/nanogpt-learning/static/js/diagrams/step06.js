// step06-diagram.js — ported from gpt-pipeline.html's drawStep6(). Only the
// function signature changed (accepts ctx/width/height directly instead of
// looking up a <canvas> by id and calling ctx.clearRect/fillRect for a
// background - the SVG's CSS wrapper already provides the dark background).
// All data, layout math, and colors are unchanged from the original.
function drawStep6(ctx, canvasWidth, canvasHeight) {
  // Real data, notebook cell 21 (torch.manual_seed(7), T=5, C=8, head_size=4).
  const xRow = [
    [-0.82, 0.40, 0.90, -1.39, -0.17, 0.29, -0.64, -0.89],
    [0.93, -0.54, -1.16, -0.46, 0.71, 1.01, 0.23, 1.09],
    [-1.58, -0.32, 1.93, -0.33, 0.20, 0.78, 1.04, -0.72],
    [-0.14, 0.75, 0.61, 1.87, 2.51, -1.25, 0.82, -1.07],
    [-1.64, 0.16, 0.40, -1.37, -0.10, 0.24, 0.63, -0.09],
  ];
  const qRow = [
    [0.28, 0.29, -0.78, -0.68],
    [-0.69, 0.33, 0.23, 0.65],
    [0.87, 0.14, -0.29, -0.56],
    [0.64, -0.19, 0.72, -0.71],
    [0.22, 0.38, -0.75, -0.38],
  ];
  const rawWei = [
    [-0.17, -0.14, -0.21, 0.88, -0.17],
    [-0.01, -0.24, 0.17, -0.42, 0.05],
    [0.09, -0.04, -0.29, 0.52, -0.08],
  ];

  const aW = 5, aH = 3, aD = 8, aScale = 30, aOX = 340, aOY = 250;
  ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.textAlign = "left";
  ctx.fillText("x \u2014 (B,T,C), the surface used in steps 1\u20135", 14, 30);
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: aW, H: aH, D: aD, scale: aScale, originX: aOX, originY: aOY,
    heatFn: (c, d) => divColor(xRow[c][d] / 2),
    seqLabel: "Sequence (T)", seqSubLabel: "",
    heightLabel: "Batch (B)", depthLabel: "Channel (C=8)",
  });

  const arrowY = aOY + 40, arrowX0 = aOX + 150, arrowX1 = 750;
  const grad = ctx.createLinearGradient(arrowX0, 0, arrowX1, 0);
  grad.addColorStop(0, "#3b82f6"); grad.addColorStop(1, "#e3b341");
  ctx.strokeStyle = grad; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(arrowX0, arrowY); ctx.lineTo(arrowX1, arrowY); ctx.stroke();
  ctx.fillStyle = "#e3b341";
  ctx.beginPath(); ctx.moveTo(arrowX1, arrowY); ctx.lineTo(arrowX1 - 14, arrowY - 8); ctx.lineTo(arrowX1 - 14, arrowY + 8); ctx.closePath(); ctx.fill();
  ctx.font = "12.5px monospace"; ctx.textAlign = "center";
  ctx.fillStyle = "#8b949e";
  ctx.fillText("fix ONE batch", (arrowX0 + arrowX1) / 2, arrowY - 14);
  ctx.fillText("(proven independent \u2192 free)", (arrowX0 + arrowX1) / 2, arrowY + 22);

  const bW = 5, bH = 1, bD = 4, bScale = 34, bOX = 1010, bOY = 210;
  ctx.fillStyle = "#e3b341"; ctx.font = "18px monospace"; ctx.textAlign = "left";
  ctx.fillText("q \u2014 (T,head_size), what attention computes with", 780, 30);
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: bW, H: bH, D: bD, scale: bScale, originX: bOX, originY: bOY,
    fill: "rgba(227,179,65,0.22)", edgeColor: "#e3b341", labelColor: "#e3b341",
    heatFn: (c, d) => divColor(qRow[c][d]),
    seqLabel: "Sequence = Position (T)", seqSubLabel: "",
    heightLabel: "B=1 (fixed \u2014 box IS thinner)", depthLabel: "head_size=4",
  });

  const kIllus = (() => { const r = seededRng(24680); const M = []; for (let i = 0; i < 3; i++) { const row = []; for (let j = 0; j < 4; j++) row.push(r() * 2 - 1); M.push(row); } return M; })();

  const qx0 = 100, cellH = 36, cellW = 52;
  const qRight = qx0 + 4 * cellW;
  const ktX = qRight + 55;

  const boxBBottom = 485;
  const thumbCell = 16, thumbX = ktX, thumbY = boxBBottom + 45;
  ctx.fillStyle = "#e3b341"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("K (illustrative pattern \u2014 own weights Wk, cells not printed)", thumbX - 40, thumbY - 16);
  for (let r = 0; r < 3; r++) {
    ctx.fillStyle = "#8b949e"; ctx.font = "9px monospace"; ctx.textAlign = "right";
    ctx.fillText(`P${r}`, thumbX - 4, thumbY + r * thumbCell + 11);
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = `rgba(227,179,65,${0.25 + Math.abs(kIllus[r][c]) * 0.4})`;
      ctx.fillRect(thumbX + c * thumbCell, thumbY + r * thumbCell, thumbCell - 2, thumbCell - 2);
      ctx.strokeStyle = "#3a2f10"; ctx.strokeRect(thumbX + c * thumbCell, thumbY + r * thumbCell, thumbCell - 2, thumbCell - 2);
    }
  }
  const thumbBottom = thumbY + 3 * thumbCell;

  const mainY = thumbBottom + 90;
  ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = "#e3b341"; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(thumbX + 2 * thumbCell, thumbBottom + 2); ctx.quadraticCurveTo(thumbX + 40, thumbBottom + 30, thumbX + 30, mainY - 55); ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#e3b341"; ctx.font = "11px monospace"; ctx.textAlign = "left";
  ctx.fillText("transpose", thumbX + 50, thumbBottom + 22);

  ctx.fillStyle = "#58a6ff"; ctx.font = "13px monospace"; ctx.textAlign = "left";
  ctx.fillText("Q (real)", qx0, mainY - 10);
  for (let r = 0; r < 3; r++) {
    ctx.fillStyle = "#8b949e"; ctx.font = "11px monospace"; ctx.textAlign = "right";
    ctx.fillText(`P${r}`, qx0 - 8, mainY + r * cellH + 22);
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = divColor(qRow[r][c]);
      ctx.fillRect(qx0 + c * cellW, mainY + r * cellH, cellW - 4, cellH - 4);
      ctx.strokeStyle = "#30363d"; ctx.strokeRect(qx0 + c * cellW, mainY + r * cellH, cellW - 4, cellH - 4);
      ctx.fillStyle = "#e6edf3"; ctx.font = "11px monospace"; ctx.textAlign = "center";
      ctx.fillText(qRow[r][c].toFixed(2), qx0 + c * cellW + (cellW - 4) / 2, mainY + r * cellH + (cellH - 4) / 2 + 4);
    }
  }
  const qCenterY = mainY + 1.5 * cellH;

  ctx.fillStyle = "#e6edf3"; ctx.font = "20px monospace"; ctx.textAlign = "center";
  ctx.fillText("@", qRight + 30, qCenterY + 6);

  ctx.fillStyle = "#e3b341"; ctx.font = "13px monospace"; ctx.textAlign = "center";
  for (let c = 0; c < 3; c++) ctx.fillText(`P${c}`, ktX + c * cellW + (cellW - 4) / 2, mainY - 10);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = `rgba(227,179,65,${0.25 + Math.abs(kIllus[c][r]) * 0.4})`;
      ctx.fillRect(ktX + c * cellW, mainY + r * cellH, cellW - 4, cellH - 4);
      ctx.strokeStyle = "#3a2f10"; ctx.strokeRect(ktX + c * cellW, mainY + r * cellH, cellW - 4, cellH - 4);
    }
  }
  const ktRight = ktX + 3 * cellW, ktCenterY = mainY + 2 * cellH;
  ctx.fillStyle = "#8b949e"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("K.T (illustrative)", ktX + 1.5 * cellW, mainY + 4 * cellH + 18);

  ctx.fillStyle = "#e6edf3"; ctx.font = "20px monospace"; ctx.textAlign = "center";
  ctx.fillText("=", ktRight + 30, ktCenterY + 6);

  ctx.fillStyle = "#8b949e"; ctx.font = "11.5px monospace"; ctx.textAlign = "left";
  ctx.fillText("same 3 positions, DIFFERENT weights (Wq \u2260 Wk)", qx0, mainY - 40);
  ctx.fillText("\u2192 Q and K.T are genuinely different matrices", qx0, mainY - 24);

  const wcell = 64, wx0 = ktRight + 55, wy0 = mainY - 14;
  ctx.fillStyle = "#e6edf3"; ctx.font = "15px monospace"; ctx.textAlign = "left";
  ctx.fillText("wei_raw = Q@K.T \u2014 real, unmasked", wx0, wy0 - 14);
  ctx.fillStyle = "#8b949e"; ctx.font = "11px monospace";
  ctx.fillText("head_size (4) eliminated \u2014 only Position\u00d7Position survives", wx0, wy0 + 3 * wcell + 22);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const v = rawWei[r][c];
      ctx.fillStyle = divColor(v);
      ctx.fillRect(wx0 + c * wcell, wy0 + r * wcell, wcell - 4, wcell - 4);
      ctx.strokeStyle = "#30363d"; ctx.strokeRect(wx0 + c * wcell, wy0 + r * wcell, wcell - 4, wcell - 4);
      ctx.fillStyle = "#e6edf3"; ctx.font = "14px monospace"; ctx.textAlign = "center";
      ctx.fillText(v.toFixed(2), wx0 + c * wcell + (wcell - 4) / 2, wy0 + r * wcell + (wcell - 4) / 2 + 5);
    }
  }
  ctx.strokeStyle = "#f0883e"; ctx.lineWidth = 3;
  ctx.strokeRect(wx0 + 2 * wcell, wy0 + 0 * wcell, wcell - 4, wcell - 4);
  ctx.strokeStyle = "#bc8cff"; ctx.lineWidth = 3;
  ctx.strokeRect(wx0 + 0 * wcell, wy0 + 2 * wcell, wcell - 4, wcell - 4);

  const capX = wx0 + 3 * wcell + 30;
  ctx.fillStyle = "#e6edf3"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText("NOT symmetric:", capX, wy0 + 20);
  ctx.fillStyle = "#f0883e"; ctx.fillText(`wei[0][2] = ${rawWei[0][2].toFixed(2)}`, capX, wy0 + 44);
  ctx.fillStyle = "#bc8cff"; ctx.fillText(`wei[2][0] = ${rawWei[2][0].toFixed(2)}`, capX, wy0 + 68);
  ctx.fillStyle = "#8b949e"; ctx.font = "12px monospace";
  ctx.fillText("opposite sign \u2014 Wq \u2260 Wk breaks Gram symmetry", capX, wy0 + 94);
}
