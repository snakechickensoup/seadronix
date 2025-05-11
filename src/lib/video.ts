export const revokeObjectURL = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

export const cleanUpVideoElement = (video: HTMLVideoElement) => {
  revokeObjectURL(video.src);

  video.pause();
  video.removeAttribute('src');
  video.load();
};

export const playVideoBlob = async (video: HTMLVideoElement, blob: Blob) => {
  const videoUrl = URL.createObjectURL(blob);
  video.src = videoUrl;
  video.load();
  video.muted = true;

  await video.play().catch((error) => {
    console.error('비디오 재생 실패:', error);
  });
};
