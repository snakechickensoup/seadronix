import ProblemDescription from '@/components/common/problem-desc';
import FibonacciDescription from '@/components/fibonacci/description';

const FibonacciPage = () => {
  return (
    <div className='flex-1'>
      <ProblemDescription title='문제 1. 피보나치 출력 프로그램'>
        <FibonacciDescription />
      </ProblemDescription>
    </div>
  );
};

export default FibonacciPage;
