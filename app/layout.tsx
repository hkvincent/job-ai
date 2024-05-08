import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './provders';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job AI',
  description: 'Job application tracking system for job hunters, V',
  appleWebApp: {
    title: "JOB AI",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/site.webmanifest"></link>
          <script src="/serviceWorkerRegister.js" defer></script>
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </head>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
