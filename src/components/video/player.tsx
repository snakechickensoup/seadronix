import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import SelectVideoDialog from './select-dialog';

const VideoPlayer = () => {
  return (
    <Card className='flex flex-1 flex-col overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-sm'>출력 결과</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col items-end gap-4 overflow-hidden'>
        <SelectVideoDialog />
        <video controls autoPlay>
          <source src={process.env.NEXT_PUBLIC_VIDEO_URL} type='video/mp4' />
        </video>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
