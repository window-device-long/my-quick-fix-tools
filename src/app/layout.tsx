import type { Metadata } from 'next';

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
  return children;
}
