// shared-data.js — ported constants/helpers used by multiple stepNN.js files:
// the real token grid, the fixed-seed illustrative embedding tables, and two
// small drawing helpers (a flat 2D lookup-table sketch, and a precise
// front-face-cell-center calculator matching renderTensorBox's own math).
// All values/logic unchanged from gpt-pipeline.html.

const VOCAB = "\n !$&',-.3:;?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function dispChar(c) { if (c === "\n") return "\\n"; if (c === " ") return "\u2423"; return c; }

// "First Citizen:\nBef" — real slice of the dataset, 3 rows (B) x 6 cols (T)
const TOKEN_GRID = [
  [18, 47, 56, 57, 58, 1],
  [15, 47, 58, 47, 64, 43],
  [52, 10, 0, 14, 43, 44],
];

// fixed-seed illustrative weight tables — NOT the notebook's trained weights
// (never printed), deterministic so the page is stable across reloads.
const EMB_W = (() => { const r = seededRng(12345); const M = []; for (let i = 0; i < 65; i++) { const row = []; for (let j = 0; j < 64; j++) row.push(r() * 2 - 1); M.push(row); } return M; })();
const LM_W = (() => { const r = seededRng(98765); const M = []; for (let i = 0; i < 65; i++) { const row = []; for (let j = 0; j < 64; j++) row.push(r() * 2 - 1); M.push(row); } return M; })();
const POS_W = (() => { const r = seededRng(55555); const M = []; for (let i = 0; i < 32; i++) { const row = []; for (let j = 0; j < 64; j++) row.push(r() * 2 - 1); M.push(row); } return M; })();

// Small flat (non-isometric) 2D lookup-table sketch
function drawMiniLookupTable(ctx, x0, y0, rows, cols, cellW, cellH, highlightRows, seed) {
  const r = seededRng(seed);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const hit = highlightRows.includes(i);
      ctx.fillStyle = hit ? "#3fb950" : `rgba(88,166,255,${0.12 + r() * 0.5})`;
      ctx.fillRect(x0 + j * cellW, y0 + i * cellH, cellW - 1, cellH - 1);
    }
  }
  ctx.strokeStyle = "#58a6ff"; ctx.lineWidth = 1.4; ctx.strokeRect(x0 - 1, y0 - 1, cols * cellW + 2, rows * cellH + 2);
}

// Shared: precisely compute a front-face cell's screen center for a given box config
// (same isoProject math renderTensorBox itself uses — so any marker/arrow drawn from
// this function is GUARANTEED to land exactly where that cell actually renders).
function frontCellCenter(t, h, D, scale, ox, oy) {
  const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6);
  const pt = (x, y, z) => [ox + (x - z) * c * scale, oy + ((x + z) * s - y) * scale];
  const pts = [pt(t, h, D), pt(t + 1, h, D), pt(t + 1, h + 1, D), pt(t, h + 1, D)];
  return [pts.reduce((s, p) => s + p[0], 0) / 4, pts.reduce((s, p) => s + p[1], 0) / 4];
}
