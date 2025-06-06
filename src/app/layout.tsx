import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from '@/styles/fonts';
import Header from '@/components/layouts/Header';
import AuthInitializer from '@/components/AuthInitializer';

export const metadata: Metadata = {
  title: 'Dogiary',
  description: '반려견과의 특별한 순간을 기록하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body className={pretendard.className}>
        <AuthInitializer />
        <Header />
        {children}
      </body>
    </html>
  );
}
