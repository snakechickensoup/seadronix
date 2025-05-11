import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import {
  AccordionTrigger,
  Accordion,
  AccordionItem,
  AccordionContent
} from '../ui/accordion';

const formSchema = z.object({
  input: z.string().min(1, {
    message: '테스트 케이스 값을 입력하세요.'
  })
});

interface FibonacciFormProps {
  handleInput: (input: string) => void;
}

const FibonacciForm = (props: FibonacciFormProps) => {
  const { handleInput } = props;
  const [isCollapsed, setIsCollapsed] = useState('item-2');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: ''
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      handleInput(values.input.trim());
    } catch (error) {
      form.setError('input', { message: (error as Error).message });
    }
  }

  const handleAccordionChange = () => {
    setIsCollapsed((prev) => (prev === 'item-2' ? '' : 'item-2'));
  };
  return (
    <Accordion
      type='single'
      collapsible
      value={isCollapsed}
      onValueChange={handleAccordionChange}
    >
      <AccordionItem value='item-2'>
        <Card>
          <CardHeader>
            <AccordionTrigger className='p-0'>
              <CardTitle className='text-sm'>입력</CardTitle>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='flex flex-col items-end space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='input'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormDescription className='mb-2 text-xs opacity-80'>
                          첫째 줄에 테스트 케이스의 개수를 입력합니다. <br />
                          둘째 줄부터 테스트 케이스를 입력합니다. (40보다 작거나
                          같은 자연수 또는 0)
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder={`예시)
3
10
24
39 `}
                            className='min-h-32 resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    variant='ghost'
                    className='hover:cursor-pointer'
                  >
                    계산하기
                  </Button>
                </form>
              </Form>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default FibonacciForm;
