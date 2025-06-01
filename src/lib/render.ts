import type { FrameData } from './types';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frameCount: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context is not available');
    }
    this.ctx = ctx;
  }

  async renderFrame(frameData: FrameData): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          this.canvas.width = img.width;
          this.canvas.height = img.height;

          this.ctx.drawImage(img, 0, 0);
          this.drawOverlay(frameData);
          this.frameCount++;
          URL.revokeObjectURL(img.src);
          resolve();
        } catch (error) {
          URL.revokeObjectURL(img.src);
          resolve();
        }
      };
      img.onerror = (error) => {
        URL.revokeObjectURL(img.src);
        reject(error);
      };

      const blob = new Blob([frameData.data], { type: 'image/jpeg' });
      img.src = URL.createObjectURL(blob);
    });
  }

  private drawOverlay(frameData: FrameData): void {
    this.ctx.fillStyle = 'oklch(0.35 0.0799 246.32 / 0.8)';
    this.ctx.fillRect(10, 10, 200, 60);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '14px Pretendard, sans-serif';
    this.ctx.fillText(`지연시간: ${Math.round(frameData.latency)}ms`, 20, 30);
    this.ctx.fillText(`프레임 수: ${this.frameCount}`, 20, 50);
  }

  getFrameCount(): number {
    return this.frameCount;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.frameCount = 0;
  }
}
