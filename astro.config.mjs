// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
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
			social: [
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
