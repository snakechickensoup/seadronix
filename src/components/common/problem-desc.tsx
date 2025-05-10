'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type ProblemDescriptionProps = {
  title: string;
  children: React.ReactNode;
};

const ProblemDescription = (props: ProblemDescriptionProps) => {
  const { title, children } = props;
  const [isCollapsed, setIsCollapsed] = useState('item-1');

  const handleAccordionChange = () => {
    setIsCollapsed((prev) => (prev === 'item-1' ? '' : 'item-1'));
  };

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <Accordion
        type='single'
        collapsible
        value={isCollapsed}
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value='item-1'>
          <Card className='bg-white/50'>
            <CardHeader>
              <AccordionTrigger className='p-0'>
                <CardTitle className='text-md'>문제 설명</CardTitle>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent>
              <CardContent>{children}</CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ProblemDescription;
