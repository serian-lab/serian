import fs from "node:fs";
import path from "node:path";

const [jsonFile, outFile] = process.argv.slice(2);
if (!jsonFile || !outFile) {
  console.error("Usage: node scripts/save-cdp-screenshot.mjs <cdp-json> <output-png>");
  process.exit(1);
}

const json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
const data = json.data ?? json.result?.data;
if (!data) {
  console.error("No screenshot data in", jsonFile);
  process.exit(1);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, Buffer.from(data, "base64"));
console.log("Saved", outFile);
