'use client';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type * as PageTree from 'fumadocs-core/page-tree';
import { usePathname } from 'fumadocs-core/framework';
import type { ComponentProps } from 'react';
import { languageCodes, languageLabels } from '@/lib/i18n';

type DocsLayoutProps = ComponentProps<typeof DocsLayout>;

export function DocsShell({
  lang,
  tree,
  base,
  children,
}: {
  lang: string;
  tree: PageTree.Root;
  base: Omit<DocsLayoutProps, 'tree' | 'tabs' | 'children'>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const tabs = languageCodes.map((code) => {
    const parts = [...segments];
    if (languageCodes.includes(parts[1] as (typeof languageCodes)[number])) {
      parts[1] = code;
    } else {
      return { title: languageLabels[code], url: `/${code}/docs` };
    }
    return { title: languageLabels[code], url: parts.join('/') || '/' };
  });

  return (
    <DocsLayout tree={tree} tabs={tabs} {...base}>
      {children}
    </DocsLayout>
  );
}
