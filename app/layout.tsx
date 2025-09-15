import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LunaFlow - Your Personal Cycle Companion',
  description: 'Track your menstrual cycle, correlate symptoms, and engage in anonymous discussions with community support.',
  keywords: ['menstrual cycle', 'period tracker', 'women health', 'cycle tracking'],
  openGraph: {
    title: 'LunaFlow - Your Personal Cycle Companion',
    description: 'Track your menstrual cycle, correlate symptoms, and engage in anonymous discussions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
