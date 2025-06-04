import type { FrameData } from './types';

export class Socket {
  private url: string;
  private socket: WebSocket | null = null;
  private tempFrameData: Pick<FrameData, 'timestamp' | 'serverSendTime'> | null = null;

  public onFrame: ((frameData: FrameData) => void) | null = null;
  public onError: ((error: Event | string) => void) | null = null;
  public onConnect: (() => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  get isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      const timeout = setTimeout(() => {
        reject(new Error('웹소켓 연결 시간이 초과되었습니다.'));
        this.socket?.close();
      }, 5000); // 5초 후 타임아웃

      this.socket.onopen = () => {
        console.log('웹소켓이 연결되었습니다.');
        this.onConnect?.();
        clearTimeout(timeout);
        resolve();
      };

      this.socket.onmessage = async (event) => {
        const clientReceivedTime = Date.now();
        if (typeof event.data === 'string') {
          const message = JSON.parse(event.data);
          if (message.type === 'frame' && message.payload && this.onFrame) {
            this.tempFrameData = {
              timestamp: message.payload.timestamp,
              serverSendTime: message.payload.serverSendTime
            };
          } else if (message.type === 'error') {
            this.onError?.(message.payload);
          }
        } else if (event.data instanceof Blob) {
          if (this.tempFrameData && this.onFrame) {
            const frameData: FrameData = {
              data: await event.data.arrayBuffer(),
              timestamp: this.tempFrameData.timestamp,
              serverSendTime: this.tempFrameData.serverSendTime,
              clientReceivedTime: clientReceivedTime
            };
            this.onFrame(frameData);
            this.tempFrameData = null;
          }
        }
      };

      this.socket.onerror = (error) => {
        clearTimeout(timeout);
        this.onError?.(error);
        reject(error);
      };

      this.socket.onclose = () => {
        clearTimeout(timeout);
        this.tempFrameData = null;
        this.socket = null;
      };
    });
  }

  startStream(source: string): void {
    if (!this.isConnected) {
      this.onError?.('WebSocket이 연결되지 않았습니다.');
      return;
    }
    this.socket!.send(JSON.stringify({ type: 'play', source }));
  }

  stopStream(): void {
    if (!this.isConnected) return;
    this.socket!.send(JSON.stringify({ type: 'stop' }));
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = null;
  }
}
