import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { siteDescription, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Free Private Developer Tools`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName,
    title: `${siteName} - Free Private Developer Tools`,
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary',
    title: `${siteName} - Free Private Developer Tools`,
    description: siteDescription,
  },
  icons: {
    icon: '/favicon-32x32.png',
    shortcut: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  },
  verification: {
    google: 'kJ8icoC4KXn8Nlfth-I-dHfEP8tvlcpw5wgg7oiNzV4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5107605542667246"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {children}
        <GoogleAnalytics gaId="G-T5JBG9XC69" />
      </body>
    </html>
  );
}
