(function () {
  const DL = (window.DL = window.DL || {});
  const P = DL.Parsers;

  function isNum(v) {
    if (v === null || v === undefined || v === '') return false;
    return !isNaN(Number(String(v).replace(/,/g, '')));
  }

  function colType(col, rows) {
    let nums = 0;
    let dates = 0;
    let total = 0;
    let blanks = 0;
    rows.forEach((r) => {
      const v = (r[col] === undefined || r[col] === null ? '' : String(r[col])).trim();
      if (v === '') {
        blanks++;
        return;
      }
      total++;
      if (isNum(v)) nums++;
      if (/^\d{4}-\d{2}-\d{2}/.test(v) || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(v)) dates++;
    });
    if (total === 0) return 'empty';
    if (nums === total) return 'number';
    if (dates === total) return 'date';
    if (blanks === rows.length) return 'empty';
    return 'text';
  }

  function describe(sheet) {
    const { columns, rows } = sheet;
    const cols = columns.map((name, ci) => {
      const values = rows.map((r) => (r[ci] === undefined ? '' : String(r[ci])));
      const nonEmpty = values.filter((v) => v.trim() !== '');
      const uniq = new Set(nonEmpty).size;
      const type = colType(ci, rows);
      let min = null;
      let max = null;
      let sum = 0;
      let avg = null;
      if (type === 'number') {
        const nums = nonEmpty.map((v) => Number(v.replace(/,/g, '')));
        min = Math.min(...nums);
        max = Math.max(...nums);
        sum = nums.reduce((a, b) => a + b, 0);
        avg = sum / nums.length;
      }
      return {
        index: ci,
        name: name || 'col' + (ci + 1),
        type,
        uniq,
        min,
        max,
        sum,
        avg,
        empty: values.length - nonEmpty.length
      };
    });
    return { columns: cols, rowCount: rows.length, colCount: columns.length };
  }

  function findTable(sheets) {
    const withRows = sheets.filter((s) => s.rows && s.rows.length);
    if (!withRows.length) return sheets[0];
    return withRows.reduce((a, b) => (b.rows.length > a.rows.length ? b : a));
  }

  function asRecords(sheets) {
    const table = findTable(sheets) || { columns: [], rows: [] };
    const headerRow = {};
    table.columns.forEach((c, i) => {
      if (/^col\d+$/.test(c)) headerRow[c] = true;
    });
    const columns = table.columns.map((c, i) => (headerRow[c] ? 'col' + (i + 1) : c));
    return {
      table: { name: table.name, columns, rows: table.rows },
      records: table.rows.map((r) => {
        const o = {};
        columns.forEach((c, i) => (o[c] = r[i] === undefined ? '' : r[i]));
        return o;
      })
    };
  }

  function toCSV(sheets, delimiter) {
    const d = delimiter || ',';
    const q = (v) => {
      const s = v === null || v === undefined ? '' : String(v);
      if (s.includes(d) || s.includes('"') || s.includes('\n') || s.includes('\r')) return '"' + s.replace(/"/g, '""') + '"';
      return s;
    };
    return sheets
      .map((s) => {
        const head = s.columns.map(q).join(d);
        const body = s.rows.map((r) => s.columns.map((_, i) => q(r[i] === undefined ? '' : r[i])).join(d));
        return [head].concat(body).join('\n');
      })
      .join('\n\n');
  }

  function toJSON(sheets, records) {
    return JSON.stringify(records, null, 2);
  }

  function toJSONL(records) {
    return records.map((r) => JSON.stringify(r)).join('\n');
  }

  function toSQL(sheets, table) {
    const name = String(table || 'data').replace(/[^\w]/g, '_');
    return sheets
      .map((s) => {
        const t = s.name === 'data' ? name : String(s.name).replace(/[^\w]/g, '_');
        const defs = s.columns.map((c, i) => {
          const type = colType(i, s.rows);
          const mapped = type === 'number' ? 'REAL' : type === 'date' ? 'DATE' : 'TEXT';
          return '  ' + c.replace(/[^\w]/g, '_') + ' ' + mapped;
        });
        const create = 'CREATE TABLE ' + t + ' (\n' + defs.join(',\n') + '\n);';
        const inserts = s.rows.map((r) => {
          const vals = s.columns.map((c, i) => {
            const v = r[i];
            if (v === '' || v === undefined || v === null) return 'NULL';
            if (isNum(v) && colType(i, s.rows) === 'number') return String(v).replace(/,/g, '');
            return "'" + String(v).replace(/'/g, "''") + "'";
          });
          return 'INSERT INTO ' + t + ' (' + s.columns.map((c) => c.replace(/[^\w]/g, '_')).join(', ') + ') VALUES (' + vals.join(', ') + ');';
        });
        return create + '\n' + inserts.join('\n');
      })
      .join('\n\n');
  }

  function yamlKey(k) {
    return /^[A-Za-z0-9_\-. ]+$/.test(k) && !k.includes(': ') ? k : '"' + String(k).replace(/"/g, '\\"') + '"';
  }

  function toYAML(records) {
    const one = (o, indent) => {
      const pad = ' '.repeat(indent);
      return Object.keys(o)
        .map((k) => {
          const v = o[k];
          if (v === null || v === undefined || v === '') return pad + yamlKey(k) + ': null';
          const s = String(v);
          const plain = /^[A-Za-z0-9_./@\-]+$/.test(s) && !isNum(s) ? s : null;
          if (plain) return pad + yamlKey(k) + ': ' + plain;
          if (isNum(s)) return pad + yamlKey(k) + ': ' + s.replace(/,/g, '');
          return pad + yamlKey(k) + ': "' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
        })
        .join('\n');
    };
    return records.map((r) => '- ' + one(r, 2).replace(/^  /, '')).join('\n');
  }

  function escapeXML(s) {
    return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
  }

  function toXML(records, name) {
    const root = String(name || 'items').replace(/[^\w]/g, '_');
    const body = records
      .map((r) => {
        const inner = Object.keys(r)
          .map((k) => {
            const tag = String(k).replace(/[^\w]/g, '_') || 'field';
            return '    <' + tag + '>' + escapeXML(r[k]) + '</' + tag + '>';
          })
          .join('\n');
        return '  <item>\n' + inner + '\n  </item>';
      })
      .join('\n');
    return '<?xml version="1.0" encoding="UTF-8"?>\n<' + root + '>\n' + body + '\n</' + root + '>';
  }

  function toMarkdown(sheets) {
    return sheets
      .map((s) => {
        const head = '| ' + s.columns.map((c) => String(c).replace(/\|/g, '\\|')).join(' | ') + ' |';
        const sep = '| ' + s.columns.map(() => '---').join(' | ') + ' |';
        const body = s.rows.map((r) => '| ' + s.columns.map((_, i) => String(r[i] === undefined ? '' : r[i]).replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ') + ' |');
        return [head, sep].concat(body).join('\n');
      })
      .join('\n\n');
  }

  function toHTML(sheets) {
    return sheets
      .map((s) => {
        const head = '<tr>' + s.columns.map((c) => '<th>' + escapeXML(c) + '</th>').join('') + '</tr>';
        const body = s.rows.map((r) => '<tr>' + s.columns.map((_, i) => '<td>' + escapeXML(r[i] === undefined ? '' : r[i]) + '</td>').join('') + '</tr>').join('\n');
        return '<table>\n<thead>' + head + '</thead>\n<tbody>\n' + body + '\n</tbody>\n</table>';
      })
      .join('\n');
  }

  function classify(value) {
    if (value === '' || value === undefined || value === null) return { kind: 'null', label: 'null' };
    const s = String(value);
    if (isNum(s)) return { kind: 'number', label: 'number' };
    if (/^https?:\/\//i.test(s)) return { kind: 'url', label: 'url' };
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(s)) return { kind: 'email', label: 'email' };
    if (/^\d{4}-\d{2}-\d{2}([T ]|$)/.test(s)) return { kind: 'date', label: 'datetime' };
    if (/^(true|false)$/i.test(s)) return { kind: 'bool', label: 'boolean' };
    if (/^[\[{]/.test(s)) return { kind: 'json', label: 'json' };
    return { kind: 'string', label: 'string' };
  }

  DL.Analyze = { describe, asRecords, findTable, toCSV, toJSON, toJSONL, toSQL, toYAML, toXML, toMarkdown, toHTML, classify, colType, isNum };
})();