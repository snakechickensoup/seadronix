import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import SelectVideoDialog from './select-dialog';

const VideoPlayer2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [latency, setLatency] = useState({
    start: 0,
    end: 0,
    total: 0
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPlayer = async () => {
      const placeholderVideo = process.env.NEXT_PUBLIC_VIDEO_URL;
      if (placeholderVideo) {
        startStreaming(placeholderVideo);
      }
    };

    initPlayer();

    return () => {
      if (videoRef.current) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, []);

  const startStreaming = async (url: string) => {
    if (!videoRef.current) return;
    setIsLoading(true);
    setLatency({ start: performance.now(), end: 0, total: 0 });

    if (videoRef.current.src) {
      URL.revokeObjectURL(videoRef.current.src);
      videoRef.current.src = '';
      videoRef.current.pause();
    }

    const video = videoRef.current;

    video.src = url;
    video.load();
    video.muted = true;
    video.play();

    video.onloadedmetadata = () => {
      setLatency((prev) => ({
        ...prev,
        end: performance.now(),
        total: Math.round(performance.now() - prev.start)
      }));
      setIsLoading(false);
    };

    video.onerror = (error) => {
      console.error('비디오 로딩 오류:', error);
      setIsLoading(false);
    };
  };

  const handleFileUpload = (value: File | string) => {
    if (typeof value !== 'string') {
      value = URL.createObjectURL(value);
    }
    startStreaming(value);
  };

  return (
    <>
      <SelectVideoDialog onFileSelect={handleFileUpload} />
      <div className='relative w-full flex-1 overflow-hidden'>
        <video controls className='h-full w-full rounded object-cover' ref={videoRef} playsInline />

        <div className='bg-primary/70 absolute top-0 left-0 m-2 rounded px-3 py-1.5 text-sm font-semibold text-white'>
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <>지연시간: {Math.round(latency.total)} ms</>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer2;
