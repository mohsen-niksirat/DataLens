(function () {
  const DL = (window.DL = window.DL || {});

  const XLSX_CDN = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';

  function isNumber(v) {
    if (v === null || v === undefined || v === '') return false;
    return !isNaN(Number(String(v).replace(/,/g, '')));
  }

  function scalar(str) {
    let s = str.trim();
    if (s === '' || s === '~' || s === 'null') return null;
    if (s === 'true') return true;
    if (s === 'false') return false;
    if (/^["'].*["']$/.test(s)) return s.slice(1, -1);
    if (s.startsWith('[') && s.endsWith(']')) {
      const inner = s.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(',').map((x) => scalar(x));
    }
    if (s.startsWith('{') && s.endsWith('}')) {
      const obj = {};
      s.slice(1, -1).split(',').forEach((pair) => {
        const i = pair.indexOf(':');
        if (i > -1) obj[pair.slice(0, i).trim().replace(/^["']|["']$/g, '')] = scalar(pair.slice(i + 1));
      });
      return obj;
    }
    if (isNumber(s)) return Number(s.replace(/,/g, ''));
    return s;
  }

  function plainVal(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  }

  function arraySheet(arr, name) {
    name = name || 'data';
    if (!arr.length) return { name, columns: [], rows: [] };
    if (arr.every((v) => v && typeof v === 'object' && !Array.isArray(v))) {
      const cols = [];
      const seen = new Set();
      arr.forEach((o) =>
        Object.keys(o).forEach((k) => {
          if (!seen.has(k)) {
            seen.add(k);
            cols.push(k);
          }
        })
      );
      return { name, columns: cols, rows: arr.map((o) => cols.map((c) => plainVal(o[c]))) };
    }
    if (arr.every((v) => Array.isArray(v))) {
      const maxLen = Math.max(...arr.map((a) => a.length));
      const cols = Array.from({ length: maxLen }, (_, i) => 'col' + (i + 1));
      return {
        name,
        columns: cols,
        rows: arr.map((a) => {
          const r = [];
          for (let i = 0; i < maxLen; i++) r.push(plainVal(a[i]));
          return r;
        })
      };
    }
    return { name, columns: ['value'], rows: arr.map((v) => [plainVal(v)]) };
  }

  function objectToSheets(obj, name) {
    if (Array.isArray(obj)) return [arraySheet(obj, name || 'data')];
    if (obj && typeof obj === 'object') {
      const keys = Object.keys(obj);
      const arrayKeys = keys.filter((k) => Array.isArray(obj[k]) && obj[k].some((v) => v && typeof v === 'object'));
      if (arrayKeys.length) return arrayKeys.map((k) => arraySheet(obj[k], k));
      if (keys.length && keys.every((k) => Array.isArray(obj[k]))) {
        return keys.map((k) => arraySheet(obj[k], k));
      }
      const rows = keys.map((k) => [k, plainVal(obj[k])]);
      return [{ name: name || 'data', columns: ['key', 'value'], rows }];
    }
    return [{ name: name || 'data', columns: ['value'], rows: [[plainVal(obj)]] }];
  }

  function parseYAMLText(text) {
    const lines = text
      .replace(/\r/g, '')
      .split('\n')
      .map((raw) => {
        const stripped = raw.replace(/\s+#.*$/, '');
        return { raw, indent: (raw.match(/^ */) || [''])[0].length, content: stripped };
      })
      .filter((l) => l.content.trim() !== '' && !/^\s*#/.test(l.raw));

    let i = 0;
    function parseBlock(indent) {
      if (i >= lines.length) return null;
      const c = lines[i].content.trim();
      if (c === '-' || c.startsWith('- ')) return parseSeq(indent);
      return parseMap(indent);
    }
    function parseSeq(indent) {
      const arr = [];
      while (i < lines.length && lines[i].indent === indent && lines[i].content.trim().startsWith('-')) {
        const c = lines[i].content.trim();
        if (c === '-') {
          i++;
          arr.push(parseBlock(indent + 2));
        } else {
          const rest = c.slice(1).trim();
          if (rest.includes(':') && !rest.startsWith('[') && !rest.startsWith('{')) {
            lines[i] = { raw: lines[i].raw, indent: indent + 2, content: rest };
            arr.push(parseMap(indent + 2));
          } else {
            arr.push(scalar(rest));
            i++;
          }
        }
      }
      return arr;
    }
    function parseMap(indent) {
      const obj = {};
      while (i < lines.length && lines[i].indent === indent && !lines[i].content.trim().startsWith('-')) {
        const c = lines[i].content;
        const idx = c.indexOf(':');
        if (idx < 0) {
          i++;
          continue;
        }
        const key = c.slice(0, idx).trim().replace(/^["']|["']$/g, '');
        const valStr = c.slice(idx + 1).trim();
        i++;
        if (valStr === '') obj[key] = parseBlock(indent + 2);
        else obj[key] = scalar(valStr);
      }
      return obj;
    }
    const result = parseBlock(0);
    return result;
  }

  function detectDelimiter(text) {
    const line = (text.split(/\r?\n/).find((l) => l.trim() !== '') || '');
    const cand = [',', '\t', ';', '|'];
    let best = ',';
    let bestCount = 0;
    cand.forEach((d) => {
      const n = line.split(d).length;
      if (n > bestCount) {
        bestCount = n;
        best = d;
      }
    });
    return best;
  }

  function parseDelimited(text, delim) {
    const rows = [];
    let row = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            cur += '"';
            i++;
          } else q = false;
        } else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === delim) {
        row.push(cur);
        cur = '';
      } else if (ch === '\n') {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = '';
      } else if (ch !== '\r') cur += ch;
    }
    if (cur !== '' || row.length) {
      row.push(cur);
      rows.push(row);
    }
    return rows.filter((r) => !(r.length === 1 && r[0] === ''));
  }

  function delimitedToSheet(text, delim, name) {
    const raw = parseDelimited(text, delim);
    if (!raw.length) return { name, columns: [], rows: [] };
    const first = raw[0];
    const isHeader =
      first.length > 1 &&
      first.every((c) => c !== '' && !isNumber(c)) &&
      new Set(first).size === first.length;
    const columns = isHeader ? first : first.map((_, i2) => 'col' + (i2 + 1));
    const data = isHeader ? raw.slice(1) : raw;
    const width = columns.length;
    const rows = data.map((r) => {
      const a = r.slice(0, width);
      while (a.length < width) a.push('');
      return a;
    });
    return { name, columns: columns.map((c, i2) => c || 'col' + (i2 + 1)), rows };
  }

  function splitTuples(str) {
    const tuples = [];
    let depth = 0;
    let cur = '';
    let q = false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (q) {
        cur += ch;
        if (ch === "'") {
          if (str[i + 1] === "'") {
            cur += str[i + 1];
            i++;
          } else q = false;
        }
      } else if (ch === "'") {
        q = true;
        cur += ch;
      } else if (ch === '(') {
        depth++;
        if (depth === 1) {
          cur = '';
          continue;
        }
        cur += ch;
      } else if (ch === ')') {
        depth--;
        if (depth === 0) {
          tuples.push(cur);
          cur = '';
          continue;
        }
        cur += ch;
      } else if (depth >= 1) cur += ch;
    }
    return tuples;
  }

  function splitValues(tuple) {
    const out = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < tuple.length; i++) {
      const ch = tuple[i];
      if (q) {
        if (ch === "'") {
          if (tuple[i + 1] === "'") {
            cur += "'";
            i++;
          } else q = false;
        } else cur += ch;
      } else if (ch === "'") q = true;
      else if (ch === ',') {
        out.push(cur.trim());
        cur = '';
      } else cur += ch;
    }
    out.push(cur.trim());
    return out.map((v) => {
      if (/^null$/i.test(v)) return '';
      return v;
    });
  }

  function parseSQLText(text) {
    const sheets = [];
    const re = /INSERT\s+INTO\s+[`"[]?(\w+)[`"\]]?\s*\(([^)]+)\)\s*VALUES\s*([\s\S]*?);/gi;
    let m;
    while ((m = re.exec(text))) {
      sheets.push({
        name: m[1],
        columns: m[2].split(',').map((s) => s.trim().replace(/[`"[\]]/g, '')),
        rows: splitTuples(m[3]).map(splitValues)
      });
    }
    const byTable = {};
    sheets.forEach((s) => {
      if (byTable[s.name]) byTable[s.name].rows = byTable[s.name].rows.concat(s.rows);
      else byTable[s.name] = s;
    });
    const merged = Object.values(byTable);
    if (!merged.length) {
      const sel = /SELECT\s+([\s\S]+?)\s+FROM\s+[`"[]?(\w+)/i.exec(text);
      if (sel) {
        merged.push({
          name: sel[2].replace(/[`"[\]]/g, ''),
          columns: sel[1].split(',').map((s) => s.trim()),
          rows: []
        });
      } else throw new Error('SQL: هیچ INSERT یا SELECT قابل تشخیصی پیدا نشد');
    }
    return { type: 'sql', sheets: merged };
  }

  function treeSheet(root) {
    const rows = [];
    (function walk(el, path) {
      const p = path + '/' + el.nodeName;
      Array.from(el.attributes || []).forEach((a) => rows.push([p + '/@' + a.name, a.value]));
      const kids = Array.from(el.children);
      if (kids.length === 0) rows.push([p, (el.textContent || '').trim()]);
      else kids.forEach((k) => walk(k, p));
    })(root, '');
    return { name: root.nodeName, columns: ['path', 'value'], rows };
  }

  function parseXMLText(text) {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('XML نامعتبر است');
    const root = doc.documentElement;
    const kids = Array.from(root.children);
    const counts = {};
    kids.forEach((k) => (counts[k.nodeName] = (counts[k.nodeName] || 0) + 1));
    let recName = null;
    let best = 0;
    Object.keys(counts).forEach((n) => {
      if (counts[n] > best) {
        best = counts[n];
        recName = n;
      }
    });
    if (!recName || best < 2) return { type: 'xml', sheets: [treeSheet(root)] };
    const records = kids.filter((k) => k.nodeName === recName);
    const cols = [];
    const seen = new Set();
    records.forEach((r) => {
      Array.from(r.children).forEach((c) => {
        if (!seen.has(c.nodeName)) {
          seen.add(c.nodeName);
          cols.push(c.nodeName);
        }
      });
      Array.from(r.attributes).forEach((a) => {
        const n = '@' + a.name;
        if (!seen.has(n)) {
          seen.add(n);
          cols.push(n);
        }
      });
    });
    const rows = records.map((r) =>
      cols.map((c) => {
        if (c.startsWith('@')) return r.getAttribute(c.slice(1)) || '';
        const el = Array.from(r.children).find((x) => x.nodeName === c);
        return el ? (el.textContent || '').trim() : '';
      })
    );
    return { type: 'xml', sheets: [{ name: recName, columns: cols, rows }] };
  }

  function detect(text) {
    const t = text.trim();
    if (!t) return 'text';
    const head = t.slice(0, 3000);
    if (/^[\[{]/.test(t)) {
      try {
        JSON.parse(t);
        return 'json';
      } catch (e) {}
      const jlines = t.split(/\r?\n/).filter((l) => l.trim() !== '');
      if (jlines.length && jlines.every((l) => {
        try {
          return typeof JSON.parse(l) === 'object';
        } catch (err) {
          return false;
        }
      }))
        return 'jsonl';
    }
    if (/^</.test(t) || /^<\?xml/i.test(t)) return 'xml';
    if (/\b(INSERT\s+INTO|CREATE\s+TABLE|SELECT\s+[\s\S]{1,500}?\s+FROM)\b/i.test(head)) return 'sql';
    if (/^-{3}\s*$/m.test(head) && /^[\w.\-]+\s*:/m.test(head)) return 'yaml';
    const lines = t.split(/\r?\n/).filter((l) => l.trim() !== '');
    if (lines.length > 1) {
      const yamlLines = lines.slice(0, 12).filter((l) => /^\s*-\s/.test(l) || /^[\w.\-]+\s*:(\s|$)/.test(l.trim()) || /^\s{2,}\S/.test(l));
      if (yamlLines.length >= Math.min(2, lines.length) && yamlLines.length >= lines.slice(0, 12).length * 0.7) return 'yaml';
    }
    if (head.includes('\t') && head.split('\t').length > head.split(',').length) return 'tsv';
    if (head.includes(',') || head.includes(';') || head.includes('|') || head.includes('\t')) return 'csv';
    if (lines.length && lines.every((l) => {
      try {
        JSON.parse(l);
        return true;
      } catch (e) {
        return false;
      }
    }))
      return 'jsonl';
    return 'text';
  }

  function parse(text, forced) {
    const type = forced && forced !== 'auto' ? forced : detect(text);
    if (type === 'json') {
      const obj = JSON.parse(text);
      return { type, sheets: objectToSheets(obj) };
    }
    if (type === 'jsonl') {
      const arr = text.split(/\r?\n/).filter((l) => l.trim() !== '').map((l) => JSON.parse(l));
      return { type, sheets: [arraySheet(arr, 'data')] };
    }
    if (type === 'yaml') {
      const obj = parseYAMLText(text);
      return { type, sheets: objectToSheets(obj) };
    }
    if (type === 'xml') return parseXMLText(text);
    if (type === 'sql') return parseSQLText(text);
    if (type === 'tsv') return { type, sheets: [delimitedToSheet(text, '\t', 'data')] };
    if (type === 'csv') return { type, sheets: [delimitedToSheet(text, detectDelimiter(text), 'data')] };
    const rows = text.split(/\r?\n/).filter((l, idx, a) => !(idx === a.length - 1 && l === '')).map((l) => [l]);
    return { type: 'text', sheets: [{ name: 'lines', columns: ['line'], rows }] };
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (Array.from(document.scripts).some((s) => s.src === src)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('CDN در دسترس نیست: ' + src));
      document.head.appendChild(s);
    });
  }

  async function parseFile(file) {
    const name = file.name || '';
    const ext = (name.split('.').pop() || '').toLowerCase();
    if (['xlsx', 'xls', 'xlsm', 'ods'].includes(ext)) {
      await loadScript(XLSX_CDN);
      const buf = await file.arrayBuffer();
      const wb = window.XLSX.read(new Uint8Array(buf), { type: 'array' });
      const sheets = wb.SheetNames.map((sn) => {
        const aoa = window.XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: false, defval: '' });
        const clean = aoa.filter((r) => r.some((c) => c !== ''));
        if (!clean.length) return { name: sn, columns: [], rows: [] };
        const columns = clean[0].map((c, i) => String(c || 'col' + (i + 1)));
        const rows = clean.slice(1).map((r) => {
          const a = r.slice(0, columns.length).map((c) => (c === null || c === undefined ? '' : String(c)));
          while (a.length < columns.length) a.push('');
          return a;
        });
        return { name: sn, columns, rows };
      });
      return { type: 'excel', sheets };
    }
    if (ext === 'json') {
      const obj = JSON.parse(await file.text());
      return { type: 'json', sheets: objectToSheets(obj) };
    }
    if (ext === 'csv') throw new Error('برای CSV از حالت Paste یا drag استفاده کنید');
    const txt = await file.text();
    return parse(txt);
  }

  DL.Parsers = { detect, parse, parseFile, delimitedToSheet, detectDelimiter, arraySheet, objectToSheets };
})();