export type CountFibResult = {
  n: number;
  count0: number;
  count1: number;
};

export type FrameData = {
  data: ArrayBuffer;
  timestamp: number;
  serverSendTime: number;
  clientReceivedTime: number;
};

export type StreamMessage = {
  type: 'frame' | 'started' | 'stopped' | 'ended' | 'error' | 'status';
  payload: object | string;
};

export type StreamStatus = 'disconnected' | 'connecting' | 'connected' | 'streaming';
