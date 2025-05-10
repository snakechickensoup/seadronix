import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption
} from '../ui/table';
import type { CountFibResult } from '@/lib/types';

type FibonacciResultTableProps = {
  result: CountFibResult[];
};

const FibonacciResultTable = (props: FibonacciResultTableProps) => {
  const { result } = props;
  return (
    <Table>
      <TableCaption className='mb-2 font-semibold opacity-90'>
        테스트 케이스 상세
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>테스트 케이스</TableHead>
          <TableHead>N</TableHead>
          <TableHead>0 출력 횟수</TableHead>
          <TableHead>1 출력 횟수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.map((res, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{res.n}</TableCell>
            <TableCell>{res.count0}</TableCell>
            <TableCell>{res.count1}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FibonacciResultTable;
