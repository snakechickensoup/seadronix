'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import VideoPlayer2 from './player2';
import VideoPlayer3 from './player3';

const VideoCard = () => {
  return (
    <Card className='flex flex-1 flex-col overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-sm'>출력 결과</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col items-end gap-4 overflow-hidden'>
        {/* <VideoPlayer2 /> */}
        <VideoPlayer3 />
      </CardContent>
    </Card>
  );
};

export default VideoCard;
