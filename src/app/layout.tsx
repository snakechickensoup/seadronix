import localFont from 'next/font/local';
import Layout from '@/components/layout/layout';
import type { Metadata } from 'next';

import './globals.css';

const myFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: '씨드로닉스 사전 과제 | 강미정',
  description: '프론트엔드 강미정'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={myFont.className} suppressHydrationWarning>
      <body className='flex min-h-dvh w-full justify-center'>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
