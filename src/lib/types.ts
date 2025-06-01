export type CountFibResult = {
  n: number;
  count0: number;
  count1: number;
};

export type FrameData = {
  data: Uint8Array;
  serverTimestamp: number;
  receiveTime: number;
  latency: number;
};
