import fs from "fs";
import path from "path";

export type FaqItem = { question: string; answer: string };
export type TocItem = { id: string; text: string };
export type ParsedContent = {
  title?: string;
  description?: string;
  focusKeyword?: string;
  h1: string;
  html: string;
  introHtml: string;
  bodyHtml: string;
  mainHtml: string;
  faqHtml: string;
  faqs: FaqItem[];
  toc: TocItem[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text: string): string {
  let t = escapeHtml(text);
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return t;
}

function isListCandidate(line: string): boolean {
  const t = line.trim();
  if (!t || t.startsWith("#") || t.startsWith("|") || t.startsWith("---")) return false;
  if (t.length > 90) return false;
  if (/[.!?]$/.test(t) && t.length > 40) return false;
  if (/^(The |This |Users |A |An |Open |After |Before |When |Where |Always |Never |Do |Check |Follow |Wait |Keep |Save |Tap |Select |Enter |Type |Confirm |Review |Return |Use |Avoid |Make |Read |Contact |Prepare |Log |Sign |Create |Choose |Provide |Send |Copy |Take |Stop |Refresh |Restart |Close |Remove |Delete |Update |Install |Download |Switch |Request |Report |Share |Hide |Publish |Rely |Store |Block )/i.test(t) && t.length > 50) {
    return false;
  }
  return true;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const meta: Record<string, string> = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^(\w+):\s*"(.*)"\s*$/) || line.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2];
  }
  return { meta, body };
}

export function markdownToStructuredHtml(markdown: string): {
  h1: string;
  html: string;
  introHtml: string;
  bodyHtml: string;
  mainHtml: string;
  faqHtml: string;
  faqs: FaqItem[];
  toc: TocItem[];
} {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlParts: string[] = [];
  const toc: TocItem[] = [];
  const faqs: FaqItem[] = [];
  let h1 = "";
  let inFaq = false;
  let currentFaq: FaqItem | null = null;
  const usedIds = new Set<string>();
  let i = 0;

  const uniqueId = (text: string) => {
    let id = slugify(text) || "section";
    const base = id;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${base}-${n++}`;
    }
    usedIds.add(id);
    return id;
  };

  const flushFaq = () => {
    if (currentFaq && currentFaq.answer.trim()) {
      faqs.push({
        question: currentFaq.question,
        answer: currentFaq.answer.trim(),
      });
    }
    currentFaq = null;
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith("|") && i + 1 < lines.length && /^\|?\s*-+/.test(lines[i + 1].trim())) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowLine = lines[i].trim();
        if (!/^\|?\s*-+/.test(rowLine.replace(/\|/g, "").trim()) && !/^[\|\s\-:]+$/.test(rowLine)) {
          const cells = rowLine
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
          rows.push(cells);
        }
        i++;
      }
      if (rows.length) {
        const [header, ...body] = rows;
        let table = '<div class="table-wrap"><table><thead><tr>';
        for (const cell of header) table += `<th>${inline(cell)}</th>`;
        table += "</tr></thead><tbody>";
        for (const row of body) {
          table += "<tr>";
          for (const cell of row) table += `<td>${inline(cell)}</td>`;
          table += "</tr>";
        }
        table += "</tbody></table></div>";
        htmlParts.push(table);
        if (currentFaq) currentFaq.answer += " " + body.map((r) => r.join(": ")).join("; ");
      }
      continue;
    }

    const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      const text = hMatch[2].trim();
      if (level === 1) {
        flushFaq();
        inFaq = false;
        h1 = text;
        htmlParts.push(`<h1 id="${uniqueId(text)}">${inline(text)}</h1>`);
      } else if (level === 2) {
        flushFaq();
        inFaq = text.toLowerCase().includes("frequently asked questions");
        const id = uniqueId(text);
        toc.push({ id, text });
        htmlParts.push(`<h2 id="${id}">${inline(text)}</h2>`);
      } else if (level === 3) {
        if (inFaq) {
          flushFaq();
          currentFaq = { question: text, answer: "" };
          const id = uniqueId(text);
          htmlParts.push(`<h3 id="${id}">${inline(text)}</h3>`);
        } else {
          flushFaq();
          const id = uniqueId(text);
          htmlParts.push(`<h3 id="${id}">${inline(text)}</h3>`);
        }
      } else {
        htmlParts.push(`<h4>${inline(text)}</h4>`);
      }
      i++;
      continue;
    }

    // Detect consecutive list candidates
    if (isListCandidate(trimmed)) {
      const items: string[] = [];
      let j = i;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (!t) break;
        if (t.startsWith("#") || t.startsWith("|")) break;
        if (!isListCandidate(t)) break;
        items.push(t);
        j++;
      }
      if (items.length >= 3) {
        htmlParts.push(
          `<ul>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`,
        );
        if (currentFaq) {
          currentFaq.answer += " " + items.join("; ");
        }
        i = j;
        continue;
      }
    }

    // Numbered step lines already handled as headings mostly; paragraphs
    htmlParts.push(`<p>${inline(trimmed)}</p>`);
    if (currentFaq) {
      currentFaq.answer += (currentFaq.answer ? " " : "") + trimmed;
    }
    i++;
  }
  flushFaq();

  const html = htmlParts.join("\n");
  // Split intro (after h1 until first h2) and body (from first h2)
  const firstH2 = html.indexOf("<h2 ");
  let introHtml = "";
  let bodyHtml = html;
  if (firstH2 !== -1) {
    const afterH1 = html.indexOf("</h1>");
    introHtml = afterH1 !== -1 ? html.slice(afterH1 + 5, firstH2).trim() : "";
    bodyHtml = html.slice(firstH2).trim();
  } else {
    const afterH1 = html.indexOf("</h1>");
    introHtml = afterH1 !== -1 ? html.slice(afterH1 + 5).trim() : html;
    bodyHtml = "";
  }

  const faqMatch = bodyHtml.match(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i);
  let mainHtml = bodyHtml;
  let faqHtml = "";
  if (faqMatch && faqMatch.index !== undefined) {
    mainHtml = bodyHtml.slice(0, faqMatch.index).trim();
    faqHtml = bodyHtml.slice(faqMatch.index).trim();
    // Keep Final Thoughts with FAQ block if present; move Final Thoughts back to main when possible
    const finalMatch = faqHtml.match(/<h2[^>]*>\s*Final Thoughts\s*<\/h2>/i);
    if (finalMatch && finalMatch.index !== undefined) {
      mainHtml = `${mainHtml}\n${faqHtml.slice(finalMatch.index)}`.trim();
      faqHtml = faqHtml.slice(0, finalMatch.index).trim();
    }
  }

  return { h1, html, introHtml, bodyHtml, mainHtml, faqHtml, faqs, toc };
}

export function loadContent(slug: string): ParsedContent {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  const structured = markdownToStructuredHtml(body);
  return {
    title: meta.title,
    description: meta.description,
    focusKeyword: meta.focusKeyword,
    ...structured,
  };
}
