import ProblemDescription from '@/components/common/problem-desc';

const VideoPage = () => {
  return (
    <div className='flex flex-1 flex-col gap-6 overflow-hidden p-6'>
      <ProblemDescription title='문제 2. 최소 지연 시간 영상 출력'>
        <div className='flex flex-col gap-2 text-sm'>
          <p>
            다음의 기능을 수행하는 최소 지연 시간을 갖는 페이지를 설계하시오.
          </p>
          <ol className='m-2 list-decimal space-y-2 pl-6 opacity-80'>
            <li>
              영상 스트리밍 기능: 임의의 파일 또는 주소로부터 스트리밍 되는
              영상을 디코딩 하여 화면에 출력
            </li>
            <li>
              스트리밍 데이터 수신 또는 프레임 데이터 로드 시간과 화면 출력
              시간에 대한 차이 값을 영상 출력 화면에 표기(지연시간)
            </li>
            <li>FFmpeg 을 제외한 외부 라이브러리 사용 불가</li>
          </ol>
        </div>
      </ProblemDescription>
    </div>
  );
};

export default VideoPage;
