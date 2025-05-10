'use client';

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
      <Card className='bg-primary-foreground'>
        <CardHeader>
          <CardTitle className='text-md'>문제 설명</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
};

export default ProblemDescription;
