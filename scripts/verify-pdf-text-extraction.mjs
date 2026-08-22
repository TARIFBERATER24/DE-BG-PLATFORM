import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const fixturePath = "/home/ubuntu/document-storage-test.pdf";
const bytes = await readFile(fixturePath);
const parser = new PDFParse({ data: bytes });

try {
  const result = await parser.getText();
  const text = result.text.replace(/\s+/g, " ").trim();
  console.log(`PDF_TEXT_EXTRACTION_OK=${text.length > 0 ? "YES" : "NO"}`);
  console.log(`PDF_TEXT_LENGTH=${text.length}`);
} finally {
  await parser.destroy();
}
