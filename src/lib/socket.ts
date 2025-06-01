import type { FrameData } from './types';

export class Socket {
  private url: string;
  private socket: WebSocket | null = null;
  private connected: boolean = false;

  public onFrame: ((frameData: FrameData) => void) | null = null;
  public onConnect: (() => void) | null = null;
  public onDisconnect: (() => void) | null = null;
  public onError: ((error: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  get isConnected(): boolean {
    return this.connected;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
          console.log('웹소켓 연결이 열렸습니다.');
          this.connected = true;
          this.onConnect?.();
          resolve();
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.socket.onerror = (error) => {
          console.error('웹소켓 오류:', error);
          this.onError?.(error);
          reject(error);
        };

        this.socket.onclose = () => {
          console.log('웹소켓 연결이 닫혔습니다.');
          this.connected = false;
          this.onDisconnect?.();
        };
      } catch (error) {
        console.error('웹소켓 연결 중 오류 발생:', error);
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.connected = false;
  }

  private handleMessage(event: MessageEvent): void {
    const receiveTime = performance.now();
    try {
      const frame = JSON.parse(event.data);
      const binaryString = atob(frame.data);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const latency = receiveTime - frame.timestamp;

      const frameData = {
        data: bytes,
        serverTimestamp: frame.timestamp,
        receiveTime,
        latency
      };

      this.onFrame?.(frameData);
    } catch (error) {
      console.error('메시지 처리 중 오류 발생:', error);
    }
  }
}
