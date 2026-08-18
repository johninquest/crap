import fs from "fs";
import path from "path";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  author: string;
  ctaCheck?: "gdpr" | "nis2" | "ai" | "risk" | "insurance" | "rules";
  takeaways?: string[];
  readingTimeMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  htmlContent: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Simple, fast YAML frontmatter parser for blog markdown files
 */
function parseFrontmatter(fileContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const data: Record<string, unknown> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentArrayKey: string | null = null;
  let currentArray: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentArrayKey) {
      const itemVal = trimmed.slice(2).replace(/^["']|["']$/g, "").trim();
      currentArray.push(itemVal);
      continue;
    }

    if (currentArrayKey) {
      data[currentArrayKey] = currentArray;
      currentArrayKey = null;
      currentArray = [];
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const rawValue = line.slice(colonIndex + 1).trim();

      if (rawValue === "") {
        currentArrayKey = key;
        currentArray = [];
      } else {
        const cleanVal = rawValue.replace(/^["']|["']$/g, "").trim();
        data[key] = cleanVal;
      }
    }
  }

  if (currentArrayKey) {
    data[currentArrayKey] = currentArray;
  }

  return { data, content };
}

/**
 * Calculates estimated reading time assuming ~200 words per minute.
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Minimal, secure Markdown to HTML renderer tailored for blog articles.
 * Supports headings, blockquotes, code blocks, lists, links, strong, and emphasis.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Escape HTML entities to prevent raw injection
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks: ```language ... ```
  html = html.replace(/```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="my-6 p-4 rounded-xl bg-surface border border-border overflow-x-auto text-sm text-text font-mono"><code>${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-muted text-sm font-mono text-primary">$1</code>');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-text mt-8 mb-3 tracking-tight">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl sm:text-2xl font-bold text-text mt-10 mb-4 tracking-tight">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl sm:text-3xl font-bold text-text mt-12 mb-6 tracking-tight">$1</h1>');

  // Blockquotes: > quote
  html = html.replace(/^\&gt;\s?(.*$)/gim, '<blockquote class="my-5 pl-4 border-l-4 border-primary text-text-muted italic bg-primary-soft/30 py-2 pr-3 rounded-r-lg">$1</blockquote>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-text">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-text-muted">$1</em>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline underline-offset-2 font-medium" target="_blank" rel="noopener noreferrer">$1</a>');

  // Process lists and paragraphs
  const rawBlocks = html.split(/\r?\n\r?\n/);
  const processedBlocks = rawBlocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    if (
      trimmed.startsWith("<h1") ||
      trimmed.startsWith("<h2") ||
      trimmed.startsWith("<h3") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<blockquote")
    ) {
      return trimmed;
    }

    // Unordered lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed
        .split(/\r?\n/)
        .filter((line) => line.trim().startsWith("- ") || line.trim().startsWith("* "))
        .map((line) => {
          const content = line.trim().slice(2).trim();
          return `<li class="ml-4 pl-1 mb-2 text-text leading-relaxed">${content}</li>`;
        })
        .join("");
      return `<ul class="my-4 list-disc list-outside pl-4 space-y-1">${items}</ul>`;
    }

    // Ordered lists
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed
        .split(/\r?\n/)
        .filter((line) => /^\d+\.\s/.test(line.trim()))
        .map((line) => {
          const content = line.trim().replace(/^\d+\.\s+/, "").trim();
          return `<li class="ml-4 pl-1 mb-2 text-text leading-relaxed">${content}</li>`;
        })
        .join("");
      return `<ol class="my-4 list-decimal list-outside pl-4 space-y-1">${items}</ol>`;
    }

    // Standard paragraph
    return `<p class="my-4 text-text leading-relaxed">${trimmed.replace(/\r?\n/g, " ")}</p>`;
  });

  return processedBlocks.filter(Boolean).join("\n");
}

/**
 * Returns metadata of all published blog posts sorted by date descending.
 */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_DIR);
  const posts: BlogPostMeta[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md")) continue;
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(BLOG_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(fileContents);

    if (data.draft === true || data.draft === "true") continue;

    posts.push({
      slug,
      title: String(data.title || slug),
      description: String(data.description || ""),
      date: String(data.date || new Date().toISOString().slice(0, 10)),
      lastModified: data.lastModified ? String(data.lastModified) : undefined,
      author: String(data.author || "CyberChecklist"),
      ctaCheck: data.ctaCheck as BlogPostMeta["ctaCheck"],
      takeaways: Array.isArray(data.takeaways) ? (data.takeaways as string[]) : undefined,
      readingTimeMinutes: calculateReadingTime(content),
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns full blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontmatter(fileContents);

  if (data.draft === true || data.draft === "true") {
    return null;
  }

  const htmlContent = markdownToHtml(content);

  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ""),
    date: String(data.date || new Date().toISOString().slice(0, 10)),
    lastModified: data.lastModified ? String(data.lastModified) : undefined,
    author: String(data.author || "CyberChecklist"),
    ctaCheck: data.ctaCheck as BlogPostMeta["ctaCheck"],
    takeaways: Array.isArray(data.takeaways) ? (data.takeaways as string[]) : undefined,
    readingTimeMinutes: calculateReadingTime(content),
    content,
    htmlContent,
  };
}
