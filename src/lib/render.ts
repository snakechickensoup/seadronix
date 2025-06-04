import type { FrameData } from './types';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });

    if (!ctx) {
      throw new Error('CanvasRenderingContext2D를 가져올 수 없습니다.');
    }

    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
  }

  async renderFrame(frameData: FrameData): Promise<void> {
    const renderStart = Date.now();
    try {
      const blob = new Blob([frameData.data], { type: 'image/jpeg' });
      const imageBitmap = await createImageBitmap(blob);

      if (this.canvas.width !== imageBitmap.width || this.canvas.height !== imageBitmap.height) {
        this.canvas.width = imageBitmap.width;
        this.canvas.height = imageBitmap.height;
      }

      this.ctx.drawImage(imageBitmap, 0, 0);
      imageBitmap.close();

      const renderEnd = Date.now();

      // 1. 서버 내부 처리 지연
      const serverLatency = frameData.serverSendTime - frameData.timestamp;
      // 2. 네트워크 전송 지연
      const networkLatency = frameData.clientReceivedTime - frameData.serverSendTime;
      // 3. 클라이언트 렌더링 지연
      const clientLatency = renderEnd - renderStart;
      const totalLatency = serverLatency + networkLatency + clientLatency;

      this.drawLatency(totalLatency);
    } catch (error) {
      console.error('이미지 로드 실패:', error);
      throw error;
    }
  }

  private drawLatency(latency: number): void {
    const color = latency > 200 ? '#ff4757' : latency > 100 ? '#ffa502' : '#2ed573';

    this.ctx.fillStyle = 'oklch(0.35 0.0799 246.32 / 0.8)';
    this.ctx.fillRect(10, 10, 280, 80);

    this.ctx.fillStyle = color;
    this.ctx.font = '14px Pretendard, sans-serif';
    this.ctx.fillText(`프레임 지연 시간: ${latency.toFixed(2)} ms`, 20, 30);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
