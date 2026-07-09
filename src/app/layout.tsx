import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'QuickFix Studio',
    template: '%s | QuickFix Studio',
  },
  description: 'A production-ready suite of fast, private web tools for developers, marketers, and creators.',
  icons: {
    icon: '/favicon-32x32.png',
    shortcut: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  },
  verification: {
    google: 'kJ8icoC4KXn8Nlfth-I-dHfEP8tvlcpw5wgg7oiNzV4', // Chỉ cần dán phần mã content vào đây
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      
        {children}

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5107605542667246"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <GoogleAnalytics gaId="G-T5JBG9XC69" />
      </body>
    </html>
  );
}