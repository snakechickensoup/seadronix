import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import FibonacciResultTable from './result-table';
import type { CountFibResult } from '@/lib/types';

type FibonacciResultProps = {
  result: CountFibResult[];
};

const FibonacciResult = (props: FibonacciResultProps) => {
  const { result } = props;
  const [isCollapsed, setIsCollapsed] = useState('');

  const handleAccordionChange = () => {
    setIsCollapsed((prev) => (prev === 'item-3' ? '' : 'item-3'));
  };

  useEffect(() => {
    if (result.length) {
      setIsCollapsed('item-3');
    }
  }, [result]);

  return (
    <Accordion
      type='single'
      collapsible
      value={isCollapsed}
      onValueChange={handleAccordionChange}
    >
      <AccordionItem value='item-3'>
        <Card>
          <CardHeader>
            <AccordionTrigger className='p-0'>
              <CardTitle className='text-sm'>결과</CardTitle>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent>
            <CardContent className='space-y-2'>
              {result.length ? (
                <>
                  <CardDescription className='text-xs'>
                    출력된 결과입니다.
                  </CardDescription>
                  <pre className='bg-foreground/90 overflow-auto rounded p-4 text-xs text-white'>
                    {result.map((res) => `${res.count0} ${res.count1}\n`)}
                  </pre>
                  <FibonacciResultTable result={result} />
                </>
              ) : (
                <CardDescription className='text-sm'>
                  출력된 결과가 없습니다.
                </CardDescription>
              )}
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default FibonacciResult;
