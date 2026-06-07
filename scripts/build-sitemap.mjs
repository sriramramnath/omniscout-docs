import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_SITE = 'https://docs.omniscout.xyz';
const DIST_DIR = path.join(__dirname, '../dist');
const CONTENT_ROOT = path.join(__dirname, '../src/content/docs');

/** Public path → source file (for lastmod from mtime). */
const PAGES = [
	{ url: '/', file: 'index.mdx', changefreq: 'weekly', priority: '1.0' },
	{ url: '/cli/', file: 'cli/index.md', changefreq: 'monthly', priority: '0.7' },
	{ url: '/cli/overview/', file: 'cli/overview.md', changefreq: 'weekly', priority: '0.9' },
	{ url: '/cli/agents/', file: 'cli/agents.mdx', changefreq: 'weekly', priority: '0.9' },
	{ url: '/cli/examples/', file: 'cli/examples.md', changefreq: 'monthly', priority: '0.8' },
	{ url: '/cli/commands/', file: 'cli/commands.md', changefreq: 'monthly', priority: '0.8' },
	{ url: '/cli/architecture/', file: 'cli/architecture.md', changefreq: 'monthly', priority: '0.7' },
	{ url: '/cli/roadmap/', file: 'cli/roadmap.md', changefreq: 'monthly', priority: '0.6' },
	{ url: '/cli/troubleshooting/', file: 'cli/troubleshooting.md', changefreq: 'monthly', priority: '0.7' },
	{ url: '/sdk/', file: 'sdk/index.md', changefreq: 'monthly', priority: '0.8' },
	{ url: '/sdk/api/', file: 'sdk/api.md', changefreq: 'monthly', priority: '0.8' },
];

const STATIC_PAGES = [
	{ url: '/llms.txt', changefreq: 'weekly', priority: '0.5' },
	{ url: '/llms-full.txt', changefreq: 'weekly', priority: '0.4' },
];

async function lastmodForFile(relFile) {
	try {
		const { mtime } = await stat(path.join(CONTENT_ROOT, relFile));
		return mtime.toISOString().slice(0, 10);
	} catch {
		return new Date().toISOString().slice(0, 10);
	}
}

async function lastmodForPublic(relFile) {
	try {
		const { mtime } = await stat(path.join(__dirname, '../public', relFile));
		return mtime.toISOString().slice(0, 10);
	} catch {
		return new Date().toISOString().slice(0, 10);
	}
}

function escapeXml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function urlEntry(loc, lastmod, changefreq, priority) {
	return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function buildSitemapXml() {
	const entries = [];

	for (const page of PAGES) {
		const lastmod = await lastmodForFile(page.file);
		entries.push(
			urlEntry(`${DOCS_SITE}${page.url}`, lastmod, page.changefreq, page.priority),
		);
	}

	for (const page of STATIC_PAGES) {
		const lastmod = await lastmodForPublic(page.url.slice(1));
		entries.push(
			urlEntry(`${DOCS_SITE}${page.url}`, lastmod, page.changefreq, page.priority),
		);
	}

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
}

async function main() {
	const xml = await buildSitemapXml();
	const outPath = path.join(DIST_DIR, 'sitemap.xml');
	await writeFile(outPath, xml, 'utf8');

	// Keep robots.txt in dist aligned with the flat sitemap.
	const robotsPath = path.join(DIST_DIR, 'robots.txt');
	try {
		const robots = await readFile(robotsPath, 'utf8');
		const updated = robots.replace(
			/Sitemap: .+/,
			`Sitemap: ${DOCS_SITE}/sitemap.xml`,
		);
		await writeFile(robotsPath, updated, 'utf8');
	} catch {
		await writeFile(
			robotsPath,
			`User-agent: *\nAllow: /\n\nSitemap: ${DOCS_SITE}/sitemap.xml\n`,
			'utf8',
		);
	}

	console.log(`Wrote ${outPath} (${PAGES.length + STATIC_PAGES.length} URLs)`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
