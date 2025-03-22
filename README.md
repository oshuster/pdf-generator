# 📄 @oshuster/pdf-generator

A lightweight utility library for generating PDF files from HTML using [Playwright](https://playwright.dev/), with support for style caching and page pooling.

---

## 🚀 Features

- Generate PDF from raw HTML
- Inject custom CSS styles for documents by name or type
- Reuse pages with an internal page pool
- Designed for use in gRPC or other service backends

---

## 📦 Installation

```bash
npm install @oshuster/pdf-generator --registry=https://npm.pkg.github.com/
```

Or using pnpm:

```bash
pnpm add @oshuster/pdf-generator
```

## 🧩 Exports

```javascript
import {
  browserLauncher,
  closeBrowser,
  getPage,
  releasePage,
  loadStylesIntoCache,
  generateDocumentPdfFromHtml,
  generatePdfFromHtml,
} from '@oshuster/pdf-generator';
```

## ⚙️ Usage

1. Initialize browser and load styles (once on startup)

```javascript
await browserLauncher();
await loadStylesIntoCache('/path/to/styles/documents');
await loadStylesIntoCache('/path/to/styles/all-pdf-styles');
```

2. Generate PDF using document name(s)

```javascript
const page = await getPage();

const buffer = await generateDocumentPdfFromHtml({
  html: '<html><body>Hello World</body></html>',
  docName: ['F0103308'],
  landscape: false,
  page,
});

releasePage(page);
```

3. Generate PDF using a document type (e.g., 0.css, 1.css)

```javascript
const page = await getPage();

const buffer = await generatePdfFromHtml({
  html: '<html><body>Another document</body></html>',
  docType: 0,
  landscape: true,
  page,
});

releasePage(page);
```

## 🧾 Types

`DocPdfRequestWithPage`

```javascript
{
  html: string;
  docName: string[];
  landscape?: boolean;
  page: Page;
}
```

`UniPdfRequestWithPage`

```javascript
{
  html: string;
  docType: number;
  landscape?: boolean;
  page: Page;
}
```

## 🧼 Cleanup

Be sure to close the browser on shutdown:

```javascript
await closeBrowser();
```

## 🔧 Notes

- Environment variable MAX_PAGES can be used to control the internal page pool size (default: 5)

- Works best in backend environments with headless Chromium

## 🛠 Dependencies

- [Playwright](https://playwright.dev/)
- Node.js 18+

## 📄 License

### MIT

Developed by [@oshuster](https://github.com/oshuster)
