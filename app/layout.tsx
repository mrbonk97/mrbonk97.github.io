import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { TopNav } from '@/components/top-nav';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '김현석',
  description: '김현석의 포트폴리오',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={inter.className + ' bg-secondary-400 text-neutral-800'}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
