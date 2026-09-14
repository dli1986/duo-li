// tensor-box.js — ported from gpt-pipeline.html's isoProject/renderTensorBox/
// divColor/seededRng/lerp, UNCHANGED math, adapted only to take a ctx (our
// SVGCanvasContext) plus explicit width/height instead of looking up a
// <canvas> element by id and reading canvas.width/canvas.height from it.

function lerp(a, b, t) { return a + (b - a) * t; }

function seededRng(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

function divColor(v) { // diverging blue(neg) - orange(pos), v in [-1,1]
  if (v >= 0) {
    const t = Math.min(1, v);
    return `rgb(${Math.round(lerp(35, 240, t))},${Math.round(lerp(40, 150, t))},${Math.round(lerp(50, 60, t))})`;
  }
  const t = Math.min(1, -v);
  return `rgb(${Math.round(lerp(35, 60, t))},${Math.round(lerp(40, 140, t))},${Math.round(lerp(50, 255, t))})`;
}

function isoProject(x, y, z, scale) {
  const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6);
  return [(x - z) * c * scale, ((x + z) * s - y) * scale];
}

// Isometric solid tensor-box renderer. Same signature/behavior as the
// original, minus the canvas-lookup (ctx passed directly) and clear-screen
// step (SVG starts empty; no background fill needed — the page provides it).
function renderTensorBox(ctx, canvasWidth, canvasHeight, opts) {
  const {
    W = 6, H = 3, D = 10, scale = 48,
    originX = canvasWidth / 2, originY = canvasHeight / 2,
    seqLabel = "Sequence Length (T)", seqSubLabel = "(Block Size)",
    heightLabel = "Batch Size (B)",
    depthLabel = "Embedding Dimension (D)",
    highlightCells = [],
    title = "",
    fill = "rgba(147,197,253,0.26)", edgeColor = "#3b82f6", labelColor = "#8fb8f0",
    heatFn = null,
  } = opts;

  function P(x, y, z) { const [sx, sy] = isoProject(x, y, z, scale); return [originX + sx, originY + sy]; }
  function quad(p0, p1, p2, p3, fillCol, strokeCol, strokeW) {
    ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.closePath();
    if (fillCol) { ctx.fillStyle = fillCol; ctx.fill(); }
    ctx.strokeStyle = strokeCol || "rgba(59,130,246,0.5)"; ctx.lineWidth = strokeW || 1; ctx.stroke();
  }

  for (let a = 0; a < W; a++) for (let b = 0; b < D; b++) {
    const col = heatFn ? heatFn(a, b, W, D) : null;
    quad(P(a, H, b), P(a + 1, H, b), P(a + 1, H, b + 1), P(a, H, b + 1), col || fill);
  }
  for (let a = 0; a < D; a++) for (let b = 0; b < H; b++) quad(P(W, b, a), P(W, b, a + 1), P(W, b + 1, a + 1), P(W, b + 1, a), fill);
  for (let a = 0; a < W; a++) for (let b = 0; b < H; b++) quad(P(a, b, D), P(a + 1, b, D), P(a + 1, b + 1, D), P(a, b + 1, D), fill);

  function outline(pts) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath(); ctx.strokeStyle = edgeColor; ctx.lineWidth = 2.2; ctx.stroke();
  }
  outline([P(0, H, 0), P(W, H, 0), P(W, H, D), P(0, H, D)]);
  outline([P(W, 0, 0), P(W, 0, D), P(W, H, D), P(W, H, 0)]);
  outline([P(0, 0, D), P(W, 0, D), P(W, H, D), P(0, H, D)]);

  highlightCells.forEach(hc => {
    const { t, h, color = "#e3b341", label = "" } = hc;
    quad(P(t, h, D), P(t + 1, h, D), P(t + 1, h + 1, D), P(t, h + 1, D), color, "#fff", 2);
    if (label) {
      const mid = P(t + 0.5, h + 0.5, D);
      ctx.fillStyle = "#04101f"; ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
      ctx.fillText(label, mid[0], mid[1] + 4);
    }
  });

  function dashedLine(p0, p1) {
    ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(139,148,158,0.55)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); ctx.restore();
  }
  function arrowLine(p0, p1, color) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
    [[p0, p1], [p1, p0]].forEach(([tip, from]) => {
      const ang = Math.atan2(tip[1] - from[1], tip[0] - from[0]);
      ctx.beginPath(); ctx.moveTo(tip[0], tip[1]);
      ctx.lineTo(tip[0] - 10 * Math.cos(ang - 0.4), tip[1] - 10 * Math.sin(ang - 0.4));
      ctx.lineTo(tip[0] - 10 * Math.cos(ang + 0.4), tip[1] - 10 * Math.sin(ang + 0.4));
      ctx.closePath(); ctx.fill();
    });
  }

  if (seqLabel) {
    const a0 = P(0, 0, D), a1 = P(W, 0, D), off = 64;
    const e0 = [a0[0], a0[1] + off], e1 = [a1[0], a1[1] + off];
    dashedLine(a0, e0); dashedLine(a1, e1); arrowLine(e0, e1, edgeColor);
    ctx.fillStyle = labelColor; ctx.font = "16px monospace"; ctx.textAlign = "center";
    ctx.fillText(seqLabel, (e0[0] + e1[0]) / 2, (e0[1] + e1[1]) / 2 + 24);
    if (seqSubLabel) ctx.fillText(seqSubLabel, (e0[0] + e1[0]) / 2, (e0[1] + e1[1]) / 2 + 44);
  }

  if (heightLabel) {
    const a0 = P(0, 0, D), a1 = P(0, H, D), off = 76;
    const e0 = [a0[0] - off, a0[1]], e1 = [a1[0] - off, a1[1]];
    dashedLine(a0, e0); dashedLine(a1, e1); arrowLine(e0, e1, edgeColor);
    ctx.save(); ctx.translate(e0[0] - 20, (e0[1] + e1[1]) / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = labelColor; ctx.font = "16px monospace"; ctx.textAlign = "center";
    ctx.fillText(heightLabel, 0, 0); ctx.restore();
  }

  if (depthLabel) {
    const a0 = P(W, 0, 0), a1 = P(W, 0, D), off = 56;
    const dx = 1, dy = 0.6, norm = Math.sqrt(dx * dx + dy * dy);
    const e0 = [a0[0] + off * dx / norm, a0[1] + off * dy / norm], e1 = [a1[0] + off * dx / norm, a1[1] + off * dy / norm];
    dashedLine(a0, e0); dashedLine(a1, e1); arrowLine(e0, e1, edgeColor);
    ctx.fillStyle = labelColor; ctx.font = "16px monospace"; ctx.textAlign = "left";
    ctx.fillText(depthLabel, Math.max(e0[0], e1[0]) + 14, (e0[1] + e1[1]) / 2 + 5);
  }

  if (title) { ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.textAlign = "left"; ctx.fillText(title, 14, 30); }
}
