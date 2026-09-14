function drawStep9(ctx, canvasWidth, canvasHeight) {
  ctx.textAlign = "center";
  for (let i = 0; i < 4; i++) {
    const x = 70 + i * 250;
    ctx.fillStyle = "#1c2333"; ctx.fillRect(x, 120, 190, 120); ctx.strokeStyle = "#58a6ff"; ctx.lineWidth = 2.4; ctx.strokeRect(x, 120, 190, 120);
    ctx.fillStyle = "#58a6ff"; ctx.font = "19px monospace"; ctx.fillText(`Block ${i}`, x + 95, 172);
    ctx.fillStyle = "#e3b341"; ctx.font = "14px monospace"; ctx.fillText(`= layer ${i}`, x + 95, 192);
    ctx.fillStyle = "#8b949e"; ctx.font = "14px monospace"; ctx.fillText("(B,T,64)", x + 95, 216);
    if (i < 3) {
      const ax0 = x + 190, ax1 = x + 250, ay = 180;
      ctx.strokeStyle = "#3fb950"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1 - 12, ay); ctx.stroke();
      ctx.fillStyle = "#3fb950";
      ctx.beginPath(); ctx.moveTo(ax1, ay); ctx.lineTo(ax1 - 14, ay - 9); ctx.lineTo(ax1 - 14, ay + 9); ctx.closePath(); ctx.fill();
      ctx.font = "11px monospace"; ctx.fillText("x", (ax0 + ax1) / 2, ay - 10);
    }
  }
  ctx.fillStyle = "#e6edf3"; ctx.font = "18px monospace"; ctx.fillText('same shape enters and exits every Block \u2014 "n_layer" IS the count of these Block instances', canvasWidth / 2, 70);
  ctx.fillStyle = "#8b949e"; ctx.font = "13.5px monospace"; ctx.fillText("each arrow: one Block\u2019s full output x becomes the next Block\u2019s full input x, unchanged shape", canvasWidth / 2, 95);
  // Corrected from the stale "(defined - but bypassed...)" claim: blocks are
  // confirmed active in the current notebook (see step 9's page text/aside
  // for the full fixed-bug history) - not reproducing that stale claim here.
  ctx.fillStyle = "#3fb950"; ctx.font = "15px monospace";
  ctx.fillText("(now confirmed active in this notebook\u2019s executed forward() \u2014 previously bypassed by an accidental comment, since fixed)", canvasWidth / 2, 300);
}
