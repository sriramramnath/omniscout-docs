import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.join(__dirname, '../src/content/docs');
const DOCS_SITE = 'https://docs.omniscout.xyz';
const OUT_FILE = path.join(__dirname, '../public/llms-full.txt');

const SLUG_TO_PATH = {
	'index.mdx': '/',
	'cli/index.md': '/cli/',
	'cli/overview.md': '/cli/overview/',
	'cli/agents.mdx': '/cli/agents/',
	'cli/examples.md': '/cli/examples/',
	'cli/commands.md': '/cli/commands/',
	'cli/architecture.md': '/cli/architecture/',
	'cli/roadmap.md': '/cli/roadmap/',
	'cli/troubleshooting.md': '/cli/troubleshooting/',
	'sdk/index.md': '/sdk/',
	'sdk/api.md': '/sdk/api/',
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
		} else if (/\.(md|mdx)$/.test(entry.name)) {
			files.push(rel);
		}
	}

	return files.sort();
}

async function main() {
	const files = await walk(DOCS_ROOT);
	const sections = [
		'# OmniScout Docs — full context',
		'',
		`> Generated from source. Site: ${DOCS_SITE}`,
		'',
	];

	for (const rel of files) {
		const urlPath = SLUG_TO_PATH[rel] ?? `/${rel.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '/')}/`;
		const raw = await readFile(path.join(DOCS_ROOT, rel), 'utf8');
		const body = stripFrontmatter(raw).trim();

		sections.push('---');
		sections.push('');
		sections.push(`## ${DOCS_SITE}${urlPath}`);
		sections.push('');
		sections.push(body);
		sections.push('');
	}

	await writeFile(OUT_FILE, `${sections.join('\n').trim()}\n`, 'utf8');
	console.log(`Wrote ${OUT_FILE} (${files.length} pages)`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
