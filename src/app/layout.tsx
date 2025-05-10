import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '씨드로닉스 사전 과제',
  description: '프론트엔드 강미정'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
