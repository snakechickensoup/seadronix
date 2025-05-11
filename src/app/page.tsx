import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col justify-center gap-8 p-8'>
      <Link href='/fibo' className='text-4xl font-semibold'>
        문제 1
      </Link>
      <Link href='/video' className='text-4xl font-semibold'>
        문제 2
      </Link>
      <strong className='text-4xl font-semibold'>프론트엔드 강미정</strong>
    </main>
  );
}
