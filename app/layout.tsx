import { SplashScreen } from '@/components/splash/SplashScreen';
import type { Metadata } from 'next';
import { Caveat, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Abdelrhman | AI Engineer',
  description:
    'Abdelrhman is an AI Engineer specializing in end-to-end AI systems, Machine Learning, and scalable full-stack infrastructure. Building real products that ship.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL('http://localhost:3000'),
  openGraph: {
    title: 'Abdelrhman | Full-Stack AI Engineer',
    description:
      'I build production AI systems end-to-end. From model orchestration to scalable infrastructure and polished interfaces.',
    siteName: 'Abdelrhman',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdelrhman | AI Engineer',
    description: 'Building production AI systems end-to-end.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950">
        <SplashScreen>{children}</SplashScreen>
      </body>
    </html>
  );
}
