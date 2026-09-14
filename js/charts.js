(function () {
  const DL = (window.DL = window.DL || {});
  const PALETTE = ['#8b5cf6', '#ec4899', '#3b9eff', '#46d369', '#f5c518', '#ff5f3d', '#22d3ee', '#a3e635', '#fb7185', '#c084fc'];

  function esc(s) {
    return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
  }
  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '';
    const a = Math.abs(n);
    if (a >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (a >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (a >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Number.isInteger(n) ? String(n) : n.toFixed(2);
  }

  const W = 720;
  const H = 380;
  const PAD = { t: 26, r: 24, b: 60, l: 62 };

  function frame(inner, title) {
    return (
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" class="dl-svg" role="img">' +
      (title ? '<text x="' + W / 2 + '" y="17" class="dl-svg-title">' + esc(title) + '</text>' : '') +
      inner +
      '</svg>'
    );
  }

  function axes(max, min, labels, plotW, plotH) {
    let g = '';
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const y = PAD.t + plotH - (plotH * i) / ticks;
      const val = min + ((max - min) * i) / ticks;
      g += '<line x1="' + PAD.l + '" y1="' + y + '" x2="' + (PAD.l + plotW) + '" y2="' + y + '" class="dl-grid"/>';
      g += '<text x="' + (PAD.l - 8) + '" y="' + (y + 4) + '" class="dl-axis" text-anchor="end">' + esc(fmt(val)) + '</text>';
    }
    g += '<line x1="' + PAD.l + '" y1="' + (PAD.t + plotH) + '" x2="' + (PAD.l + plotW) + '" y2="' + (PAD.t + plotH) + '" class="dl-axis-line"/>';
    g += '<line x1="' + PAD.l + '" y1="' + PAD.t + '" x2="' + PAD.l + '" y2="' + (PAD.t + plotH) + '" class="dl-axis-line"/>';
    const n = labels.length;
    const step = n > 0 ? plotW / n : plotW;
    const showEvery = Math.ceil(n / 12);
    labels.forEach((lb, i) => {
      if (i % showEvery !== 0 && i !== n - 1) return;
      const x = PAD.l + step * i + step / 2;
      const t = String(lb).length > 12 ? String(lb).slice(0, 11) + '…' : lb;
      g += '<text x="' + x + '" y="' + (PAD.t + plotH + 20) + '" class="dl-axis" text-anchor="middle" transform="rotate(-30 ' + x + ' ' + (PAD.t + plotH + 20) + ')">' + esc(t) + '</text>';
    });
    return g;
  }

  function bar(labels, values, title, color) {
    const maxV = Math.max(0, ...values);
    const minV = Math.min(0, ...values);
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const n = values.length || 1;
    const step = plotW / n;
    const bw = Math.max(2, Math.min(46, step * 0.68));
    const zeroY = PAD.t + plotH - (plotH * (0 - minV)) / (maxV - minV || 1);
    let bars = '';
    values.forEach((v, i) => {
      const x = PAD.l + step * i + step / 2 - bw / 2;
      const y = PAD.t + plotH - (plotH * (v - minV)) / (maxV - minV || 1);
      const top = Math.min(y, zeroY);
      const h = Math.max(1, Math.abs(zeroY - y));
      const c = color && color.palette ? PALETTE[i % PALETTE.length] : color || PALETTE[0];
      bars +=
        '<rect x="' + x + '" y="' + top + '" width="' + bw + '" height="' + h + '" rx="3" fill="' + c + '" class="dl-bar">' +
        '<title>' + esc(labels[i]) + ': ' + esc(fmt(v)) + '</title></rect>';
    });
    return frame(axes(maxV, minV, labels, plotW, plotH) + bars, title);
  }

  function hbar(labels, values, title) {
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const rowH = plotH / (values.length || 1);
    const maxV = Math.max(0, ...values.map((v) => Math.abs(v)));
    let g = '';
    values.forEach((v, i) => {
      const y = PAD.t + rowH * i + rowH * 0.15;
      const h = rowH * 0.7;
      const w = (plotW * v) / (maxV || 1);
      const lb = String(labels[i]).length > 18 ? String(labels[i]).slice(0, 17) + '…' : labels[i];
      g += '<text x="' + (PAD.l - 8) + '" y="' + (y + h / 2 + 4) + '" class="dl-axis" text-anchor="end">' + esc(lb) + '</text>';
      g += '<rect x="' + PAD.l + '" y="' + y + '" width="' + Math.max(1, w) + '" height="' + h + '" rx="4" fill="' + PALETTE[i % PALETTE.length] + '" class="dl-bar"><title>' + esc(labels[i]) + ': ' + esc(fmt(v)) + '</title></rect>';
      g += '<text x="' + (PAD.l + Math.max(1, w) + 6) + '" y="' + (y + h / 2 + 4) + '" class="dl-axis">' + esc(fmt(v)) + '</text>';
    });
    return frame('<line x1="' + PAD.l + '" y1="' + PAD.t + '" x2="' + PAD.l + '" y2="' + (PAD.t + plotH) + '" class="dl-axis-line"/>' + g, title);
  }

  function line(labels, values, title, area) {
    const maxV = Math.max(0, ...values);
    const minV = Math.min(0, ...values);
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const n = values.length;
    const step = n > 1 ? plotW / (n - 1) : plotW;
    const pts = values.map((v, i) => [PAD.l + step * i, PAD.t + plotH - (plotH * (v - minV)) / (maxV - minV || 1)]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    let g = '';
    if (area && pts.length) {
      g += '<path d="' + d + ' L' + pts[pts.length - 1][0] + ' ' + (PAD.t + plotH) + ' L' + pts[0][0] + ' ' + (PAD.t + plotH) + ' Z" fill="url(#dlArea)" class="dl-area"/>';
    }
    g += '<path d="' + d + '" fill="none" stroke="' + PALETTE[0] + '" stroke-width="2.5" stroke-linejoin="round" class="dl-line"/>';
    pts.forEach((p, i) => {
      g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.4" fill="#0d1117" stroke="' + PALETTE[0] + '" stroke-width="2" class="dl-dot"><title>' + esc(labels[i]) + ': ' + esc(fmt(values[i])) + '</title></circle>';
    });
    const defs = '<defs><linearGradient id="dlArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + PALETTE[0] + '" stop-opacity="0.35"/><stop offset="100%" stop-color="' + PALETTE[0] + '" stop-opacity="0"/></linearGradient></defs>';
    return frame(defs + axes(maxV, minV, labels, plotW, plotH) + g, title);
  }

  function pie(labels, values, title, donut) {
    const cx = W / 2;
    const cy = H / 2 + 6;
    const r = 130;
    const total = values.reduce((a, b) => a + Math.abs(b), 0) || 1;
    let angle = -Math.PI / 2;
    let g = '';
    values.forEach((v, i) => {
      const slice = (Math.abs(v) / total) * Math.PI * 2;
      const a0 = angle;
      const a1 = angle + slice;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const large = slice > Math.PI ? 1 : 0;
      g += '<path d="M' + cx + ' ' + cy + ' L' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="' + PALETTE[i % PALETTE.length] + '" class="dl-slice"><title>' + esc(labels[i]) + ': ' + esc(fmt(v)) + ' (' + ((Math.abs(v) / total) * 100).toFixed(1) + '%)</title></path>';
      angle = a1;
    });
    if (donut) g += '<circle cx="' + cx + '" cy="' + cy + '" r="70" fill="var(--bg2)"/>';
    const legend = labels
      .slice(0, 12)
      .map((lb, i) => '<rect x="14" y="' + (18 + i * 20) + '" width="11" height="11" rx="2" fill="' + PALETTE[i % PALETTE.length] + '"/><text x="30" y="' + (27 + i * 20) + '" class="dl-axis">' + esc(String(lb).slice(0, 16)) + '</text>')
      .join('');
    return frame(g + legend, title);
  }

  function histogram(values, bins, title) {
    if (!values.length) return frame('', title);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const count = bins || Math.max(5, Math.min(20, Math.round(Math.sqrt(values.length))));
    const width = (max - min) / count || 1;
    const labels = [];
    const counts = new Array(count).fill(0);
    values.forEach((v) => {
      let i = Math.floor((v - min) / width);
      if (i >= count) i = count - 1;
      if (i < 0) i = 0;
      counts[i]++;
    });
    for (let i = 0; i < count; i++) labels.push(fmt(min + width * i) + '–' + fmt(min + width * (i + 1)));
    return bar(labels, counts, title || 'Distribution', { palette: true });
  }

  function scatter(xs, ys, title) {
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const maxX = Math.max(...xs);
    const minX = Math.min(...xs);
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);
    let g = '';
    const sx = (x) => PAD.l + (plotW * (x - minX)) / (maxX - minX || 1);
    const sy = (y) => PAD.t + plotH - (plotH * (y - minY)) / (maxY - minY || 1);
    for (let i = 0; i <= 5; i++) {
      const y = PAD.t + (plotH * i) / 5;
      g += '<line x1="' + PAD.l + '" y1="' + y + '" x2="' + (PAD.l + plotW) + '" y2="' + y + '" class="dl-grid"/>';
      g += '<text x="' + (PAD.l - 8) + '" y="' + (y + 4) + '" class="dl-axis" text-anchor="end">' + esc(fmt(maxY - ((maxY - minY) * i) / 5)) + '</text>';
    }
    xs.forEach((x, i) => {
      g += '<circle cx="' + sx(x) + '" cy="' + sy(ys[i]) + '" r="4" fill="' + PALETTE[0] + '" fill-opacity="0.65" class="dl-dot"><title>(' + esc(fmt(x)) + ', ' + esc(fmt(ys[i])) + ')</title></circle>';
    });
    g += '<line x1="' + PAD.l + '" y1="' + (PAD.t + plotH) + '" x2="' + (PAD.l + plotW) + '" y2="' + (PAD.t + plotH) + '" class="dl-axis-line"/>';
    g += '<line x1="' + PAD.l + '" y1="' + PAD.t + '" x2="' + PAD.l + '" y2="' + (PAD.t + plotH) + '" class="dl-axis-line"/>';
    return frame(g, title);
  }

  function render(container, spec) {
    let svg = '';
    const { type, labels, values, xs, ys, title, donut } = spec;
    if (type === 'bar') svg = bar(labels, values, title, spec.color);
    else if (type === 'hbar') svg = hbar(labels, values, title);
    else if (type === 'line') svg = line(labels, values, title, false);
    else if (type === 'area') svg = line(labels, values, title, true);
    else if (type === 'pie') svg = pie(labels, values, title, false);
    else if (type === 'donut') svg = pie(labels, values, title, true);
    else if (type === 'histogram') svg = histogram(values, spec.bins, title);
    else if (type === 'scatter') svg = scatter(xs, ys, title);
    else svg = '<div class="dl-empty">نموداری برای نمایش نیست</div>';
    container.innerHTML = svg;
  }

  function svgString(spec) {
    const tmp = document.createElement('div');
    render(tmp, spec);
    const svg = tmp.querySelector('svg');
    if (!svg) return '';
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent =
      '.dl-svg{background:#15151a}.dl-svg-title{fill:#ececf1;font:700 15px Vazirmatn,sans-serif;text-anchor:middle}' +
      '.dl-grid{stroke:#282833;stroke-width:1}.dl-axis-line{stroke:#3a3a48;stroke-width:1}' +
      '.dl-axis{fill:#8f8f9c;font:11px Vazirmatn,sans-serif}.dl-bar{opacity:.9}.dl-bar:hover{opacity:1}' +
      '.dl-line{stroke-dasharray:none}.dl-dot:hover{r:5.5}';
    svg.insertBefore(style, svg.firstChild);
    return new XMLSerializer().serializeToString(svg);
  }

  DL.Charts = { render, svgString, PALETTE, fmt };
})();