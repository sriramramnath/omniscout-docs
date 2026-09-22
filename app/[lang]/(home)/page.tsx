import type { Metadata } from 'next';
import DocsHome from './DocsHome';

export const metadata: Metadata = {
  title: 'OmniScout Docs — Search, Browser & Computer for AI Agents',
  description: 'Documentation for OmniScout: local-first search, browser automation, and computer control for AI agents.',
};

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;

  return (
    <main className="flex flex-col flex-1 w-full bg-white">
      <DocsHome lang={lang} />
    </main>
  );
}
