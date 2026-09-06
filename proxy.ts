import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { isMarkdownPreferred } from 'fumadocs-core/negotiation';
import { languageCodes } from '@/lib/i18n';
import { docsContentRoute } from '@/lib/shared';

const i18nMiddleware = createI18nMiddleware({
  defaultLanguage: 'en',
  languages: [...languageCodes],
});
const langPrefix = `(${languageCodes.join('|')})`;

export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // static assets pass through untouched
  if (/\.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|eot|otf|pdf|xml|mp4|webm|map)$/i.test(pathname)) {
    return NextResponse.next();
  }

  // legacy: unprefixed docs URLs -> default locale
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  // legacy: old Docus URLs (/en/cli/*, /en/api/*) -> locale docs URLs
  const legacy = pathname.match(/^\/en\/(cli|api|sdk)(\/.*)?$/);
  if (legacy) {
    return NextResponse.redirect(new URL(`/en/docs/${legacy[1]}${legacy[2] ?? ''}`, request.url));
  }

  const res = await i18nMiddleware(request, event);
  if (res && res.headers.get('location')) return res;

  // per-page markdown: /{lang}/docs/...[.md] -> /llms.mdx/docs/.../content.md
  const localized = pathname.match(new RegExp(`^/${langPrefix}(/docs(|/.*))$`));
  if (localized) {
    const isMd = pathname.endsWith('.md');
    let slug = localized[2].replace(/^\/docs/, '').replace(/\/$/, '');
    if (isMd) slug = slug.replace(/\.md$/, '');
    const target = `${docsContentRoute}${slug}/content.md`;

    if (isMd) {
      return NextResponse.rewrite(new URL(target, request.url));
    }

    if (isMarkdownPreferred(request)) {
      return NextResponse.rewrite(new URL(target, request.url), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  // skip API routes and generated text/image routes (static assets are handled in code)
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|llms\\.txt|llms-full\\.txt|llms\\.mdx|og).*)'],
};
