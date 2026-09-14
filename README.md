<div align="center">

# 🔎 DataLens

### Table · Chart · Stats · Convert

**هر داده‌ای را ببین، تحلیل کن، نمودار بکش و تبدیل کن — همه در مرورگر، بدون آپلود.**
**View, chart, analyze and convert any data — all in your browser, nothing uploaded.**

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-datalens-8b5cf6?style=for-the-badge)](https://mohsen-niksirat.github.io/DataLens/)
[![MIT](https://img.shields.io/badge/License-MIT-46d369?style=for-the-badge)](LICENSE)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Zero deps](https://img.shields.io/badge/dependencies-0-8b5cf6?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-offline-5A0FC8?style=flat-square)

**🌍 Languages / زبان‌ها:** **English** · [فارسی](#-فارسی) · [العربية](#-العربية)

</div>

---

<!-- ==================================================================== -->
<!--                              ENGLISH                                 -->
<!-- ==================================================================== -->

<a id="-english"></a>

# 🇬🇧 English

**DataLens** is a single-page, client-side data workbench. Paste text or drop a file — it auto-detects the format, turns it into a searchable table, computes column statistics, renders charts and exports to almost any format. **No data ever leaves your browser.**

🔗 **Live:** https://mohsen-niksirat.github.io/DataLens/

## ✨ Features

### Input & auto-detection
- **Paste** any data text directly, or **drag & drop** a file anywhere
- Auto-detects: **JSON, JSONL, CSV, TSV, YAML, XML, SQL, Excel (XLSX)**
- Auto-detects delimiters (comma, tab, semicolon, pipe)
- Multi-sheet support for Excel and nested JSON

### Table
- Live search across all columns
- Click-to-sort headers (numeric-aware)
- Pagination (25 → 250 rows)
- Type-aware cell coloring: number, URL, email, date, boolean, JSON, empty
- Inline cell editing (double-click)
- Multi-row selection with bulk actions

### 📈 Charts (dependency-free SVG)
- Bar, horizontal bar, line, area, pie, donut, histogram, scatter
- Aggregation (sum / average / count) by label column
- Chart the filtered or selected rows only
- Export to **SVG** and **PNG**

###  Stats
- Summary cards: row count, column count, type, size
- Per column: type, unique, empty, min, max, sum, average

###  Convert
- Export: **CSV, TSV, JSON, JSONL, YAML, XML, SQL, Markdown, HTML**
- SQL with `CREATE TABLE` + auto type mapping
- Transforms: **Transpose**, **Deduplicate**, **Flatten JSON**

### 🌐 General
- Bilingual **Persian (RTL) / English (LTR)** — one click
- Dark / light theme
- Installable PWA with offline cache (Service Worker)
- **100% client-side** — your data never leaves the browser

## 🚀 Run locally

```bash
python -m http.server 8000
# or
npx serve .
# → http://localhost:8000
```

> Opening `index.html` directly works for normal use, but a server is needed for the Service Worker / offline mode.

## ️ Usage

1. Paste data, drop a file, or click **Sample**
2. The format is detected automatically (or pick one manually)
3. Hit **Parse** → you enter the workspace
4. Switch between **Table / Chart / Stats / Tools**
5. Download the output format you need

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `Ctrl + Enter` | Parse / render chart |
| `Ctrl + K` | Focus search |
| `Esc` | Back to import screen |

### Share data via URL
```
#data=<base64 of text>
```

##  Structure

```
├── index.html            # Main page + UI shell
├── manifest.json         # PWA manifest
├── sw.js                 # Service Worker (offline cache)
├── css/
│   └── style.css         # Styles + dark/light theme
├── js/
│   ├── parsers.js        # Detection + CSV/JSON/YAML/XML/SQL/XLSX parsers
│   ├── analyzer.js       # Column stats + output converters
│   ├── charts.js         # SVG renderer for 8 chart types
│   └── app.js            # UI logic + i18n + state
└── assets/               # PWA icons
```

## 🧠 How it works

```
Input text / file
      │
      ▼
Parsers.detect()   ─►  format
      │
      ▼
Parsers.parse()    ──►  { sheets: [{ name, columns, rows }] }
      │
      ▼
Analyze.asRecords() ─►  key-value records
      │
      ├─► Table  (sort / search / page / edit)
      ├─► Charts (SVG)
      ├─► Stats  (describe)
      └─► Convert (CSV/JSON/YAML/XML/SQL/…)
```

## 🔒 Privacy

Everything runs in the browser. No network request carries your data. The only external requests are the XLSX parser loaded from a CDN (on demand) and web fonts.

## ⚖️ License

MIT — built with ❤️

---

<!-- ==================================================================== -->
<!--                              PERSIAN                                 -->
<!-- ==================================================================== -->

<a id="-فارسی"></a>

<div dir="rtl">

# 🇮🇷 فارسی

**DataLens** یک ابزار تک‌صفحه‌ای و کاملاً کلاینت‌ساید برای کار با داده است. متن را پیست کن یا فایل را رها کن — خودش فرمت را تشخیص می‌دهد، به جدول قابل‌جستوجو تبدیل میکند، آمار ستون‌ها را می‌دهد، نمودار می‌کشد و به هر فرمتی خروجی میگیرد. **هیچ داده‌ای از مرورگر تو خارج نمی‌شود.**

🔗 **نسخه زنده:** https://mohsen-niksirat.github.io/DataLens/

## ✨ امکانات

### ورودی و تشخیص خودکار
- **پیست کردن** هر متن داده‌ای، یا **کشیدن و رها کردن** فایل در هر جای صفحه
- تشخیص خودکار: **JSON, JSONL, CSV, TSV, YAML, XML, SQL, Excel (XLSX)**
- تشخیص خودکار جداکننده (کاما، تب، نیم‌ویرگول، پایپ)
- پشتیبانی از چند شیت (Excel و JSON تودرتو)

###  جدول
- جست‌وجوی زنده در همه ستون‌ها
- مرتب‌سازی با کلیک روی سرستون (تشخیص عددی/متنی)
- صفحه‌بندی (۲۵ تا ۲۵۰ ردیف)
- رنگ‌آمیزی هوشمند سلول‌ها: عدد، URL، ایمیل، تاریخ، boolean، JSON، خالی
- ویرایش درجا با دابل‌کلیک
- انتخاب چندگانه و عملیات دسته‌ای

### 📈 نمودار (SVG بدون کتابخانه)
- میله‌ای، میله‌ای افقی، خطی، سطحی، دایره‌ای، دونات، هیستوگرام، پراکندگی
- تجمیع (جمع / میانگین / تعداد) بر اساس ستون برچسب
- رسم فقط از ردیف‌های فیلترشده یا انتخاب‌شده
- خروجی **SVG** و **PNG**

###  آمار
- کارت‌های خلاصه: تعداد سطر، تعداد ستون، نوع، حجم
- برای هر ستون: نوع، یکتا، خالی، کمینه، بیشینه، جمع، میانگین

### 🔄 تبدیل فرمت
- خروجی: **CSV, TSV, JSON, JSONL, YAML, XML, SQL, Markdown, HTML**
- SQL با `CREATE TABLE` و نوع‌گذاری خودکار
- حالت‌های Transform: **Transpose**، **Deduplicate**، **Flatten JSON**

### 🌐 عمومی
- دوزبانه **فارسی (RTL) / English (LTR)** — با یک کلیک
- تم تیره / روشن
- PWA نصب‌شدنی با کش آفلاین (Service Worker)
- **۱۰۰٪ کلاینت‌ساید** — داده‌ها هرگز از مرورگر خارج نمی‌شوند

## 🚀 اجرا به‌صورت محلی

```bash
python -m http.server 8000
# یا
npx serve .
# → http://localhost:8000
```

> باز کردن مستقیم `index.html` برای استفاده عادی کار می‌کند، اما برای Service Worker و حالت آفلاین به سرور نیاز است.

## ️ نحوه استفاده

۱. داده را پیست کن، فایل را رها کن، یا «نمونه» را بزن
۲. فرمت خودکار تشخیص داده می‌شود (یا خودت انتخاب کن)
۳. **بپرداز** → وارد فضای کاری می‌شوی
۴. بین تب‌های **جدول / نمودار / آمار / ابزار** جابه‌جا شو
۵. خروجی فرمت دلخواه را دانلود کن

### میان‌برهای کیبورد

| کلید | کار |
|------|-----|
| `Ctrl + Enter` | پردازش / رسم نمودار |
| `Ctrl + K` | فوکوس روی جستوجو |
| `Esc` | بازگشت به صفحهٔ ورودی |

### اشتراک‌گذاری داده از طریق URL
```
#data=<base64 از متن>
```

## 📁 ساختار

```
├── index.html            # صفحه اصلی + اسکلت UI
├── manifest.json         # PWA
├── sw.js                 # Service Worker (کش آفلاین)
├── css/
│   └── style.css         # استایل + تم تیره/روشن
├── js/
│   ├── parsers.js        # تشخیص + پارسر CSV/JSON/YAML/XML/SQL/XLSX
│   ├── analyzer.js       # آمار ستون‌ها + مبدل‌های خروجی
│   ├── charts.js         # رسم SVG برای ۸ نوع نمودار
│   └── app.js            # منطق UI + i18n + state
└── assets/               # آیکونهای PWA
```

## 🧠 چطور کار می‌کند

```
متن/فایل ورودی
      │
      ▼
Parsers.detect()   ─►  نوع فرمت
      │
      ▼
Parsers.parse()    ──►  { sheets: [{ name, columns, rows }] }
      │
      ▼
Analyze.asRecords() ─►  رکوردهای کلید-مقدار
      │
      ├─► جدول  (مرتب‌سازی / جست‌وجو / صفحه‌بندی / ویرایش)
      ├─► نمودار (SVG)
      ├─► آمار   (describe)
      └─► تبدیل  (CSV/JSON/YAML/XML/SQL/…)
```

## 🔒 حریم خصوصی

تمام پردازش در مرورگر انجام میشود. هیچ درخواست شبکه‌ای حامل داده‌های تو نیست. تنها درخواست‌های بیرونی، بارگذاری کتابخانهٔ XLSX از CDN (فقط در صورت نیاز) و فونت‌های وب است.

## ️ مجوز

MIT — ساخته شده با ❤️

</div>

---

<!-- ==================================================================== -->
<!--                              ARABIC                                  -->
<!-- ==================================================================== -->

<a id="-العربية"></a>

<div dir="rtl">

# 🇸🇦 العربية

**DataLens** أداة من صفحة واحدة تعمل بالكامل في المتصفح للتعامل مع البيانات. الصق النص أو أفلت ملفًا — سيتعرّف على الصيغة تلقائيًا، ويحوّلها إلى جدول قابل للبحث، ويحسب إحصاءات الأعمدة، ويرسم المخططات، ويصدّر إلى أي صيغة تقريبًا. **لا تغادر بياناتك متصفحك أبدًا.**

🔗 **النسخة المباشرة:** https://mohsen-niksirat.github.io/DataLens/

## ✨ الميزات

- **الصق** أي بيانات نصية، أو **اسحب وأفلت** ملفًا في أي مكان
- التعرف التلقائي على: **JSON, JSONL, CSV, TSV, YAML, XML, SQL, Excel (XLSX)**
- **جدول:** بحث فوري، فرز بالنقر على العنوان، ترقيم الصفحات، تلوين ذكي للخلايا، تحرير مباشر، تحديد متعدد
- **مخططات (SVG بدون مكتبات):** أعمدة، أعمدة أفقية، خطي، مساحي، دائري، دونات، مدرّج تكراري، مبعثر — مع تصدير SVG و PNG
- **إحصاءات:** لكل عمود النوع، القيم الفريدة، الفارغة، الأدنى، الأعلى، المجموع، المتوسط
- **تحويل الصيغ:** CSV, TSV, JSON, JSONL, YAML, XML, SQL, Markdown, HTML
- **أدوات:** Transpose، إزالة التكرار، Flatten JSON
- ثنائي اللغة **العربية/الإنجليزية/الفارسية**، سمة داكنة/فاتحة، PWA يعمل دون اتصال

##  التشغيل محليًا

```bash
python -m http.server 8000
# أو
npx serve .
```

## 🔒 الخصوصية

كل المعالجة تتم في المتصفح. لا يُرسل أي طلب شبكة يحمل بياناتك.

## ⚖️ الترخيص

MIT

</div>

---

<div align="center">

Made with ❤️ by [Mohsen Niksirat](https://github.com/mohsen-niksirat)

[⬆ Back to top](#-datalens)

</div>