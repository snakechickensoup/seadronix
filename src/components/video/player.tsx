import { useEffect, useRef, useState } from 'react';
import SelectVideoDialog from './select-dialog';
import { Skeleton } from '../ui/skeleton';
import { ffmpegInstance } from '@/lib/ffmpeg';

const VideoPlayer = () => {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPlayer = async () => {
      await loadFFmpeg();

      if (process.env.NEXT_PUBLIC_VIDEO_URL) {
        startStreaming(process.env.NEXT_PUBLIC_VIDEO_URL);
      }
    };

    initPlayer();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);

  const loadFFmpeg = async () => {
    try {
      await ffmpegInstance.load();
      setIsFFmpegLoaded(true);
    } catch (error) {
      throw new Error('FFmpeg 로드 실패: ' + error);
    }
  };

  const startStreaming = async (url: string) => {
    try {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }

      const result = await ffmpegInstance.streamVideo(url);

      if (result && result.videoBlob) {
        const videoUrl = URL.createObjectURL(result.videoBlob);
        setVideoUrl(videoUrl);

        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          videoRef.current.play();
        }
      }
    } catch (error) {
      throw new Error('비디오 스트리밍 실패: ' + error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      startStreaming(url);
    }
  };

  return (
    <>
      {isFFmpegLoaded ? (
        <>
          <SelectVideoDialog />
          <div className='relative w-full flex-1 overflow-hidden'>
            <video controls className='h-full w-full rounded object-cover' ref={videoRef} />
            <div className='bg-primary/70 absolute top-0 left-0 m-2 rounded px-3 py-1.5 text-sm font-semibold text-white'>
              지연시간: {0} ms
            </div>
          </div>
        </>
      ) : (
        <div className='flex w-full flex-1 flex-col items-end justify-end gap-4'>
          <Skeleton className='h-12 w-24' />
          <Skeleton className='h-full w-full' />
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
