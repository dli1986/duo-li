// canvas2svg.js — a Canvas 2D-compatible shim that draws to an <svg> element
// instead of a raster bitmap. Implements exactly the subset of the Canvas 2D
// API actually used by gpt-pipeline.html's diagram code (grep-verified), so
// those existing, already-correct draw functions can run against this with
// only mechanical changes (accept a ctx directly instead of a canvas id),
// and produce crisp vector output instead of a fixed-resolution bitmap.
//
// Design: maintains a 2D affine transform matrix [a,b,c,d,e,f] updated by
// translate()/rotate(), applied via an SVG `transform="matrix(...)"`
// attribute on each element created while that transform is active (mirrors
// how canvas save/restore + translate/rotate composes).

const SVG_NS = "http://www.w3.org/2000/svg";

class SVGCanvasContext {
  constructor(svgEl) {
    this.svg = svgEl;
    this.fillStyle = "#000";
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.font = "10px sans-serif";
    this.textAlign = "start";
    this._dash = [];
    this._matrix = [1, 0, 0, 1, 0, 0]; // identity
    this._stack = [];
    this._path = []; // array of ['M'|'L'|'Q'|'Z', ...coords already in local space]
    this._gradCount = 0;
  }

  // ---- transform helpers ----
  _apply(x, y) {
    const [a, b, c, d, e, f] = this._matrix;
    return [a * x + c * y + e, b * x + d * y + f];
  }
  _matMul(m1, m2) {
    const [a1, b1, c1, d1, e1, f1] = m1;
    const [a2, b2, c2, d2, e2, f2] = m2;
    return [
      a1 * a2 + c1 * b2, b1 * a2 + d1 * b2,
      a1 * c2 + c1 * d2, b1 * c2 + d1 * d2,
      a1 * e2 + c1 * f2 + e1, b1 * e2 + d1 * f2 + f1,
    ];
  }
  translate(x, y) { this._matrix = this._matMul(this._matrix, [1, 0, 0, 1, x, y]); }
  rotate(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    this._matrix = this._matMul(this._matrix, [c, s, -s, c, 0, 0]);
  }
  save() { this._stack.push({ m: this._matrix.slice(), fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth, font: this.font, textAlign: this.textAlign, dash: this._dash.slice() }); }
  restore() {
    const s = this._stack.pop();
    if (!s) return;
    this._matrix = s.m; this.fillStyle = s.fillStyle; this.strokeStyle = s.strokeStyle;
    this.lineWidth = s.lineWidth; this.font = s.font; this.textAlign = s.textAlign; this._dash = s.dash;
  }

