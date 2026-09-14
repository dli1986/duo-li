// Ported from gpt-pipeline.html's drawStep2(). NOTE: this covers the static
// diagram only (using the default currentIxOffsets = [0,9,17]) - the
// interactive "resample ix" button and the separate animated coverage-demo
// widget (drawCoverage/covStepOnce/covReset/covTogglePlay) are NOT yet
// ported; they need template/CSS additions for buttons and a second canvas,
// tracked as a separate follow-up rather than silently dropped.
function drawStep2(ctx, canvasWidth, canvasHeight) {
  const currentIxOffsets = [0, 9, 17]; // real, verified substrings: "First ", "izen:\n", "fore w"
  const blockSize = 6, batchShown = 3;
  const realIds = [18, 47, 56, 57, 58, 1, 15, 47, 58, 47, 64, 43, 52, 10, 0, 14, 43, 44, 53, 56, 43, 1, 61, 43];
  const rawLen = realIds.length;
  const ixOffsets = currentIxOffsets;
  const rowColors = ["#e3b341", "#3fb950", "#bc8cff"];

  ctx.fillStyle = "#e6edf3"; ctx.font = "19px monospace"; ctx.textAlign = "left";
  ctx.fillText(`get_batch(): ix = torch.randint(len(data)-block_size, (batch_size,))  \u2014 showing ${batchShown} of real 16`, 16, 30);

  const tickW = (canvasWidth - 32) / rawLen;
  const rawY = 66;
  ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.textAlign = "left";
  ctx.fillText('real data[0..24] = "First Citizen:\\nBefore we" (zoomed in; full stream is 1,115,394 long)', 16, rawY - 10);
  for (let i = 0; i < rawLen; i++) {
    const x = 16 + i * tickW;
    const covering = ixOffsets.findIndex(off => i >= off && i < off + blockSize);
    ctx.fillStyle = covering >= 0 ? rowColors[covering] : "#1c2333";
    ctx.fillRect(x, rawY, Math.max(1, tickW - 2), 26);
  }
  ctx.strokeStyle = "#30363d"; ctx.strokeRect(16, rawY, canvasWidth - 32, 26);

  ixOffsets.forEach((off, li) => {
    const xL = 16 + off * tickW, xR = 16 + (off + blockSize) * tickW;
    const y = rawY + 26 + 8;
    ctx.strokeStyle = rowColors[li]; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(xL, y); ctx.lineTo(xL, y + 8); ctx.lineTo(xR, y + 8); ctx.lineTo(xR, y); ctx.stroke();
    ctx.fillStyle = rowColors[li]; ctx.font = "13px monospace"; ctx.textAlign = "center";
    ctx.fillText(`ix[${li}]=${off} \u2192 covers block_size=${blockSize} tokens [${off}..${off + blockSize - 1}]`, (xL + xR) / 2, y + 24);
  });

  const W = blockSize, H = batchShown, D = 1, scale = 58, originX = 650, originY = 434;
  function P(x, y, z) { const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6); return [originX + (x - z) * c * scale, originY + ((x + z) * s - y) * scale]; }

  ixOffsets.forEach((off, li) => {
    const midX = 16 + (off + blockSize / 2) * tickW;
    const startY = rawY + 26 + 40;
    const c0 = P(0, li, D), c1 = P(1, li, D), c2 = P(0, li + 1, D), c3 = P(1, li + 1, D);
    const targetX = (c0[0] + c1[0] + c2[0] + c3[0]) / 4, targetY = (c0[1] + c1[1] + c2[1] + c3[1]) / 4;
    ctx.strokeStyle = rowColors[li]; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(midX, startY); ctx.lineTo(targetX, targetY - 4); ctx.stroke();
    const ang = Math.atan2(targetY - startY, targetX - midX);
    ctx.beginPath(); ctx.moveTo(targetX, targetY - 4);
    ctx.lineTo(targetX - 11 * Math.cos(ang - 0.4), targetY - 4 - 11 * Math.sin(ang - 0.4));
    ctx.lineTo(targetX - 11 * Math.cos(ang + 0.4), targetY - 4 - 11 * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fillStyle = rowColors[li]; ctx.fill();
  });

  const grid = ixOffsets.map(off => realIds.slice(off, off + blockSize));
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W, H, D, scale, originX, originY,
    seqLabel: "Sequence Length (T)", seqSubLabel: "(= block_size = 6)",
    heightLabel: "Batch Size (B)", depthLabel: "",
    title: "",
  });
  for (let li = 0; li < batchShown; li++) {
    for (let t = 0; t < blockSize; t++) {
      const c0 = P(t, li, D), c1 = P(t + 1, li, D), c2 = P(t, li + 1, D), c3 = P(t + 1, li + 1, D);
      const cx = (c0[0] + c1[0] + c2[0] + c3[0]) / 4, cy = (c0[1] + c1[1] + c2[1] + c3[1]) / 4;
      ctx.fillStyle = t === 0 ? "#04101f" : "#1d4ed8"; ctx.font = t === 0 ? "bold 14px monospace" : "13px monospace"; ctx.textAlign = "center";
      if (t === 0) { ctx.fillStyle = rowColors[li]; ctx.beginPath(); ctx.arc(cx, cy, 17, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#04101f"; }
      ctx.fillText(String(grid[li][t]), cx, cy + 5);
    }
  }

  ctx.fillStyle = "#8b949e"; ctx.font = "15px monospace"; ctx.textAlign = "left";
  ctx.fillText(`Each ix samples exactly block_size=${blockSize} tokens. With ${batchShown} shown in parallel: ${batchShown}\u00d7${blockSize}=${batchShown * blockSize} tokens this call (real: 16\u00d732=512).`, 16, canvasHeight - 16);
}
