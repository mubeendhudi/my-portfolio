/* Writes the portfolio content from js/data.js straight into index.html, so search engines,
   AI crawlers and link previews get the full page without running JavaScript.

   Run after editing js/data.js:   node scripts/prerender.js
   Netlify also runs it on every deploy (see netlify.toml). No dependencies needed. */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const P = require(path.join(root, "js/data.js"));
const Render = require(path.join(root, "js/render.js"));
const file = path.join(root, "index.html");

let html = fs.readFileSync(file, "utf8");
const missing = [];

/* Content slots: <tag id="x"><!--#x-->...<!--/#x--></tag> */
for (const [id, content] of Object.entries(Render.sections(P))) {
  const slot = new RegExp(`<!--#${id}-->[\\s\\S]*?<!--/#${id}-->`);
  if (!slot.test(html)) { missing.push(id); continue; }
  html = html.replace(slot, () => `<!--#${id}-->${content}<!--/#${id}-->`);
}

/* Attributes that come from data.js */
const attr = (id, name, value) => {
  const tag = new RegExp(`(<[^>]*\\bid="${id}"[^>]*\\b${name}=")[^"]*(")`);
  if (!tag.test(html)) { missing.push(`${id}[${name}]`); return; }
  html = html.replace(tag, (_, a, b) => a + Render.esc(value) + b);
};
attr("cv-link", "href", encodeURI(P.contact.cv));
attr("photo", "src", P.photo);
attr("photo", "alt", `Portrait of ${P.name}`);

/* Structured data */
const ld = /(<script type="application\/ld\+json" id="jsonld">)[\s\S]*?(<\/script>)/;
if (ld.test(html)) html = html.replace(ld, (_, a, b) => `${a}\n${Render.jsonLd(P)}\n  ${b}`);
else missing.push("jsonld");

fs.writeFileSync(file, html);
if (missing.length) {
  console.error(`prerender: slots not found in index.html: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("prerender: index.html updated from js/data.js");
