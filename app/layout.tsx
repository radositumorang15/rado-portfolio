import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rado Situmorang — Frontend & Android Developer',
  description:
    'Interactive operating system portfolio of Rado Nelson Dela Sadrak Situmorang. Final-year Informatics Engineering Education student at Sebelas Maret University.',
  keywords: ['Rado Situmorang', 'Frontend Developer', 'Android Developer', 'Kotlin', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Rado Nelson Dela Sadrak Situmorang' }],
  metadataBase: new URL('https://radositumorang.netlify.app'),
  openGraph: {
    title: 'Rado Situmorang — Frontend & Android Developer',
    description: 'Interactive operating system portfolio featuring Windows 11 & Android 17 shells.',
    url: 'https://radositumorang.netlify.app',
    siteName: 'RadoOS Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rado Nelson Dela Sadrak Situmorang',
  alternateName: 'Rado Situmorang',
  jobTitle: 'Frontend & Android Developer',
  url: 'https://radositumorang.netlify.app',
  alumniOf: 'Universitas Sebelas Maret (UNS)',
  sameAs: [
    'https://www.linkedin.com/in/radositumorang/',
    'https://github.com/radositumorang15',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('rn_theme');
                  if (!t || t === 'system') {
                    t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  }
                  var s = localStorage.getItem('rn_shell');
                  if (!s || s === 'auto') {
                    s = (window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches) ? 'windows' : 'android';
                  }
                  var l = localStorage.getItem('rn_lang') || 'en';
                  document.documentElement.setAttribute('data-theme', t);
                  document.documentElement.setAttribute('data-shell', s);
                  document.documentElement.setAttribute('lang', l);
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
