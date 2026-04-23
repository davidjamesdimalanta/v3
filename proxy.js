import { NextResponse } from 'next/server';

// Parse Accept header into sorted [{type, q}] array
function parseAccept(header) {
  if (!header) return [];
  return header
    .split(',')
    .map(part => {
      const [rawType, ...params] = part.trim().split(';');
      let q = 1.0;
      for (const p of params) {
        const m = p.trim().match(/^q=([0-9]*\.?[0-9]+)$/);
        if (m) q = parseFloat(m[1]);
      }
      return { type: rawType.trim().toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);
}

// Resolve effective q-value for a mime type, respecting subtype and full wildcards
function effectiveQ(parsed, mime) {
  const [main] = mime.split('/');
  const exact = parsed.find(a => a.type === mime);
  if (exact !== undefined) return exact.q;
  const sub = parsed.find(a => a.type === `${main}/*`);
  if (sub !== undefined) return sub.q;
  const wild = parsed.find(a => a.type === '*/*');
  if (wild !== undefined) return wild.q;
  return null; // not mentioned — implicitly q=0 when Accept is present
}

// Returns 'html', 'markdown', or null (406)
function negotiate(acceptHeader) {
  if (!acceptHeader) return 'html'; // no Accept → serve default HTML

  const parsed = parseAccept(acceptHeader);
  const htmlQ = effectiveQ(parsed, 'text/html') ?? 0;
  const mdQ = effectiveQ(parsed, 'text/markdown') ?? 0;

  if (htmlQ === 0 && mdQ === 0) return null; // nothing we serve is acceptable
  if (mdQ > 0 && mdQ >= htmlQ) return 'markdown';
  return 'html';
}

const MARKDOWN_ROUTES = new Set([
  '/',
  '/about',
  '/project/goable',
  '/project/socratic',
  '/project/ihub',
]);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Studio proxy — block access in production
  if (pathname.startsWith('/studio') && process.env.NODE_ENV === 'production') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // Content negotiation for known page routes
  if (MARKDOWN_ROUTES.has(pathname)) {
    const acceptHeader = request.headers.get('accept');
    const decision = negotiate(acceptHeader);

    if (decision === null) {
      return new NextResponse('Not Acceptable', {
        status: 406,
        headers: {
          'Vary': 'Accept',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    if (decision === 'markdown') {
      const mdPath = pathname === '/' ? '' : pathname;
      const res = NextResponse.rewrite(new URL(`/api/md${mdPath}`, request.url));
      res.headers.set('Vary', 'Accept');
      return res;
    }

    // HTML — pass through with Vary header
    const res = NextResponse.next();
    res.headers.set('Vary', 'Accept');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/about',
    '/project/:slug*',
    '/studio/:path*',
  ],
};
