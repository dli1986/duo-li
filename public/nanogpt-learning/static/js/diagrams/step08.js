function drawStep8(ctx, canvasWidth, canvasHeight) {
  ctx.strokeStyle = "#58a6ff"; ctx.lineWidth = 3; ctx.fillStyle = "#e6edf3"; ctx.font = "17px monospace"; ctx.textAlign = "center";
  ctx.beginPath(); ctx.moveTo(50, 240); ctx.lineTo(1050, 240); ctx.stroke();
  function box(x, label, color) {
    ctx.fillStyle = "#1c2333"; ctx.fillRect(x, 205, 140, 70); ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.strokeRect(x, 205, 140, 70);
    ctx.fillStyle = color; ctx.font = "17px monospace"; ctx.fillText(label, x + 70, 246);
  }
  box(110, "ln1", "#58a6ff"); box(310, "attn", "#f0883e");
  ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 3; ctx.fillStyle = "#3fb950"; ctx.beginPath(); ctx.arc(500, 240, 22, 0, Math.PI * 2); ctx.stroke(); ctx.font = "22px monospace"; ctx.fillText("+", 500, 248);
  box(600, "ln2", "#58a6ff"); box(800, "ffwd", "#bc8cff");
  ctx.strokeStyle = "#3fb950"; ctx.fillStyle = "#3fb950"; ctx.beginPath(); ctx.arc(985, 240, 22, 0, Math.PI * 2); ctx.stroke(); ctx.font = "22px monospace"; ctx.fillText("+", 985, 248);
  ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(50, 240); ctx.quadraticCurveTo(280, 90, 500, 220); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(524, 240); ctx.quadraticCurveTo(750, 90, 985, 220); ctx.stroke();
  ctx.fillStyle = "#3fb950"; ctx.font = "15px monospace";
  ctx.fillText("residual: x unchanged", 280, 75); ctx.fillText("residual again", 750, 75);
  ctx.fillStyle = "#8b949e"; ctx.font = "15px monospace"; ctx.fillText("(B,T,64)", 180, 300); ctx.fillText("(B,T,64)", 870, 300);
  ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.textAlign = "left"; ctx.fillText("x in", 16, 330); ctx.textAlign = "right"; ctx.fillText("x out", canvasWidth - 16, 330);

  ctx.fillStyle = "#e6edf3"; ctx.font = "16px monospace"; ctx.textAlign = "center";
  ctx.fillText('"\u4fef\u89c6" (top-down): ln2 + ffwd \u2014 every (b,t) cell fully isolated', canvasWidth / 2, 365);
  const cols = 4, rows = 2, cellW = 100, cellH = 60, gap = 24;
  const gridW = cols * cellW + (cols - 1) * gap, startX = (canvasWidth - gridW) / 2, startY = 395;
  for (let b = 0; b < rows; b++) {
    for (let t = 0; t < cols; t++) {
      const x = startX + t * (cellW + gap), y = startY + b * (cellH + gap);
      ctx.fillStyle = "#1c2333"; ctx.fillRect(x, y, cellW, cellH);
      ctx.strokeStyle = "#bc8cff"; ctx.lineWidth = 2; ctx.strokeRect(x, y, cellW, cellH);
      ctx.fillStyle = "#bc8cff"; ctx.font = "13px monospace"; ctx.textAlign = "center";
      ctx.fillText(`b${b},t${t}`, x + cellW / 2, y + 24);
      ctx.fillStyle = "#8b949e"; ctx.font = "10px monospace";
      ctx.fillText("64\u2192256\u219264", x + cellW / 2, y + 42);
    }
  }
  ctx.fillStyle = "#8b949e"; ctx.font = "13px monospace"; ctx.textAlign = "left";
  ctx.fillText("unlike step 6 (attention): NO lines connect any of these boxes \u2014 there is nothing to draw. Every cell\u2019s", 20, startY + rows * (cellH + gap) + 22);
  ctx.fillText("output depends ONLY on its own input. Batch was always isolated; position is now isolated too.", 20, startY + rows * (cellH + gap) + 42);
}
