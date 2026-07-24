/**
 * Visual enhancement helpers for long-form HTML.
 * Preserves all visible text while wrapping suitable blocks in design components.
 */

function findH2Range(html: string, idHint: string): { start: number; end: number; innerStart: number } | null {
  const re = new RegExp(`<h2\\s+id="${idHint}"[^>]*>[\\s\\S]*?<\\/h2>`, "i");
  const match = re.exec(html);
  if (!match || match.index === undefined) return null;
  const start = match.index;
  const innerStart = start + match[0].length;
  const next = html.slice(innerStart).search(/<h2\s/i);
  const end = next === -1 ? html.length : innerStart + next;
  return { start, end, innerStart };
}

function wrapH3BlocksAsCards(sectionHtml: string): string {
  const h3Re = /<h3\b[^>]*>[\s\S]*?<\/h3>/gi;
  const matches = [...sectionHtml.matchAll(h3Re)];
  if (matches.length < 2) return sectionHtml;

  const firstH3 = matches[0].index ?? 0;
  const preface = sectionHtml.slice(0, firstH3);
  const rest = sectionHtml.slice(firstH3);

  const blocks: string[] = [];
  let cursor = 0;
  const restMatches = [...rest.matchAll(h3Re)];
  for (let i = 0; i < restMatches.length; i++) {
    const m = restMatches[i];
    const start = m.index ?? 0;
    const nextStart =
      i + 1 < restMatches.length ? (restMatches[i + 1].index ?? rest.length) : rest.length;
    if (start > cursor) {
      // unexpected gap
    }
    const block = rest.slice(start, nextStart).trim();
    if (block) {
      blocks.push(`<article class="content-card">${block}</article>`);
    }
    cursor = nextStart;
  }

  return `${preface}<div class="content-card-grid">${blocks.join("\n")}</div>`;
}

function styleInfoLists(html: string): string {
  // Turn standalone lists that follow intro phrases into tip boxes when long enough
  return html.replace(
    /(<p>(?:[^<]*(?:safety|checklist|requirements|prepare|practices|value:)[^<]*)<\/p>\s*)(<ul>[\s\S]*?<\/ul>)/gi,
    '$1<div class="info-box">$2</div>',
  );
}

function styleProblemSections(html: string): string {
  // Common problem H3 groups under Common Download Issues / Common Login Issues
  const ids = [
    "common-download-issues",
    "common-login-issues-and-solutions",
  ];
  let out = html;
  for (const id of ids) {
    const range = findH2Range(out, id);
    if (!range) continue;
    const before = out.slice(0, range.innerStart);
    const section = out.slice(range.innerStart, range.end);
    const after = out.slice(range.end);
    out = before + wrapH3BlocksAsCards(section) + after;
  }
  return out;
}

export function enhanceArticleHtml(html: string): string {
  let out = html;

  const cardSections = [
    "main-features",
    "games-available",
    "apk-requirements",
    "deposit-safety-tips",
    "withdrawal-safety-tips",
    "account-safety-and-privacy-tips",
    "protecting-your-account",
  ];

  for (const id of cardSections) {
    const range = findH2Range(out, id);
    if (!range) continue;
    const before = out.slice(0, range.innerStart);
    const section = out.slice(range.innerStart, range.end);
    const after = out.slice(range.end);
    // Only card-wrap when multiple h3s exist
    const enhanced = /<h3\b/i.test(section) && (section.match(/<h3\b/gi)?.length || 0) >= 2
      ? wrapH3BlocksAsCards(section)
      : section.includes("<ul>")
        ? `<div class="info-box">${section}</div>`
        : section;
    out = before + enhanced + after;
  }

  out = styleProblemSections(out);
  out = styleInfoLists(out);

  // Style overview tables as info panels
  out = out.replace(
    /<div class="table-wrap">/g,
    '<div class="table-wrap info-table">',
  );

  return out;
}

export function splitAfterHeading(
  html: string,
  headingId: string,
): { before: string; after: string } | null {
  const range = findH2Range(html, headingId);
  if (!range) return null;
  return {
    before: html.slice(0, range.end),
    after: html.slice(range.end),
  };
}

export function stripFaqFromHtml(html: string): string {
  const faqMatch = html.match(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i);
  if (!faqMatch || faqMatch.index === undefined) {
    return html.replace(/<div class="faq-list">[\s\S]*?<\/div>/i, "").trim();
  }
  let without = html.slice(0, faqMatch.index);
  const rest = html.slice(faqMatch.index);
  const finalMatch = rest.match(/<h2[^>]*>\s*Final Thoughts\s*<\/h2>/i);
  if (finalMatch && finalMatch.index !== undefined) {
    without += rest.slice(finalMatch.index);
  }
  return without.replace(/<div class="faq-list">[\s\S]*?<\/div>/i, "").trim();
}

export function extractFinalThoughts(html: string): { body: string; finalHtml: string } {
  const match = html.match(/<h2[^>]*>\s*Final Thoughts\s*<\/h2>/i);
  if (!match || match.index === undefined) {
    return { body: html, finalHtml: "" };
  }
  return {
    body: html.slice(0, match.index).trim(),
    finalHtml: html.slice(match.index).trim(),
  };
}
