import { useEffect, useRef, useState } from 'react';
import SelectVideoDialog from './select-dialog';
import { Skeleton } from '../ui/skeleton';
import { ffmpegInstance } from '@/lib/ffmpeg';
import { cleanUpVideoElement, playVideoBlob, revokeObjectURL } from '@/lib/video';

const VideoPlayer = () => {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [latency, setLatency] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPlayer = async () => {
      await ffmpegInstance.load();
      setIsFFmpegLoaded(true);

      const placeholderVideo = process.env.NEXT_PUBLIC_VIDEO_URL;
      if (placeholderVideo) {
        startStreaming(placeholderVideo);
      }
    };

    initPlayer();

    return () => {
      if (videoRef.current) {
        revokeObjectURL(videoRef.current.src);
      }
    };
  }, []);

  const startStreaming = async (url: string) => {
    if (isProcessing || !videoRef.current) return;
    setIsProcessing(true);
    const video = videoRef.current;

    try {
      cleanUpVideoElement(video);

      const result = await ffmpegInstance.streamVideo(url);
      if (!result || !result.videoBlob) throw new Error('비디오 변환 실패');
      await playVideoBlob(video, result.videoBlob);
      setLatency(result.latency.total || 0);
    } catch (error) {
      console.error('비디오 스트리밍 실패:', error);
    } finally {
      setIsProcessing(false);
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
            <video
              controls
              className='h-full w-full rounded object-cover'
              ref={videoRef}
              playsInline
            />
            <div className='bg-primary/70 absolute top-0 left-0 m-2 rounded px-3 py-1.5 text-sm font-semibold text-white'>
              지연시간: {Math.round(latency)} ms
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
