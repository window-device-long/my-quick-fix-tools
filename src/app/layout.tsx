import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-T5JBG9XC69" />
      </body>
    </html>
  );
}