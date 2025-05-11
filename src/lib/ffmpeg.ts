'use client';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

const baseURL = process.env.NEXT_PUBLIC_FFMPEG_URL || '';

class FFmpegWrapper {
  private static instance: FFmpegWrapper;
  private ffmpeg: FFmpeg;

  private constructor() {
    this.ffmpeg = new FFmpeg();
  }

  static getInstance(): FFmpegWrapper {
    if (!this.instance) {
      this.instance = new FFmpegWrapper();
    }
    return this.instance;
  }

  async load() {
    if (this.ffmpeg.loaded) return;
    try {
      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

      await this.ffmpeg.load({
        coreURL,
        wasmURL
      });
    } catch (error) {
      throw Error('FFmpeg 로드 실패' + error);
    }
  }

  async loadVideo(input: string | File) {
    const startTime = window.performance.now();
    let videoData: Uint8Array;

    try {
      if (typeof input === 'string') {
        const res = await fetch(input);
        const buffer = await res.arrayBuffer();
        videoData = new Uint8Array(buffer);
      } else {
        const buffer = await input.arrayBuffer();
        videoData = new Uint8Array(buffer);
      }

      const endTime = window.performance.now();
      return {
        data: videoData,
        loadTime: endTime - startTime
      };
    } catch (error) {
      throw new Error('비디오 로드 실패' + error);
    }
  }

  async convertVideo(video: Uint8Array, inputExt: string = 'mp4') {
    const startTime = window.performance.now();

    const inputFileName = `input.${inputExt}`;
    const outputFileName = 'output.mp4';

    try {
      await this.deleteFiles(inputFileName, outputFileName);
      await this.ffmpeg.writeFile(inputFileName, video);
      await this.ffmpeg.exec([
        '-i',
        inputFileName,
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-crf',
        '28',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        outputFileName
      ]);
      const outputData = (await this.ffmpeg.readFile(outputFileName)) as Uint8Array;

      await this.deleteFiles(inputFileName, outputFileName);

      const endTime = window.performance.now();

      return {
        data: outputData,
        convertTime: endTime - startTime
      };
    } catch (error) {
      throw Error('비디오 변환 실패' + error);
    }
  }

  async deleteFiles(inputFileName: string, outputFileName: string) {
    try {
      await this.ffmpeg.deleteFile(inputFileName);
      await this.ffmpeg.deleteFile(outputFileName);
    } catch (error) {
      console.warn('파일 삭제 실패', error);
    }
  }

  async streamVideo(input: File | string) {
    if (!this.ffmpeg.loaded) {
      await this.load();
    }

    const inputExt =
      typeof input === 'string'
        ? input.split('.').pop()?.toLowerCase() || 'mp4'
        : input.name.split('.').pop()?.toLowerCase() || 'mp4';
    try {
      const { data: videoData, loadTime } = await this.loadVideo(input);
      const { data: outputData, convertTime } = await this.convertVideo(videoData, inputExt);
      const videoBlob = new Blob([outputData], { type: 'video/mp4' });

      return {
        videoBlob,
        latency: {
          total: loadTime + convertTime,
          load: loadTime,
          convert: convertTime
        }
      };
    } catch (error) {
      throw Error(`비디오 스트리밍 실패: ${error}`);
    }
  }
}

export const ffmpegInstance = FFmpegWrapper.getInstance();
