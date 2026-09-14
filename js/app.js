(function () {
  const DL = window.DL;
  const A = DL.Analyze;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const I18N = {
    fa: {
      tagline: 'هر داده‌ای را پیست کن — جدول، نمودار، آمار و تبدیل. همه در مرورگر، بدون آپلود.',
      pasteLabel: 'داده را اینجا پیست کن',
      pastePh: 'CSV، JSON، YAML، XML، SQL، TSV، Excel… را پیست کن یا فایل را روی صفحه رها کن',
      format: 'فرمت',
      auto: 'تشخیص خودکار',
      parse: 'بپرداز',
      sample: 'نمونه',
      clear: 'پاک',
      dropTitle: 'فایل را اینجا رها کن',
      dropHint: 'یا برای انتخاب کلیک کن — CSV, TSV, JSON, XLSX, XML, YAML, SQL',
      detected: 'تشخیص',
      rowsShort: 'سطر',
      colsShort: 'ستون',
      table: 'جدول',
      chart: 'نمودار',
      stats: 'آمار',
      tools: 'ابزار',
      search: 'جست‌وجو در جدول…',
      noData: 'داده‌ای برای نمایش نیست',
      page: 'صفحه',
      of: 'از',
      rowsPerPage: 'در صفحه',
      prev: 'قبلی',
      next: 'بعدی',
      selected: '{n} انتخاب‌شده',
      copy: 'کپی',
      copyRows: 'کپی سطرها',
      exportSelected: 'خروجی انتخاب‌شده',
      clearSel: 'لغو انتخاب',
      chartSelected: 'نمودار انتخاب‌شده',
      chartType: 'نوع نمودار',
      labelCol: 'ستون برچسب',
      valueCol: 'ستون مقدار',
      valueCol2: 'ستون مقدار دوم (پراکندگی)',
      aggreg: 'تجمیع',
      none: 'هیچ (هر سطر)',
      sum: 'جمع',
      avg: 'میانگین',
      count: 'تعداد',
      renderChart: 'رسم',
      downloadSvg: 'دانلود SVG',
      downloadPng: 'دانلود PNG',
      bar: 'میله‌ای',
      hbar: 'میله‌ای افقی',
      line: 'خطی',
      area: 'سطحی',
      pie: 'دایره‌ای',
      donut: 'دونات',
      histogram: 'هیستوگرام',
      scatter: 'پراکندگی',
      totalRows: 'کل سطرها',
      totalCols: 'کل ستون‌ها',
      type: 'نوع',
      size: 'حجم',
      colName: 'نام ستون',
      min: 'کمینه',
      max: 'بیشینه',
      sumLbl: 'جمع',
      avgLbl: 'میانگین',
      uniq: 'یکتا',
      nulls: 'خالی',
      delimiter: 'جداکننده خروجی',
      comma: 'کاما',
      tab: 'تب',
      semi: 'نیم‌ویرگول',
      pipe: 'پایپ',
      exportAs: 'خروجی بگیر',
      copyOut: 'کپی خروجی',
      downloaded: 'دانلود شد',
      copied: 'کپی شد',
      transposed: 'جدول جابه‌جا شد',
      transposedNote: 'سطرها و ستون‌ها جابه‌جا شدند',
      deduped: 'سطرهای تکراری حذف شدند',
      flattened: 'JSON تخت شد',
      noDupe: 'سطر تکراری نبود',
      substatsNote: 'آمار ستون‌ها',
      emptyView: 'داده‌ای موجود نیست',
      error: 'خطا',
      warning: 'هشدار',
      loading: 'در حال پردازش…',
      urlCopy: 'کپی',
      copiedCell: 'مقدار کپی شد',
      editCell: 'ویرایش مقدار — Enter برای ذخیره، Esc برای انصراف',
      sheet: 'شیت',
      rows: 'سطر',
      cols: 'ستون',
      pasteCleared: 'پاک شد',
      back: 'بازگشت',
      readyFa: 'آماده — داده را پیست کن یا فایل بکش',
      supported: 'JSON · CSV · TSV · YAML · XML · SQL · JSONL · XLSX',
      copiedRows: '{n} سطر کپی شد',
      notNumber: 'ستون انتخابی عددی نیست',
      pickCols: 'ستون برچسب و مقدار را انتخاب کن',
      chartsReady: 'نمودار آماده است',
      theme: 'تغییر تم',
      lang: 'English'
    },
    en: {
      tagline: 'Paste any data — table, chart, stats and conversion. All in your browser, no upload.',
      pasteLabel: 'Paste data here',
      pastePh: 'Paste CSV, JSON, YAML, XML, SQL, TSV, Excel… or drop a file anywhere',
      format: 'Format',
      auto: 'Auto-detect',
      parse: 'Parse',
      sample: 'Sample',
      clear: 'Clear',
      dropTitle: 'Drop file here',
      dropHint: 'or click to browse — CSV, TSV, JSON, XLSX, XML, YAML, SQL',
      detected: 'Detected',
      rowsShort: 'rows',
      colsShort: 'cols',
      table: 'Table',
      chart: 'Chart',
      stats: 'Stats',
      tools: 'Tools',
      search: 'Search table…',
      noData: 'Nothing to show',
      page: 'Page',
      of: 'of',
      rowsPerPage: 'per page',
      prev: 'Prev',
      next: 'Next',
      selected: '{n} selected',
      copy: 'Copy',
      copyRows: 'Copy rows',
      exportSelected: 'Export selected',
      clearSel: 'Clear',
      chartSelected: 'Chart selected',
      chartType: 'Chart type',
      labelCol: 'Label column',
      valueCol: 'Value column',
      valueCol2: 'Second value (scatter)',
      aggreg: 'Aggregate',
      none: 'None (per row)',
      sum: 'Sum',
      avg: 'Average',
      count: 'Count',
      renderChart: 'Render',
      downloadSvg: 'Download SVG',
      downloadPng: 'Download PNG',
      bar: 'Bar',
      hbar: 'Horizontal bar',
      line: 'Line',
      area: 'Area',
      pie: 'Pie',
      donut: 'Donut',
      histogram: 'Histogram',
      scatter: 'Scatter',
      totalRows: 'Total rows',
      totalCols: 'Total columns',
      type: 'Type',
      size: 'Size',
      colName: 'Column',
      min: 'Min',
      max: 'Max',
      sumLbl: 'Sum',
      avgLbl: 'Avg',
      uniq: 'Unique',
      nulls: 'Empty',
      delimiter: 'Output delimiter',
      comma: 'Comma',
      tab: 'Tab',
      semi: 'Semicolon',
      pipe: 'Pipe',
      exportAs: 'Export as',
      copyOut: 'Copy output',
      downloaded: 'Downloaded',
      copied: 'Copied',
      transposed: 'Table transposed',
      transposedNote: 'Rows and columns swapped',
      deduped: 'Duplicate rows removed',
      flattened: 'JSON flattened',
      noDupe: 'No duplicate rows',
      substatsNote: 'Column statistics',
      emptyView: 'No data available',
      error: 'Error',
      warning: 'Warning',
      loading: 'Working…',
      urlCopy: 'Copy',
      copiedCell: 'Value copied',
      editCell: 'Edit value — Enter to save, Esc to cancel',
      sheet: 'Sheet',
      rows: 'rows',
      cols: 'cols',
      pasteCleared: 'Cleared',
      back: 'Back',
      readyFa: 'Ready — paste data or drop a file',
      supported: 'JSON · CSV · TSV · YAML · XML · SQL · JSONL · XLSX',
      copiedRows: 'Copied {n} rows',
      notNumber: 'Selected column is not numeric',
      pickCols: 'Pick label and value columns',
      chartsReady: 'Chart ready',
      theme: 'Toggle theme',
      lang: 'فارسی'
    }
  };

  let lang = localStorage.getItem('dl-lang') || 'fa';
  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

  const state = {
    data: null,
    sheet: 0,
    filter: '',
    sort: { col: -1, dir: 'asc' },
    page: 1,
    pageSize: 50,
    selected: new Set(),
    rowFilter: null,
    view: 'table',
    flat: false
  };

  function applyI18n() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title = 'DataLens — ' + t('table') + ' · ' + t('chart');
    $$('[data-i18n]').forEach((el) => (el.textContent = t(el.getAttribute('data-i18n'))));
    $$('[data-i18n-ph]').forEach((el) => (el.placeholder = t(el.getAttribute('data-i18n-ph'))));
    localStorage.setItem('dl-lang', lang);
  }

  function toast(msg, kind) {
    const el = $('#toast');
    el.textContent = msg;
    el.className = 'toast on' + (kind ? ' ' + kind : '');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (el.className = 'toast'), 2600);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  function download(name, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast(t('downloaded') + ' · ' + name);
  }

  function bytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(2) + ' MB';
  }

  /* ---------- current sheet helpers ---------- */
  function sheet() {
    if (!state.data || !state.data.sheets.length) return { name: '', columns: [], rows: [] };
    const s = state.data.sheets[state.sheet] || state.data.sheets[0];
    return s;
  }

  function viewRows() {
    const s = sheet();
    const q = state.filter.trim().toLowerCase();
    let idx = s.rows.map((_, i) => i);
    if (state.rowFilter) idx = idx.filter((i) => state.rowFilter.has(i));
    if (q) idx = idx.filter((i) => s.rows[i].some((c) => String(c).toLowerCase().includes(q)));
    if (state.sort.col >= 0) {
      const { col, dir } = state.sort;
      idx.sort((a, b) => {
        const va = s.rows[a][col];
        const vb = s.rows[b][col];
        const na = A.isNum(va);
        const nb = A.isNum(vb);
        let r;
        if (na && nb) r = Number(String(va).replace(/,/g, '')) - Number(String(vb).replace(/,/g, ''));
        else r = String(va === undefined ? '' : va).localeCompare(String(vb === undefined ? '' : vb), lang === 'fa' ? 'fa' : 'en', { numeric: true });
        return dir === 'asc' ? r : -r;
      });
    }
    return idx;
  }

  function records() {
    const s = sheet();
    return s.rows.map((r) => {
      const o = {};
      s.columns.forEach((c, i) => (o[c || 'col' + (i + 1)] = r[i] === undefined ? '' : r[i]));
      return o;
    });
  }

  function selectedRecords() {
    const s = sheet();
    return Array.from(state.selected)
      .sort((a, b) => a - b)
      .map((i) => {
        const o = {};
        s.columns.forEach((c, ci) => (o[c || 'col' + (ci + 1)] = s.rows[i][ci] === undefined ? '' : s.rows[i][ci]));
        return o;
      });
  }

  /* ---------- import ---------- */
  function loadData(parsed, keepSort) {
    state.data = parsed;
    state.sheet = 0;
    state.filter = '';
    state.sort = { col: -1, dir: 'asc' };
    state.page = 1;
    state.selected = new Set();
    state.rowFilter = null;
    state.flat = false;
    if (!keepSort) $('#searchInput').value = '';
    enterWorkspace();
  }

  function enterWorkspace() {
    $('#importView').hidden = true;
    $('#workspace').hidden = false;
    buildSheetTabs();
    buildChartControls();
    render();
    $('#stMeta').textContent = sheet().columns.length + ' ' + t('colsShort') + ' · ' + sheet().rows.length + ' ' + t('rowsShort');
  }

  function exitWorkspace() {
    state.data = null;
    $('#workspace').hidden = true;
    $('#importView').hidden = false;
    $('#pasteArea').value = '';
    $('#detected').hidden = true;
    setDetected('');
  }

  function parsePaste() {
    const text = $('#pasteArea').value;
    if (!text.trim()) return toast(t('emptyView'), 'warn');
    const forced = $('#formatSelect').value;
    try {
      const parsed = DL.Parsers.parse(text, forced);
      parsed.sourceSize = text.length;
      loadData(parsed);
      toast(t('detected') + ': ' + parsed.type);
    } catch (e) {
      toast(t('error') + ': ' + e.message, 'err');
    }
  }

  async function handleFiles(files) {
    if (!files || !files.length) return;
    const file = files[0];
    toast(t('loading'));
    try {
      const parsed = await DL.Parsers.parseFile(file);
      parsed.sourceSize = file.size;
      loadData(parsed);
      toast(file.name + ' — ' + t('detected') + ': ' + parsed.type);
    } catch (e) {
      toast(t('error') + ': ' + e.message, 'err');
    }
  }

  function setDetected(type) {
    const b = $('#detected');
    if (!type) {
      b.hidden = true;
      return;
    }
    b.hidden = false;
    b.innerHTML = '<span>' + t('detected') + '</span><b>' + type.toUpperCase() + '</b>';
  }

  function autoDetect() {
    const text = $('#pasteArea').value;
    if (!text.trim()) return setDetected('');
    try {
      setDetected(DL.Parsers.detect(text));
    } catch (e) {
      setDetected('');
    }
  }

  /* ---------- tabs ---------- */
  function buildSheetTabs() {
    const wrap = $('#sheetTabs');
    if (!state.data || state.data.sheets.length < 2) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    wrap.innerHTML = '';
    state.data.sheets.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === state.sheet ? ' active' : '');
      b.textContent = s.name + ' (' + s.rows.length + ')';
      b.onclick = () => {
        state.sheet = i;
        state.selected = new Set();
        state.page = 1;
        state.sort = { col: -1, dir: 'asc' };
        buildSheetTabs();
        buildChartControls();
        render();
        $('#stMeta').textContent = s.columns.length + ' ' + t('colsShort') + ' · ' + s.rows.length + ' ' + t('rowsShort');
      };
      wrap.appendChild(b);
    });
  }

  /* ---------- render ---------- */
  function render() {
    $$('#viewSwitch button').forEach((b) => b.classList.toggle('active', b.dataset.view === state.view));
    $('#tableView').hidden = state.view !== 'table';
    $('#chartView').hidden = state.view !== 'chart';
    $('#statsView').hidden = state.view !== 'stats';
    $('#toolsView').hidden = state.view !== 'tools';
    if (state.view === 'table') renderTable();
    if (state.view === 'chart') renderChartWithSpec();
    if (state.view === 'stats') renderStats();
    if (state.view === 'tools') renderTools();
    renderSelection();
  }

  function cellClass(v) {
    const k = A.classify(v).kind;
    return 'c-' + k;
  }

  function renderTable() {
    const s = sheet();
    const idx = viewRows();
    const total = idx.length;
    const pages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * state.pageSize;
    const slice = idx.slice(start, start + state.pageSize);

    const head = '<thead><tr><th class="chk"><input type="checkbox" id="chkAll"></th><th class="rn">#</th>' +
      s.columns
        .map((c, i) => {
          const type = A.colType(i, s.rows);
          const arrow = state.sort.col === i ? (state.sort.dir === 'asc' ? ' ▲' : ' ▼') : '';
          return '<th data-col="' + i + '" class="' + (state.sort.col === i ? 'sorted' : '') + '" title="' + t('colName') + ': ' + (c || '') + ' · ' + type + '">' + (c || 'col' + (i + 1)) + '<i class="ttype">' + type + '</i>' + arrow + '</th>';
        })
        .join('') +
      '</tr></thead>';

    const body =
      '<tbody>' +
      slice
        .map((ri) => {
          const r = s.rows[ri];
          const cells = s.columns
            .map((_, ci) => {
              const v = r[ci] === undefined ? '' : r[ci];
              return '<td class="' + cellClass(v) + '" data-row="' + ri + '" data-col="' + ci + '" title="' + t('editCell') + '">' + escapeHtml(v) + '</td>';
            })
            .join('');
          return '<tr data-row="' + ri + '" class="' + (state.selected.has(ri) ? 'sel' : '') + '"><td class="chk"><input type="checkbox" data-row="' + ri + '"' + (state.selected.has(ri) ? ' checked' : '') + '></td><td class="rn">' + (ri + 1) + '</td>' + cells + '</tr>';
        })
        .join('') +
      '</tbody>';

    $('#tableWrap').innerHTML = slice.length ? '<table class="data-table">' + head + body + '</table>' : '<div class="empty">' + t('noData') + '</div>';
    $('#pageInfo').textContent = t('page') + ' ' + state.page + ' ' + t('of') + ' ' + pages + ' · ' + total + ' ' + t('rows');
    $('#pagePrev').disabled = state.page <= 1;
    $('#pageNext').disabled = state.page >= pages;

    $('#tableWrap')
      .querySelectorAll('th[data-col]')
      .forEach((th) => {
        th.onclick = () => {
          const c = Number(th.dataset.col);
          if (state.sort.col === c) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
          else state.sort = { col: c, dir: 'asc' };
          renderTable();
        };
      });
    const chkAll = $('#chkAll');
    if (chkAll)
      chkAll.onchange = () => {
        slice.forEach((ri) => (chkAll.checked ? state.selected.add(ri) : state.selected.delete(ri)));
        renderTable();
        renderSelection();
      };
    $('#tableWrap')
      .querySelectorAll('input[data-row]')
      .forEach((cb) => {
        cb.onchange = () => {
          const ri = Number(cb.dataset.row);
          cb.checked ? state.selected.add(ri) : state.selected.delete(ri);
          cb.closest('tr').classList.toggle('sel', cb.checked);
          renderSelection();
        };
      });
    $('#tableWrap')
      .querySelectorAll('td[data-row]')
      .forEach((td) => {
        td.ondblclick = () => startEdit(td);
      });
  }

  function startEdit(td) {
    if (td.querySelector('input')) return;
    const s = sheet();
    const ri = Number(td.dataset.row);
    const ci = Number(td.dataset.col);
    const val = s.rows[ri][ci] === undefined ? '' : s.rows[ri][ci];
    td.innerHTML = '';
    const inp = document.createElement('input');
    inp.className = 'cell-edit';
    inp.value = val;
    td.appendChild(inp);
    inp.focus();
    inp.select();
    const commit = (save) => {
      if (save) {
        s.rows[ri][ci] = inp.value;
        toast(t('copied') + ' ✔');
      }
      renderTable();
    };
    inp.onkeydown = (e) => {
      if (e.key === 'Enter') commit(true);
      if (e.key === 'Escape') commit(false);
    };
    inp.onblur = () => commit(true);
  }

  function renderSelection() {
    const bar = $('#selectionBar');
    const n = state.selected.size;
    if (n === 0) {
      bar.hidden = true;
    } else {
      bar.hidden = false;
      $('#selCount').textContent = t('selected').replace('{n}', n);
    }
    const chip = $('#filterChip');
    if (chip) {
      if (state.rowFilter) {
        chip.hidden = false;
        chip.textContent = t('chartSelected') + ' (' + state.rowFilter.size + ') ✕';
      } else chip.hidden = true;
    }
  }

  function buildChartControls() {
    const s = sheet();
    const fill = (sel, includeNone) => {
      const prev = sel.value;
      sel.innerHTML = (includeNone ? '<option value="-1">' + t('none') + '</option>' : '') +
        s.columns.map((c, i) => '<option value="' + i + '">' + escapeHtml(c || 'col' + (i + 1)) + '</option>').join('');
      if (prev && sel.querySelector('option[value="' + prev + '"]')) sel.value = prev;
    };
    fill($('#chartLabel'), true);
    fill($('#chartValue'), false);
    fill($('#chartValue2'), true);
    const numericCols = s.columns.map((_, i) => i).filter((i) => A.colType(i, s.rows) === 'number');
    const textCols = s.columns.map((_, i) => i).filter((i) => A.colType(i, s.rows) === 'text');
    const idLike = (name) => /^(id|index|row|#|key|_id)$/i.test(String(name).trim()) || /(_id|id)$/i.test(String(name).trim());
    const bestValue = numericCols.find((i) => !idLike(s.columns[i])) ?? numericCols[0];
    const card = (i) => {
      const seen = new Set();
      s.rows.forEach((r) => seen.add(String(r[i])));
      return seen.size;
    };
    let bestLabel = textCols[0];
    let bestCard = Infinity;
    textCols.forEach((i) => {
      if (idLike(s.columns[i])) return;
      const c = card(i);
      if (c > 1 && c < bestCard) {
        bestCard = c;
        bestLabel = i;
      }
    });
    if (bestValue !== undefined) {
      $('#chartValue').value = String(bestValue);
      $('#chartValue2').value = '-1';
    }
    if (bestLabel !== undefined) $('#chartLabel').value = String(bestLabel);
    if (String($('#chartLabel').value) === String($('#chartValue').value)) $('#chartLabel').value = '-1';
  }

  function buildSpec() {
    const s = sheet();
    const type = $('#chartType').value;
    const li = Number($('#chartLabel').value);
    const vi = Number($('#chartValue').value);
    const v2 = Number($('#chartValue2').value);
    const agg = $('#chartAgg').value;
    const labels = [];
    const values = [];
    const title = (li >= 0 ? s.columns[li] : '') + (vi >= 0 ? ' · ' + s.columns[vi] : '');
    const visIdx = viewRows();

    if (type === 'scatter') {
      const xs = [];
      const ys = [];
      const numeric = (i) => i >= 0 && A.colType(i, s.rows) === 'number';
      let xi = numeric(li) ? li : numeric(vi) ? vi : -1;
      let yi = numeric(v2) ? v2 : numeric(vi) && vi !== xi ? vi : -1;
      if (xi < 0 || yi < 0 || xi === yi) {
        const nums = s.columns.map((_, i) => i).filter((i) => numeric(i));
        if (nums.length >= 2) {
          xi = nums[0];
          yi = nums[1];
        }
      }
      visIdx.forEach((ri) => {
        const r = s.rows[ri];
        const x = xi >= 0 ? r[xi] : '';
        const y = yi >= 0 ? r[yi] : '';
        if (A.isNum(x) && A.isNum(y)) {
          xs.push(Number(String(x).replace(/,/g, '')));
          ys.push(Number(String(y).replace(/,/g, '')));
        }
      });
      if (xs.length < 2) throw new Error(t('notNumber'));
      return { type: 'scatter', xs, ys, title: (yi >= 0 ? s.columns[yi] : '') + ' × ' + (xi >= 0 ? s.columns[xi] : '') };
    }
    if (type === 'histogram') {
      if (vi < 0) throw new Error(t('pickCols'));
      const nums = visIdx.map((ri) => s.rows[ri][vi]).filter(A.isNum).map((v) => Number(String(v).replace(/,/g, '')));
      if (!nums.length) throw new Error(t('notNumber'));
      return { type: 'histogram', values: nums, bins: Math.max(5, Math.min(20, Math.round(Math.sqrt(nums.length)))), title: s.columns[vi] };
    }

    const groups = new Map();
    if (agg === 'none') {
      visIdx.forEach((ri, n) => {
        const r = s.rows[ri];
        const rawVal = vi >= 0 ? r[vi] : '';
        if (!A.isNum(rawVal)) return;
        labels.push(li >= 0 ? String(r[li]) : String(n + 1));
        values.push(Number(String(rawVal).replace(/,/g, '')));
      });
      if (!labels.length) throw new Error(t('pickCols'));
      return { type: type === 'area' ? 'area' : type, labels, values, title, donut: type === 'donut' };
    }
    visIdx.forEach((ri, n) => {
      const r = s.rows[ri];
      const rawLabel = li >= 0 ? String(r[li]) : String(n + 1);
      const rawVal = vi >= 0 ? r[vi] : 1;
      if (agg === 'count') {
        groups.set(rawLabel, (groups.get(rawLabel) || 0) + 1);
        return;
      }
      if (!A.isNum(rawVal)) return;
      const num = Number(String(rawVal).replace(/,/g, ''));
      const g = groups.get(rawLabel) || { sum: 0, n: 0 };
      g.sum += num;
      g.n++;
      groups.set(rawLabel, g);
    });
    Array.from(groups.entries()).forEach(([k, v]) => {
      labels.push(k);
      values.push(agg === 'count' ? v : agg === 'avg' ? v.sum / v.n : v.sum);
    });
    if (!labels.length) throw new Error(t('pickCols'));
    return { type: type === 'bar' && labels.length > 12 ? 'hbar' : type === 'area' ? 'area' : type, labels, values, title, donut: type === 'donut' };
  }

  function renderChartSummary(spec) {
    const el = $('#chartMsg');
    const n = spec.values ? spec.values.length : spec.xs ? spec.xs.length : 0;
    el.textContent = n + ' ' + t('rowsShort');
  }

  function renderStats() {
    const s = sheet();
    const d = A.describe(s);
    const size = state.data.sourceSize || JSON.stringify(s.rows).length;
    $('#statsCards').innerHTML = [
      card(t('totalRows'), d.rowCount),
      card(t('totalCols'), d.colCount),
      card(t('type'), (state.data.type || '').toUpperCase()),
      card(t('size'), bytes(size))
    ].join('');
    let html = '<table class="data-table stats-table"><thead><tr><th>#</th><th>' + t('colName') + '</th><th>' + t('type') + '</th><th>' + t('uniq') + '</th><th>' + t('nulls') + '</th><th>' + t('min') + '</th><th>' + t('max') + '</th><th>' + t('sumLbl') + '</th><th>' + t('avgLbl') + '</th></tr></thead><tbody>';
    html += d.columns
      .map((c) => {
        const f = (x) => (x === null || x === undefined ? '—' : DL.Charts.fmt(x));
        return (
          '<tr><td class="rn">' + (c.index + 1) + '</td><td><b>' + escapeHtml(c.name) + '</b></td><td><span class="pill ' + c.type + '">' + c.type + '</span></td><td>' + c.uniq + '</td><td>' + c.empty + '</td><td>' + f(c.min) + '</td><td>' + f(c.max) + '</td><td>' + f(c.sum) + '</td><td>' + (c.avg === null ? '—' : DL.Charts.fmt(c.avg)) + '</td></tr>'
        );
      })
      .join('');
    html += '</tbody></table>';
    $('#statsTable').innerHTML = html;
  }

  function card(label, value) {
    return '<div class="stat-card"><span>' + escapeHtml(String(label)) + '</span><b>' + escapeHtml(String(value)) + '</b></div>';
  }

  function renderTools() {
    const wrap = $('#exportGrid');
    const sheets = state.data.sheets;
    const recs = selectedRecords().length ? selectedRecords() : records();
    const base = (sheet().name || 'data').replace(/[^\w\-]+/g, '_') || 'data';
    const delim = $('#delimSelect') ? $('#delimSelect').value : ',';
    const formats = [
      ['CSV', () => A.toCSV(sheets, delim), 'text/csv', base + '.csv'],
      ['TSV', () => A.toCSV(sheets, '\t'), 'text/tab-separated-values', base + '.tsv'],
      ['JSON', () => A.toJSON(sheets, recs), 'application/json', base + '.json'],
      ['JSONL', () => A.toJSONL(recs), 'application/x-ndjson', base + '.jsonl'],
      ['YAML', () => A.toYAML(recs), 'text/yaml', base + '.yaml'],
      ['XML', () => A.toXML(recs, base), 'application/xml', base + '.xml'],
      ['SQL', () => A.toSQL(sheets, base), 'text/plain', base + '.sql'],
      ['Markdown', () => A.toMarkdown(sheets), 'text/markdown', base + '.md'],
      ['HTML', () => A.toHTML(sheets), 'text/html', base + '.html']
    ];
    wrap.innerHTML = formats
      .map((f, i) => '<button class="tool-btn" data-f="' + i + '"><b>' + f[0] + '</b><span>↓</span></button>')
      .join('');
    wrap.querySelectorAll('button').forEach((b) => {
      b.onclick = () => {
        const f = formats[Number(b.dataset.f)];
        download(f[3], f[1](), f[2]);
      };
    });
    $('#toolsNote').textContent = recs.length + ' ' + t('rowsShort') + (state.selected.size ? ' (' + t('selected').replace('{n}', state.selected.size) + ')' : '');
  }

  function escapeHtml(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  /* ---------- transform tools ---------- */
  function transpose() {
    const s = sheet();
    const cols = s.columns;
    const rows = s.rows;
    const maxLen = Math.max(cols.length, ...rows.map((r) => r.length), 0);
    const newCols = ['field'].concat(rows.map((r, i) => {
      const first = r[0] === undefined || r[0] === '' ? null : String(r[0]);
      return first || 'row ' + (i + 1);
    }));
    const newRows = [];
    for (let c = 0; c < maxLen; c++) {
      newRows.push([String(cols[c] === undefined ? 'col' + (c + 1) : cols[c])].concat(rows.map((r) => (r[c] === undefined ? '' : r[c]))));
    }
    state.data = { type: state.data.type, sheets: [{ name: 'transposed', columns: newCols, rows: newRows }], sourceSize: state.data.sourceSize };
    resetView();
    toast(t('transposedNote'));
  }

  function dedupe() {
    const s = sheet();
    const seen = new Set();
    const rows = [];
    s.rows.forEach((r) => {
      const k = r.join('\u0001');
      if (!seen.has(k)) {
        seen.add(k);
        rows.push(r);
      }
    });
    const removed = s.rows.length - rows.length;
    if (!removed) return toast(t('noDupe'));
    s.rows = rows;
    resetView();
    toast(t('deduped') + ' · −' + removed);
  }

  function flattenJSON() {
    const s = sheet();
    const recs = records();
    const flat = recs.map((o) => {
      const out = {};
      (function walk(obj, prefix) {
        Object.keys(obj).forEach((k) => {
          const v = obj[k];
          const key = prefix ? prefix + '.' + k : k;
          if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, key);
          else out[key] = Array.isArray(v) ? JSON.stringify(v) : v;
        });
      })(o, '');
      return out;
    });
    const cols = [];
    flat.forEach((o) => Object.keys(o).forEach((k) => cols.indexOf(k) < 0 && cols.push(k)));
    const rows = flat.map((o) => cols.map((c) => {
      const v = o[c];
      if (v === undefined || v === null) return '';
      return typeof v === 'object' ? JSON.stringify(v) : String(v);
    }));
    state.data = {
      type: 'json',
      sheets: [{ name: (s.name || 'data') + '_flat', columns: cols, rows: rows }],
      sourceSize: state.data.sourceSize
    };
    resetView();
    toast(t('flattened'));
  }

  function resetView() {
    state.sheet = 0;
    state.selected = new Set();
    state.rowFilter = null;
    state.page = 1;
    state.sort = { col: -1, dir: 'asc' };
    state.filter = '';
    $('#searchInput').value = '';
    buildSheetTabs();
    buildChartControls();
    render();
    $('#stMeta').textContent = sheet().columns.length + ' ' + t('colsShort') + ' · ' + sheet().rows.length + ' ' + t('rowsShort');
  }

  function copyOutput() {
    const s = sheet();
    const recs = selectedRecords().length ? selectedRecords() : records();
    copyText(A.toCSV([{ name: s.name, columns: s.columns, rows: s.rows }], ',')).then(() => toast(t('copied')));
  }

  async function exportPng() {
    const svg = $('#chartSvg svg');
    if (!svg) return;
    const str = DL.Charts.svgString(lastSpec);
    const blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1440;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#15151a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        const u = URL.createObjectURL(b);
        const a = document.createElement('a');
        a.href = u;
        a.download = 'chart.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(u), 1500);
        toast(t('downloaded') + ' · chart.png');
      });
    };
    img.onerror = () => toast(t('error'), 'err');
    img.src = url;
  }

  let lastSpec = null;
  function renderChartWithSpec() {
    try {
      lastSpec = buildSpec();
      DL.Charts.render($('#chartSvg'), lastSpec);
      renderChartSummary(lastSpec);
      $('#chartMsg').textContent = '';
    } catch (e) {
      lastSpec = null;
      $('#chartSvg').innerHTML = '<div class="empty">' + escapeHtml(e.message) + '</div>';
    }
  }

  /* ---------- wire up ---------- */
  function init() {
    applyI18n();
    const savedTheme = localStorage.getItem('dl-theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

    $('#langBtn').onclick = () => {
      lang = lang === 'fa' ? 'en' : 'fa';
      applyI18n();
      $('#langBtn').textContent = t('lang');
      if (state.data) {
        buildSheetTabs();
        buildChartControls();
        render();
      }
    };
    $('#langBtn').textContent = t('lang');

    $('#themeBtn').onclick = () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', cur);
      localStorage.setItem('dl-theme', cur);
      if (state.view === 'chart') renderChartWithSpec();
    };

    $('#pasteArea').addEventListener('input', autoDetect);
    $('#parseBtn').onclick = parsePaste;
    $('#clearBtn').onclick = () => {
      $('#pasteArea').value = '';
      setDetected('');
      toast(t('pasteCleared'));
    };
    $('#sampleBtn').onclick = () => {
      $('#pasteArea').value = SAMPLE;
      autoDetect();
      parsePaste();
    };
    $('#formatSelect').onchange = () => {
      if (state.data) return;
      autoDetect();
    };
    $('#formatSelect').addEventListener('change', () => {
      if (state.data) return;
      autoDetect();
    });

    $('#fileInput').onchange = (e) => handleFiles(e.target.files);
    $('#dropZone').onclick = () => $('#fileInput').click();
    ['dragenter', 'dragover'].forEach((ev) =>
      document.addEventListener(ev, (e) => {
        e.preventDefault();
        $('#dropZone').classList.add('over');
      })
    );
    ['dragleave', 'drop'].forEach((ev) =>
      document.addEventListener(ev, (e) => {
        e.preventDefault();
        if (ev === 'drop' || e.target === document.documentElement) $('#dropZone').classList.remove('over');
        if (ev === 'drop' && e.dataTransfer && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
      })
    );

    $('#backBtn').onclick = exitWorkspace;
    $('#searchInput').addEventListener('input', (e) => {
      state.filter = e.target.value;
      state.page = 1;
      renderTable();
    });
    $('#pageSize').onchange = (e) => {
      state.pageSize = Number(e.target.value);
      state.page = 1;
      renderTable();
    };
    $('#pagePrev').onclick = () => {
      state.page = Math.max(1, state.page - 1);
      renderTable();
    };
    $('#pageNext').onclick = () => {
      state.page++;
      renderTable();
    };
    $$('#viewSwitch button').forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
        render();
      };
    });

    $('#selCopy').onclick = () => {
      const recs = selectedRecords();
      copyText(A.toJSON(null, recs)).then(() => toast(t('copiedRows').replace('{n}', recs.length)));
    };
    $('#selExport').onclick = () => {
      const recs = selectedRecords();
      const name = (sheet().name || 'selection') + '_selection.csv';
      const cols = Object.keys(recs[0] || {});
      download(name, A.toCSV([{ name: 'selection', columns: cols, rows: recs.map((r) => cols.map((c) => r[c])) }], ','), 'text/csv');
    };
    $('#selChart').onclick = () => {
      state.filter = '';
      $('#searchInput').value = '';
      const s = sheet();
      const nums = s.columns.map((c, i) => ({ c, i })).filter((x) => A.colType(x.i, s.rows) === 'number');
      noteSelectedChart(nums);
    };
    $('#selClear').onclick = () => {
      state.selected = new Set();
      state.rowFilter = null;
      renderTable();
      renderSelection();
    };

    $('#chartType').onchange = () => {
      const type = $('#chartType').value;
      $('#chartValue2').closest('.field').style.display = type === 'scatter' ? '' : 'none';
      $('#chartAgg').closest('.field').style.display = type === 'scatter' || type === 'histogram' ? 'none' : '';
    };
    $('#chartBtn').onclick = renderChartWithSpec;
    $('#chartSvgDl').onclick = () => {
      if (!lastSpec) return;
      download('chart.svg', DL.Charts.svgString(lastSpec), 'image/svg+xml');
    };
    $('#chartPngDl').onclick = exportPng;
    ['chartType', 'chartLabel', 'chartValue', 'chartValue2', 'chartAgg'].forEach((id) => {
      $('#' + id).addEventListener('change', () => state.view === 'chart' && renderChartWithSpec());
    });

    $('#transposeBtn').onclick = transpose;
    $('#dedupeBtn').onclick = dedupe;
    $('#flattenBtn').onclick = flattenJSON;
    $('#copyOutBtn').onclick = copyOutput;

    $('#filterChip').onclick = () => {
      state.rowFilter = null;
      render();
    };

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'enter') {
        e.preventDefault();
        state.data ? (state.view === 'chart' ? renderChartWithSpec() : parsePaste()) : parsePaste();
      }
      if (e.key === 'Escape' && state.data) exitWorkspace();
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (state.data) {
          state.view = 'table';
          render();
          $('#searchInput').focus();
        }
      }
    });

    if (location.hash.startsWith('#data=')) {
      try {
        const text = decodeURIComponent(escape(atob(location.hash.slice(6))));
        $('#pasteArea').value = text;
        autoDetect();
        parsePaste();
      } catch (e) {}
    }
  }

  function noteSelectedChart(nums) {
    const s = sheet();
    if (!state.selected.size) return toast(t('selected').replace('{n}', 0));
    state.rowFilter = new Set(state.selected);
    state.filter = '';
    $('#searchInput').value = '';
    state.page = 1;
    state.view = 'chart';
    render();
    toast(t('selected').replace('{n}', state.rowFilter.size) + ' · ' + t('chartSelected'));
  }

  const SAMPLE =
    'id,name,category,price,rating,stock,date\n' +
    '1,Wireless Mouse,Accessories,29.9,4.5,120,2024-01-12\n' +
    '2,Mech Keyboard,Accessories,89.0,4.7,64,2024-01-18\n' +
    '3,USB-C Hub,Adapters,49.5,4.2,210,2024-02-02\n' +
    '4,HDMI Cable,Cables,12.99,4.0,540,2024-02-09\n' +
    '5,Webcam 1080p,Video,59.0,4.3,88,2024-02-21\n' +
    '6,Laptop Stand,Accessories,34.5,4.6,143,2024-03-05\n' +
    '7,SSD 1TB,Storage,99.0,4.8,37,2024-03-14\n' +
    '8,"Monitor 27""",Displays,219.0,4.9,22,2024-03-27\n' +
    '9,Desk Lamp,Accessories,24.0,3.9,300,2024-04-08\n' +
    '10,Headset,Hifi,79.0,4.4,76,2024-04-19';

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();