  // ---- no-op / trivial ----
  clearRect() {
    // Real clear, needed for interactive steps that redraw on demand (e.g.
    // Step 2's "resample ix" button and coverage-demo animation) - matches
    // canvas semantics where clearRect wipes prior drawing before a redraw.
    // Preserve <defs> (gradients) since callers don't recreate those per-draw.
    const defs = this.svg.querySelector("defs");
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);
    if (defs) this.svg.appendChild(defs);
  }
  setLineDash(arr) { this._dash = arr; }

  // ---- font parsing: "[bold] <size>px <family>" ----
  _fontParts() {
    const m = /^(?:(bold)\s+)?([\d.]+)px\s+(.+)$/.exec(this.font);
    if (!m) return { bold: false, size: 13, family: "monospace" };
    return { bold: !!m[1], size: parseFloat(m[2]), family: m[3] };
  }
  _anchor() {
    return this.textAlign === "center" ? "middle" : this.textAlign === "right" ? "end" : "start";
  }

  _setTransformAttr(el) {
    const [a, b, c, d, e, f] = this._matrix;
    if (a === 1 && b === 0 && c === 0 && d === 1 && e === 0 && f === 0) return;
    el.setAttribute("transform", `matrix(${a},${b},${c},${d},${e},${f})`);
  }

  fillRect(x, y, w, h) {
    const el = document.createElementNS(SVG_NS, "rect");
    el.setAttribute("x", x); el.setAttribute("y", y);
    el.setAttribute("width", w); el.setAttribute("height", h);
    el.setAttribute("fill", this.fillStyle);
    this._setTransformAttr(el);
    this.svg.appendChild(el);
  }
  strokeRect(x, y, w, h) {
    const el = document.createElementNS(SVG_NS, "rect");
    el.setAttribute("x", x); el.setAttribute("y", y);
    el.setAttribute("width", w); el.setAttribute("height", h);
    el.setAttribute("fill", "none");
    el.setAttribute("stroke", this.strokeStyle);
    el.setAttribute("stroke-width", this.lineWidth);
    if (this._dash.length) el.setAttribute("stroke-dasharray", this._dash.join(","));
    this._setTransformAttr(el);
    this.svg.appendChild(el);
  }

  fillText(text, x, y) {
    const { bold, size, family } = this._fontParts();
    const el = document.createElementNS(SVG_NS, "text");
    el.setAttribute("x", x); el.setAttribute("y", y);
    el.setAttribute("fill", this.fillStyle);
    el.setAttribute("font-size", size);
    el.setAttribute("font-family", family);
    if (bold) el.setAttribute("font-weight", "bold");
    el.setAttribute("text-anchor", this._anchor());
    this._setTransformAttr(el);
    el.textContent = text;
    this.svg.appendChild(el);
  }

  beginPath() { this._path = []; }
  moveTo(x, y) { this._path.push(["M", x, y]); }
  lineTo(x, y) { this._path.push(["L", x, y]); }
  quadraticCurveTo(cpx, cpy, x, y) { this._path.push(["Q", cpx, cpy, x, y]); }
  closePath() { this._path.push(["Z"]); }
  arc(x, y, r, startAngle, endAngle) {
    // Only full circles (0..2π) and the two partial arcs in this codebase are used;
    // handle both via an SVG path arc command.
    const full = Math.abs(endAngle - startAngle) >= Math.PI * 2 - 1e-6;
    if (full) {
      this._path.push(["M", x + r, y]);
      this._path.push(["A", r, r, 0, 1, 1, x - r, y]);
      this._path.push(["A", r, r, 0, 1, 1, x + r, y]);
    } else {
      const sx = x + r * Math.cos(startAngle), sy = y + r * Math.sin(startAngle);
      const ex = x + r * Math.cos(endAngle), ey = y + r * Math.sin(endAngle);
      const large = (endAngle - startAngle) % (Math.PI * 2) > Math.PI ? 1 : 0;
      this._path.push(["M", sx, sy]);
      this._path.push(["A", r, r, 0, large, 1, ex, ey]);
    }
  }
  _pathData() {
    return this._path.map(seg => {
      const [cmd, ...rest] = seg;
      return cmd + rest.join(",");
    }).join(" ");
  }
  fill() {
    const el = document.createElementNS(SVG_NS, "path");
    el.setAttribute("d", this._pathData());
    el.setAttribute("fill", this.fillStyle);
    this._setTransformAttr(el);
    this.svg.appendChild(el);
  }
  stroke() {
    const el = document.createElementNS(SVG_NS, "path");
    el.setAttribute("d", this._pathData());
    el.setAttribute("fill", "none");
    el.setAttribute("stroke", this.strokeStyle);
    el.setAttribute("stroke-width", this.lineWidth);
    if (this._dash.length) el.setAttribute("stroke-dasharray", this._dash.join(","));
    this._setTransformAttr(el);
    this.svg.appendChild(el);
  }

  createLinearGradient(x0, y0, x1, y1) {
    this._gradCount += 1;
    const id = `svgcanvas-grad-${this._gradCount}-${Math.random().toString(36).slice(2, 8)}`;
    let defs = this.svg.querySelector("defs");
    if (!defs) { defs = document.createElementNS(SVG_NS, "defs"); this.svg.insertBefore(defs, this.svg.firstChild); }
    const grad = document.createElementNS(SVG_NS, "linearGradient");
    grad.setAttribute("id", id);
    grad.setAttribute("x1", x0); grad.setAttribute("y1", y0);
    grad.setAttribute("x2", x1); grad.setAttribute("y2", y1);
    grad.setAttribute("gradientUnits", "userSpaceOnUse");
    defs.appendChild(grad);
    return {
      addColorStop(offset, color) {
        const stop = document.createElementNS(SVG_NS, "stop");
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color", color);
        grad.appendChild(stop);
      },
      toString() { return `url(#${id})`; },
    };
  }
}

// fillStyle/strokeStyle accept gradient objects (from createLinearGradient) too -
// override the setters is unnecessary since we just String()-coerce on use via
// template literals above... but attribute values need the string form directly,
// so wrap assignment sites: when fillStyle/strokeStyle is set to a gradient object,
// convert immediately to its url(#...) string.
["fillStyle", "strokeStyle"].forEach(prop => {
  const backing = Symbol(prop);
  Object.defineProperty(SVGCanvasContext.prototype, prop, {
    get() { return this[backing]; },
    set(v) { this[backing] = (v && typeof v === "object" && typeof v.toString === "function") ? v.toString() : v; },
  });
});
