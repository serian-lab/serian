/**
 * Audits hair-dryer-brush media assets against mediaKit definitions.
 * Run: node scripts/media-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicRoot = path.join(root, "public");

function existsPublic(urlPath) {
  const filePath = path.join(publicRoot, urlPath.replace(/^\//, ""));
  return fs.existsSync(filePath);
}

function collectPaths(obj, paths = new Set()) {
  if (!obj || typeof obj !== "object") {
    return paths;
  }

  if (typeof obj.src === "string") {
    paths.add(obj.src);
  }

  if (typeof obj.poster === "string") {
    paths.add(obj.poster);
  }

  if (typeof obj.fallbackSrc === "string") {
    paths.add(obj.fallbackSrc);
  }

  if (typeof obj.posterFallbackSrc === "string") {
    paths.add(obj.posterFallbackSrc);
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      value.forEach((item) => collectPaths(item, paths));
    } else if (value && typeof value === "object") {
      collectPaths(value, paths);
    }
  }

  return paths;
}

const mediaModule = await import(
  pathToFileURL(path.join(root, "content/products/hair-dryer-brush/media.ts")).href
);
const { mediaKit, lifestyleMedia, productMediaRegistry } = mediaModule;

const referenced = collectPaths({ mediaKit, lifestyle: lifestyleMedia });
const referencedList = [...referenced].sort();

const found = [];
const missing = [];

for (const src of referencedList) {
  if (existsPublic(src)) {
    found.push(src);
  } else {
    missing.push(src);
  }
}

const publicDir = path.join(publicRoot, "products/hair-dryer-brush");
const allFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      allFiles.push("/" + path.relative(publicRoot, full).replace(/\\/g, "/"));
    }
  }
}

walk(publicDir);

const unused = allFiles.filter(
  (file) =>
    !referencedList.includes(file) &&
    !file.endsWith(".svg") &&
    (file.endsWith(".png") || file.endsWith(".mp4") || file.endsWith(".webp") || file.endsWith(".jpg")),
);

const duplicateGroups = {};
for (const file of allFiles.filter((f) => f.endsWith(".png") || f.endsWith(".mp4"))) {
  const abs = path.join(publicRoot, file.slice(1));
  const size = fs.statSync(abs).size;
  duplicateGroups[size] = duplicateGroups[size] || [];
  duplicateGroups[size].push(file);
}

const duplicates = Object.values(duplicateGroups).filter((group) => group.length > 1);

const report = {
  summary: {
    referenced: referencedList.length,
    found: found.length,
    missing: missing.length,
    unusedRasterOrVideo: unused.length,
    lifestyleRegistered: lifestyleMedia.length,
  },
  categories: {
    heroImages: mediaKit.hero.images.length,
    featureImages: mediaKit.features.filter((f) => f.image).length,
    beforeAfter: mediaKit.beforeAfter?.pairs.length ?? 0,
    demoVideo: mediaKit.demo ? 1 : 0,
    ugcVideos: mediaKit.ugc?.items.length ?? 0,
    lifestyleImages: lifestyleMedia.length,
    packaging: mediaKit.assets?.packaging ? 1 : 0,
  },
  missing,
  unused,
  duplicates,
};

const outDir = path.join(root, "docs/reports");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "milestone-15-media-audit.json"),
  JSON.stringify(report, null, 2),
);

console.log(JSON.stringify(report.summary, null, 2));
if (missing.length) {
  console.log("\nMissing:");
  missing.forEach((m) => console.log(" -", m));
}
if (unused.length) {
  console.log("\nUnused raster/video:");
  unused.forEach((u) => console.log(" -", u));
}
