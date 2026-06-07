// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const DOCS_SITE = 'https://docs.omniscout.xyz';
const OG_IMAGE = `${DOCS_SITE}/og/docs-home.jpg`;

const softwareJsonLd = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'OmniScout',
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'macOS, Linux, Windows',
	description:
		'Local-first browser control, semantic search, and research for AI agents. Install with pip install omniscout.',
	url: DOCS_SITE,
	downloadUrl: 'https://pypi.org/project/omniscout/',
	softwareHelp: `${DOCS_SITE}/cli/overview/`,
	sameAs: [
		'https://omniscout.xyz',
		'https://github.com/sriramramnath/omniscout',
		'https://pypi.org/project/omniscout/',
	],
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'USD',
	},
});

// https://astro.build/config
export default defineConfig({
	site: DOCS_SITE,
	integrations: [
		starlight({
			title: 'OmniScout Docs',
			description:
				'Local-first browser control, semantic search, and research for AI agents. Install with pip install omniscout.',
			logo: {
				src: './public/logo.svg',
				alt: 'OmniScout',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/docs-theme.css'],
			components: {
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			head: [
				{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'OmniScout Docs' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:type', content: 'image/jpeg' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } },
				{ tag: 'script', attrs: { type: 'application/ld+json' }, content: softwareJsonLd },
			],
			social: [
				{
					icon: 'external',
					label: 'Website',
					href: 'https://omniscout.xyz',
				},
				{
					icon: 'external',
					label: 'llms.txt',
					href: `${DOCS_SITE}/llms.txt`,
				},
				{
					icon: 'external',
					label: 'PyPI',
					href: 'https://pypi.org/project/omniscout/',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/sriramramnath/omniscout',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'What is OmniScout?', slug: 'cli/overview' },
						{ label: 'Using OmniScout with AI agents', slug: 'cli/agents' },
						{ label: 'Examples & recipes', slug: 'cli/examples' },
					],
				},
				{
					label: 'CLI',
					items: [
						{ label: 'Commands reference', slug: 'cli/commands' },
						{ label: 'Architecture', slug: 'cli/architecture' },
						{ label: 'Roadmap', slug: 'cli/roadmap' },
						{ label: 'Troubleshooting', slug: 'cli/troubleshooting' },
					],
				},
				{
					label: 'SDK',
					items: [
						{ label: 'Overview', slug: 'sdk' },
						{ label: 'Python API', slug: 'sdk/api' },
					],
				},
			],
		}),
	],
});
