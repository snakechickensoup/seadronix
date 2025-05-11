import { Separator } from '../ui/separator';

const FibonacciDescription = () => {
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <p>다음 소스는 N 번째 피보나치 수를 구하는 C++ 함수이다.</p>
      <pre className='bg-foreground/90 overflow-auto rounded-md p-4 text-xs text-white'>
        {`int fibonacci(int n) {
    if (n == 0) {
        printf("0");
        return 0;
    } else if (n == 1) {
        printf("1");
        return 1;
    } else {
        return fibonacci(n‐1) + fibonacci(n‐2);
    }
}`}
      </pre>
      <p>
        N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번
        출력되는지 구하는 프로그램을 작성하시오.
      </p>
      <Separator className='my-1' />
      <strong>입력</strong>
      <p className='text-xs'>
        첫째 줄에 테스트 케이스의 개수 T가 주어진다.
        <br /> 각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. N은
        40보다 작거나 같은 자연수 또는 0이다.
      </p>
      <Separator className='my-1' />
      <strong>출력</strong>
      <p className='text-xs'>
        각 테스트 케이스마다 0이 출력되는 횟수와 1이 출력되는 횟수를 공백으로
        구분해서 출력한다.
      </p>
    </div>
  );
};

export default FibonacciDescription;
