'use client';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

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

  async loadVideo(url: string) {
    const startTime = window.performance.now();

    try {
      const data = await fetchFile(url);
      const endTime = window.performance.now();
      return {
        data,
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
      const outputData = (await this.ffmpeg.readFile('output.mp4')) as Uint8Array;

      await this.ffmpeg.deleteFile(inputFileName);
      await this.ffmpeg.deleteFile(outputFileName);

      const endTime = window.performance.now();

      return {
        data: outputData,
        convertTime: endTime - startTime
      };
    } catch (error) {
      throw Error('비디오 변환 실패' + error);
    }
  }

  async streamVideo(url: string) {
    if (!this.ffmpeg.loaded) {
      await this.load();
    }

    const fileExt = url.split('.').pop()?.toLowerCase() || 'mp4';
    try {
      const { data: videoData, loadTime } = await this.loadVideo(url);
      const { data: outputData, convertTime } = await this.convertVideo(videoData, fileExt);
      const videoBlob = new Blob([outputData], { type: 'video/mp4' });
      const totalTime = loadTime + convertTime;

      return {
        videoBlob,
        latency: {
          total: totalTime,
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
