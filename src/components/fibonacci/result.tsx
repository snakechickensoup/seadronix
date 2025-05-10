'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import FibonacciResultTable from './result-table';

const FibonacciResult = () => {
  const [isCollapsed, setIsCollapsed] = useState('');

  const handleAccordionChange = () => {
    setIsCollapsed((prev) => (prev === 'item-3' ? '' : 'item-3'));
  };

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
              <CardDescription className='text-xs'>
                출력된 결과입니다.
              </CardDescription>
              <pre className='bg-foreground/90 overflow-auto rounded p-4 text-xs text-white'>
                {`1 1
1 1
1 1`}
              </pre>
              <FibonacciResultTable />
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default FibonacciResult;
