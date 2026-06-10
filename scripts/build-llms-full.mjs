import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.join(__dirname, '../content/en');
const DOCS_SITE = 'https://docs.omniscout.xyz';
const OUT_FILE = path.join(__dirname, '../public/llms-full.txt');

const SLUG_TO_PATH = {
  'index.md': '/',
  '1.cli/index.md': '/cli/',
  '1.cli/1.overview.md': '/cli/overview/',
  '1.cli/2.agents.md': '/cli/agents/',
  '1.cli/3.examples.md': '/cli/examples/',
  '1.cli/4.commands.md': '/cli/commands/',
  '1.cli/5.architecture.md': '/cli/architecture/',
  '1.cli/6.roadmap.md': '/cli/roadmap/',
  '1.cli/7.troubleshooting.md': '/cli/troubleshooting/',
  '2.sdk/index.md': '/sdk/',
  '2.sdk/1.api.md': '/sdk/api/',
};

function stripFrontmatter(content) {
  if (!content.startsWith('---')) return content;
  const end = content.indexOf('---', 3);
  if (end === -1) return content;
  return content.slice(end + 3).replace(/^\s*\n/, '');
}

async function walk(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full, rel)));
    } else if (/\.(md|mdx)$/.test(entry.name) && !entry.name.startsWith('.')) {
      files.push(rel);
    }
  }

  return files.sort();
}

async function main() {
  const files = await walk(DOCS_ROOT);
  const sections = [
    `# OmniScout Docs (full text)`,
    ``,
    `Site: ${DOCS_SITE}`,
    `Generated for LLM crawlers. Prefer /llms.txt for the index.`,
    ``,
  ];

  for (const rel of files) {
    const urlPath = SLUG_TO_PATH[rel];
    if (!urlPath) continue;
    const raw = await readFile(path.join(DOCS_ROOT, rel), 'utf8');
    const body = stripFrontmatter(raw);
    sections.push(`---`, `URL: ${DOCS_SITE}${urlPath}`, `Source: content/en/${rel}`, `---`, body.trim(), ``);
  }

  await writeFile(OUT_FILE, sections.join('\n') + '\n');
  console.log(`Wrote ${OUT_FILE} (${files.length} source files, ${sections.length} lines)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
