'use client';

import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const VideoPlayer = dynamic(() => import('./player'), {
  ssr: false,
  loading: () => (
    <div className='flex w-full flex-1 flex-col items-end justify-end gap-4'>
      <Skeleton className='h-12 w-24' />
      <Skeleton className='h-full w-full' />
    </div>
  )
});

const VideoCard = () => {
  return (
    <Card className='flex flex-1 flex-col overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-sm'>출력 결과</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col items-end gap-4 overflow-hidden'>
        <VideoPlayer />
      </CardContent>
    </Card>
  );
};

export default VideoCard;
