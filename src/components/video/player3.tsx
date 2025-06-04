import { Button } from '../ui/button';
import SelectVideoDialog from './select-dialog';
import { useStream } from '@/hooks/useStream';

const VideoPlayer3 = () => {
  const {
    canvasRef,
    isConnected,
    errorMessage,
    handleSourceChange,
    startDefaultStream,
    reconnect,
    stopStream
  } = useStream();

  const handlePlayClick = async (source: string | File) => {
    if (!isConnected) {
      await reconnect();
    }
    await handleSourceChange(source);
  };

  const handlePlayDefault = async () => {
    if (!isConnected) {
      await reconnect();
    }
    await startDefaultStream();
  };

  return (
    <>
      <SelectVideoDialog onFileSelect={handlePlayClick} />
      <div className='flex'>
        <Button onClick={stopStream} disabled={!isConnected} variant='outline'>
          정지
        </Button>
        <Button onClick={reconnect} variant='outline'>
          {isConnected ? '연결됨' : '연결'}
        </Button>
        <Button onClick={handlePlayDefault} disabled={!isConnected} variant='outline'>
          기본 재생
        </Button>
      </div>

      <canvas ref={canvasRef} className='h-full w-full bg-black object-contain' />

      {errorMessage && (
        <div className='absolute top-4 right-4 rounded bg-red-900/80 p-2 text-sm text-white'>
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default VideoPlayer3;
