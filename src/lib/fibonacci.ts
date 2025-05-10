const convertInput = (input: string) => {
  const list: number[] = [];
  input.split('\n').forEach((item) => {
    const num = Number(item);
    if (isNaN(num)) {
      throw new Error('잘못된 입력입니다. 숫자만 입력할 수 있습니다.');
    }
    if (num < 0 || num > 40) {
      throw new Error('입력 값이 잘못되었습니다. 0 <= n <= 40');
    }
    list.push(num);
  });
  if (list.length > 1 && list[0] !== list.length - 1) {
    throw new Error('테스트 케이스 개수와 입력값이 일치하지 않습니다.');
  }
  return list;
};

export const getCountFibonacci = (input: string): string[] => {
  const nums = convertInput(input);
  const countFibs = [
    [1, 0],
    [0, 1]
  ];

  const countFibonacciPrints = (num: number) => {
    if (!countFibs[num]) {
      const [a0, a1] = countFibonacciPrints(num - 1);
      const [b0, b1] = countFibonacciPrints(num - 2);
      countFibs[num] = [a0 + b0, a1 + b1];
    }
    return countFibs[num];
  };

  const result: string[] = [];
  for (let i = 1; i < nums.length; i++) {
    const count = countFibonacciPrints(nums[i]);
    result.push(`${count[0]} ${count[1]}`);
  }

  return result;
};
