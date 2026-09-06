import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsShell } from '@/components/docs-shell';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;

  return (
    <DocsShell lang={lang} tree={source.getPageTree(lang)} base={baseOptions(lang)}>
      {children}
    </DocsShell>
  );
}
