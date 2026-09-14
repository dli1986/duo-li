function drawStep1(ctx, canvasWidth, canvasHeight) {
  const text = "First Citizen:\nBefore we".split("");
  const ids = [18, 47, 56, 57, 58, 1, 15, 47, 58, 47, 64, 43, 52, 10, 0, 14, 43, 44, 53, 56, 43, 1, 61, 43];
  const cw = 44, x0 = 16, y0 = 120;
  for (let i = 0; i < ids.length; i++) {
    const x = x0 + i * cw;
    ctx.fillStyle = "#1c2333"; ctx.fillRect(x, y0, cw - 4, 64); ctx.strokeStyle = "#30363d"; ctx.strokeRect(x, y0, cw - 4, 64);
    ctx.fillStyle = "#58a6ff"; ctx.font = "16px monospace"; ctx.textAlign = "center";
    ctx.fillText(String(ids[i]), x + (cw - 4) / 2, y0 + 30);
    ctx.fillStyle = "#8b949e"; ctx.font = "15px monospace";
    const ch = text[i] === " " ? "\u2423" : (text[i] === "\n" ? "\\n" : text[i]);
    ctx.fillText(ch, x + (cw - 4) / 2, y0 + 54);
  }
  ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.textAlign = "left";
  ctx.fillText('"First Citizen:\\nBefore we..." (showing 24 of 1,115,394 chars)', 16, 46);
  ctx.fillStyle = "#8b949e"; ctx.font = "15px monospace";
  ctx.fillText("encode(text) \u2192 stoi[c] per character", 16, 76);
  ctx.fillText("shape: (N,) = (1115394,) \u2014 one flat 1D list", 16, 250);
}
