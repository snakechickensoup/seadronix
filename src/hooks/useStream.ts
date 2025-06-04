import { useEffect, useRef, useState } from 'react';
import { Renderer } from '@/lib/render';
import { Socket } from '@/lib/socket';

const defaultURL = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:8080';
const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';
const DEFAULT_VIDEO_SOURCE = process.env.NEXT_PUBLIC_VIDEO_URL || '';

export const useStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const rendererRef = useRef<Renderer | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const connect = async () => {
    if (!canvasRef.current) {
      setErrorMessage('캔버스 요소가 없습니다.');
      return;
    }
    if (socketRef.current && socketRef.current.isConnected) {
      setErrorMessage('이미 연결되어 있습니다.');
      return;
    }

    setErrorMessage(null);

    try {
      if (socketRef.current) socketRef.current.disconnect();
      if (rendererRef.current) rendererRef.current.clear();

      const socket = new Socket(defaultURL);
      const renderer = new Renderer(canvasRef.current);

      socket.onFrame = async (frame) => {
        await renderer.renderFrame(frame);
      };

      socket.onConnect = () => {
        setIsConnected(true);
      };

      socket.onError = (error) => {
        console.error('웹소켓 오류:', error);
        const message =
          error instanceof Error ? error.message : error.toString() || '알 수 없는 오류';
        setErrorMessage(message);
        setIsConnected(false);
      };

      socketRef.current = socket;
      rendererRef.current = renderer;

      await socket.connect();
    } catch (error) {
      console.error('스트리밍 오류:', error);
      setErrorMessage(error instanceof Error ? error.message : '스트리밍에 실패했습니다.');
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (rendererRef.current) {
      rendererRef.current.clear();
      rendererRef.current = null;
    }
    setErrorMessage(null);
    setIsConnected(false);
  };

  const handleSourceChange = async (value: string | File) => {
    setErrorMessage(null);

    try {
      if (!socketRef.current?.isConnected) {
        await connect();
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      if (value instanceof File) {
        // 파일: 기존 API 서버 사용
        const formData = new FormData();
        formData.append('file', value);

        const response = await fetch(`${apiURL}/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || '파일 업로드 실패');
        }

        // 연결되어 있지 않으면 연결
        if (!socketRef.current?.isConnected) {
          await connect();
        }
      } else {
        const response = await fetch(`${apiURL}/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: value })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || '소스 변경 실패');
        }

        if (!socketRef.current?.isConnected) {
          await connect();
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '소스 변경 실패');
    }
  };

  const startDefaultStream = async () => {
    await handleSourceChange(DEFAULT_VIDEO_SOURCE);
  };

  const stopStream = () => {
    if (socketRef.current) {
      socketRef.current.stopStream();
      rendererRef.current?.clear();
      setIsConnected(false);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    canvasRef,
    isConnected,
    errorMessage,
    handleSourceChange,
    startDefaultStream,
    reconnect: connect,
    disconnect,
    stopStream
  };
};
