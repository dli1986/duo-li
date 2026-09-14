function drawStep7(ctx, canvasWidth, canvasHeight) {
  const head0 = [[1.00, 0, 0, 0, 0], [0.47, 0.53, 0, 0, 0], [0.33, 0.35, 0.32, 0, 0], [0.24, 0.20, 0.25, 0.32, 0], [0.23, 0.27, 0.13, 0.16, 0.21]];
  const head1 = [[1.00, 0, 0, 0, 0], [0.52, 0.48, 0, 0, 0], [0.30, 0.35, 0.35, 0, 0], [0.28, 0.25, 0.25, 0.22, 0], [0.09, 0.30, 0.14, 0.23, 0.25]];
  renderTensorBox(ctx, canvasWidth, canvasHeight, {
    W: 5, H: 3, D: 8, scale: 44, originX: 600, originY: 250,
    heatFn: (c, d) => {
      if (d < 4) { const v = head0[c][Math.min(d, c)]; if (d > c) return null; return `rgba(88,166,255,${0.35 + v * 0.65})`; }
      const dd = d - 4; const v = head1[c][Math.min(dd, c)]; if (dd > c) return null; return `rgba(240,136,63,${0.35 + v * 0.65})`;
    },
    title: "concat: Head0 (blue, depth 0-3) + Head1 (orange, depth 4-7)",
    seqLabel: "Sequence Length (T)", seqSubLabel: "",
    heightLabel: "Batch Size (B)", depthLabel: "concat(head0,head1)=8",
  });
}
