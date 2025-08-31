import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { ErrorBoundary } from '@/components/error-boundry/error-boundary';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { APP_DESCRIPTION, APP_TITLE } from '@/config/metadata';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
