import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider } from '@/lib/AuthContext';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'AVELORA — Premium AI Travel Platform | Uzbekistan & The Silk Road',
  description: 'The World, Tailored to You. Experience bespoke, intelligent luxury travel planning across Samarkand, Bukhara, Khiva, and Uzbekistan.',
  keywords: ['Uzbekistan Travel', 'AI Trip Planner', 'Samarkand', 'Bukhara', 'Luxury Travel', 'Silk Road Itinerary', 'Avelora'],
  authors: [{ name: 'Avelora AI Travel' }],
  icons: {
    icon: '/logo-symbol.svg',
    shortcut: '/logo-symbol.svg',
    apple: '/logo-symbol.svg',
  },
  openGraph: {
    title: 'AVELORA — The World, Tailored to You',
    description: 'Bespoke AI-powered luxury travel planning for international tourists.',
    url: 'https://avelora.travel',
    siteName: 'AVELORA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'AVELORA Silk Road Journey',
      },
    ],
    locale: 'en_US',
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
      <head>
        <link rel="icon" href="/logo-symbol.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-forest-950 text-ivory flex flex-col antialiased selection:bg-gold-500 selection:text-forest-950">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

