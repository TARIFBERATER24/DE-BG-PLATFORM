import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const fixturePath = "/home/ubuntu/document-storage-test.pdf";
const bytes = await readFile(fixturePath);
const document = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
const pages = [];

try {
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
  }
} finally {
  await document.destroy();
}

const text = pages.join(" ").replace(/\s+/g, " ").trim();
console.log(`PDF_TEXT_EXTRACTION_OK=${text.length > 0 ? "YES" : "NO"}`);
console.log(`PDF_TEXT_LENGTH=${text.length}`);
