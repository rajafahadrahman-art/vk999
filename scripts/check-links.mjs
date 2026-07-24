import fs from "fs";
import path from "path";

const root = process.cwd();
const validRoutes = new Set([
  "/",
  "/vk999-download/",
  "/vk999-login/",
  "/vk999-deposit-guide/",
  "/vk999-withdrawal-guide/",
  "/about-us/",
  "/contact-us/",
  "/privacy-policy/",
  "/disclaimer/",
  "/terms-and-conditions/",
  "/responsible-gaming/",
]);

const redirectSources = new Set([
  "/download/",
  "/login/",
  "/vk999-deposit/",
  "/vk999-withdrawal/",
]);

const forbidden = ["/download/", "/login/", "/vk999-deposit/", "/vk999-withdrawal/"];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git"
    ) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx|ts|md|mjs|js|css)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const hrefRegex = /href=["']([^"']+)["']/g;
const mdLinkRegex = /\]\((\/[^)]+)\)/g;
const errors = [];
const checked = [];

for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  for (const match of text.matchAll(hrefRegex)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/#") || href.startsWith("/images/") || href === "/favicon.ico") continue;
    if (href.startsWith("/icon") || href.startsWith("/apple-icon")) continue;
    const pathOnly = href.split("#")[0].split("?")[0];
    if (!pathOnly) continue;
    checked.push({ file: rel, href: pathOnly });

    if (forbidden.includes(pathOnly)) {
      errors.push(`${rel}: outdated path ${pathOnly}`);
      continue;
    }
    if (redirectSources.has(pathOnly)) {
      errors.push(`${rel}: should use destination permalink instead of ${pathOnly}`);
      continue;
    }
    if (pathOnly.startsWith("/_next")) continue;
    if (!validRoutes.has(pathOnly) && !pathOnly.match(/^\/images\//)) {
      // allow hash-only handled above; unknown internal route
      if (!pathOnly.includes(".")) {
        errors.push(`${rel}: unknown internal route ${pathOnly}`);
      }
    }
  }

  for (const match of text.matchAll(mdLinkRegex)) {
    const href = match[1].split("#")[0].split("?")[0];
    checked.push({ file: rel, href });
    if (forbidden.includes(href)) errors.push(`${rel}: outdated markdown link ${href}`);
    else if (!validRoutes.has(href)) errors.push(`${rel}: unknown markdown link ${href}`);
  }
}

// Required images
const images = [
  "public/images/vk999-logo.webp",
  "public/images/vk999-homepage-promo-banner.webp",
  "public/images/vk999-homepage-featured-image.webp",
  "public/images/vk999-download-banner.webp",
  "public/images/vk999-login-banner.webp",
  "public/images/vk999-deposit-banner.webp",
  "public/images/vk999-withdrawal-banner.webp",
  "public/favicon.ico",
  "app/icon.png",
  "app/apple-icon.png",
];

for (const img of images) {
  if (!fs.existsSync(path.join(root, img))) errors.push(`Missing image/file: ${img}`);
}

console.log(`Checked ${checked.length} internal href occurrences.`);
if (errors.length) {
  console.error("Link check failed:");
  for (const err of errors) console.error(` - ${err}`);
  process.exit(1);
}
console.log("Link check passed.");
