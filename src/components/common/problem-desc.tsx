'use client';

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
  return (
    <section className='flex flex-1 flex-col gap-4 px-6 py-8'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <Card className='bg-white/70'>
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
