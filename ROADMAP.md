# ️ DataLens — Roadmap

Research-driven plan. Priorities are chosen for two audiences: **developers** (data wrangling, querying, scripting) and **regular users** (open a file, explore, chart, clean, export) — while keeping the core **local-first, zero-dependency, static-hostable** identity.

## ✅ v1.0 — Core (Done)
- [x] Auto-detect & parse: JSON, JSONL, CSV, TSV, YAML, XML, SQL, Excel (XLSX)
- [x] Paste + drag & drop, multi-sheet, delimiter sniffing
- [x] Table: search, sort, pagination, type-aware cells, inline edit, multi-select
- [x] Charts: 8 dependency-free SVG types + aggregation, SVG/PNG export
- [x] Stats per column, 9 export formats, Transpose / Dedupe / Flatten JSON
- [x] Bilingual FA/EN, dark/light, PWA offline

## ✅ v1.1 — Phase 1: Daily-use foundation (Done)
- [x] **Session persistence** (IndexedDB): auto-save the dataset, restore banner on reload, dismiss
- [x] **Save / Open project** (`.datalens.json`) — data + filters + sort + sheet
- [x] **Undo / Redo** for cell edits, row ops and transforms (`Ctrl+Z`, `Ctrl+Y`, `Ctrl+Shift+Z`)
- [x] **Per-column filters**: contains / not contains / equals / not equals / starts / ends / `>` `>=` `<` `<=` / regex / empty / not empty — AND-combined, chips, count badge
- [x] **Cell context menu**: copy value / row (TSV) / column, filter by value, edit, delete row
- [x] **Row operations**: add row, delete selected, duplicate selected
- [x] Saved-state indicator, filtered-count in the meta bar, `Ctrl+S` save project
- [x] Fixed: redo button state, edit-blur DOM race, sample quoting

## 🚧 v1.2 — Phase 2: Data power tools
High value for developers, approachable for users.
- [ ] **Column manager**: rename, hide/show, delete, insert, reorder (drag), change type
- [ ] **Data cleaning toolbox**: trim, case, fill down, find & replace, split column, merge columns, remove empty, coerce type
- [ ] **Computed column**: lightweight formula (`price * qty`, `CONCAT(a," ",b)`, `UPPER`, `ROUND`, date parts)
- [ ] **Pivot table**: rows / columns / values / aggregation, export pivot
- [ ] **Multi-column sort** (shift-click with priority badges) + sort manager
- [ ] **Export XLSX** (SheetJS, lazy-loaded) with typed cells
- [ ] **Advanced import options**: choose header row, skip rows, delimiter/quote, encoding, column type override
- [ ] **Group-by & aggregation builder** (like a guided pivot)

## 📈 v1.3 — Phase 3: Visualization upgrade
- [ ] Multi-series + stacked bar / area, grouped lines
- [ ] New types: box plot, treemap, heatmap, gauge, waterfall, radar
- [ ] Chart options: title, axis labels, legend position, colors, value format, log scale
- [ ] Chart from pivot / from computed columns
- [ ] **Dashboard**: pin multiple charts, rearrange, export as PNG/PDF
- [ ] Sparklines in the stats table
- [ ] Dark & light PNG export (match current theme)

##  v1.4 — Phase 4: Scale & performance
- [ ] **Virtualized table** (windowed rendering) for 100k+ rows
- [ ] **Web Worker parsing** so huge files never block the UI
- [ ] Streaming CSV parse with progress + cancel
- [ ] Smart type inference at scale (lazy per column)
- [ ] OPFS / IndexedDB chunked storage for very large datasets

##  v1.5 — Phase 5: Query & interop
- [ ] **SQL console** (DuckDB-WASM, lazy-loaded, optional) — `SELECT`, `WHERE`, `GROUP BY`, joins across sheets
- [ ] Import from URL (CORS-aware, with optional proxy note)
- [ ] **File System Access API**: open/save in place, recent files
- [ ] **Diff two datasets** (row/column compare)
- [ ] JSON tree viewer + path search (for nested JSON)
- [ ] Jalali / Persian date parsing & display; number/currency formatting

## 🔮 v1.6 — Phase 6: Sharing & intelligence
- [ ] Share via compressed URL (LZ-string) + embed snippet
- [ ] Named workspaces / recent datasets
- [ ] **Auto-insights**: outlier detection, correlations, distribution summaries
- [ ] AI assistant (bring-your-own-key): natural-language → filter/chart/query
- [ ] More UI locales (Arabic, Spanish, …)
- [ ] Accessibility: full keyboard grid navigation, ARIA roles, focus management
- [ ] Automated test suite in CI

## 💡 Considered / backlog
- Multi-cell range selection + clipboard paste (TSV interop with Excel/Sheets)
- Conditional formatting rules
- Templates / saved filter presets
- Plugin API for custom importers
- Server-side companion (optional, for huge files) — breaks local-first, deprioritized