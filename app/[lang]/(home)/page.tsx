import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;

  return (
    <main className="flex flex-col flex-1 mx-auto w-full max-w-5xl px-6 py-16">
      <p className="text-sm font-medium text-fd-primary mb-4">OmniScout</p>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
      <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl">
        Local-first browser control, semantic search, and research for AI agents.
      </p>
      <div className="flex flex-row gap-3 mb-14">
        <Link
          href={`/${lang}/docs`}
          className="rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm px-5 py-2.5"
        >
          Open Documentation
        </Link>
        <Link
          href="https://github.com/sriramramnath/omniscout-docs"
          className="rounded-lg border border-fd-border font-medium text-sm px-5 py-2.5"
        >
          GitHub
        </Link>
      </div>
      <Cards>
        <Card title="CLI" href={`/${lang}/docs/cli`}>
          Install the CLI, wire up agents, and automate browsers.
        </Card>
        <Card title="Cloud API" href={`/${lang}/docs/api`}>
          Hosted search, answers, and browser sessions.
        </Card>
        <Card title="Commands reference" href={`/${lang}/docs/cli/commands`}>
          Every command in OmniScout&apos;s CLI.
        </Card>
        <Card title="Usage & Billing" href={`/${lang}/docs/api/billing`}>
          Usage-based pricing and spending limits.
        </Card>
      </Cards>
    </main>
  );
}
