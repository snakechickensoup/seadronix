import ProblemDescription from '@/components/common/problem-desc';
import FibonacciDescription from '@/components/fibonacci/description';
import FibonacciForm from '@/components/fibonacci/form';
import FibonacciResult from '@/components/fibonacci/result';

const FibonacciPage = () => {
  return (
    <div className='flex flex-1 flex-col gap-6 overflow-auto p-6'>
      <ProblemDescription title='문제 1. 피보나치 출력 프로그램'>
        <FibonacciDescription />
      </ProblemDescription>
      <FibonacciForm />
      <FibonacciResult />
    </div>
  );
};

export default FibonacciPage;
