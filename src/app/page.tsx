import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

import Logo from '@public/images/logo-name.svg';
import { ArrowUpRight, Dot } from 'lucide-react';

export default function Home() {
  return (
    <main className='to-primary from-foreground flex flex-1 flex-col gap-8 bg-linear-to-t px-8 py-24 text-white/80'>
      <h1 className='text-6xl font-bold tracking-wide'>
        <Image src={Logo} unoptimized alt='seadronix' height={48} priority className='mb-4' />
        사전과제
      </h1>
      <div className='text-chart-5 flex gap-4 text-xl font-medium'>
        <span>강미정</span>
        <Separator orientation='vertical' className='bg-chart-5' />
        <span>Frontend Developer</span>
      </div>
      <div className='flex flex-1 flex-col justify-end gap-4'>
        <p className='mb-4'>
          프론트엔드 개발자 강미정입니다.
          <br /> 씨드로닉스 사전 과제 내용을 바탕으로 웹 페이지를 구현했습니다.
          <br /> 아래 링크를 클릭하여 각 문제 페이지로 이동하실 수 있습니다.
          <br /> 감사합니다.
        </p>
        <Link href='/fibo' className='mb-2 flex items-center gap-2 text-2xl font-semibold'>
          <Dot size={32} /> 문제 1 바로가기
          <ArrowUpRight size={32} />
        </Link>
        <Link href='/video' className='flex gap-2 text-2xl font-semibold'>
          <Dot size={32} /> 문제 2 바로가기
          <ArrowUpRight size={32} />
        </Link>
      </div>
    </main>
  );
}
