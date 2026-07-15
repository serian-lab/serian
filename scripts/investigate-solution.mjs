/** Temporary investigation script — not part of production build. */
const url = "http://localhost:3000/products/hair-dryer-brush";

const html = await fetch(url).then((r) => r.text());
const solutionMatch = html.match(/id="solution"[\s\S]*?<\/section>/);

if (!solutionMatch) {
  console.log("NO #solution section in SSR HTML");
  process.exit(1);
}

const section = solutionMatch[0];

console.log("=== Phase 1/2: SSR HTML in #solution ===");
console.log("Section length:", section.length);
console.log("product-section-header:", (section.match(/product-section-header/g) ?? []).length);
console.log("product-section-intro:", (section.match(/product-section-intro/g) ?? []).length);
console.log("product-item-card:", (section.match(/product-item-card/g) ?? []).length);
console.log("product-solution-media:", (section.match(/product-solution-media/g) ?? []).length);
console.log("Headline:", section.includes("Dry and guide each section"));
console.log("Intro:", section.includes("warm air through a shaped barrel"));
console.log("Card1:", section.includes("Airflow follows the barrel"));
console.log("Card2:", section.includes("One continuous pass"));
console.log("Card3:", section.includes("Built for everyday use"));
