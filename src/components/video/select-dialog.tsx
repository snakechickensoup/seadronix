import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Link, Video, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useVideoInput } from '@/hooks/useVideoInput';

const formSchema = z
  .object({
    videoUrl: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
    file: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= 100 * 1024 * 1024, {
        message: '파일 크기는 100MB를 초과할 수 없습니다.'
      })
      .refine((file) => !file || file.type.startsWith('video/'), {
        message: '영상 파일만 업로드할 수 있습니다.'
      })
  })
  .refine((data) => data.videoUrl || data.file, {
    message: '파일을 선택하거나 URL을 입력하세요',
    path: ['file']
  });

type FormValues = z.infer<typeof formSchema>;

interface SelectVideoDialogProps {
  onFileSelect: (file: File | string) => void;
}

const SelectVideoDialog = (props: SelectVideoDialogProps) => {
  const { onFileSelect } = props;
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: '',
      file: undefined
    }
  });
  const {
    fileInputRef,
    inputId,
    handleDrop,
    handleDragOver,
    handleFileInputChange,
    handleUrlInputChange,
    clearFile,
    resetInputId
  } = useVideoInput(form);

  const fileValue = form.watch('file');
  const videoUrlValue = form.watch('videoUrl');

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onFileSelect(values.file || values.videoUrl || '');
    setOpen(false);
    form.reset();
    resetInputId();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(prev) => {
        setOpen(prev);
        if (!prev) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2' variant='outline'>
          <Video />
          영상 선택
        </Button>
      </DialogTrigger>
      <DialogContent className='w-md'>
        <DialogHeader>
          <DialogTitle className='text-sm'>영상 선택</DialogTitle>
          <DialogDescription className='text-xs'>
            파일을 선택하거나 URL을 입력하세요
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-2' onSubmit={form.handleSubmit(handleSubmit)}>
            <div
              className={`space-y-4 rounded-md border-2 border-dashed p-8 text-center ${
                inputId === 'url' ? 'pointer-events-none opacity-50' : ''
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <FormField
                control={form.control}
                name='file'
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type='file'
                        accept='video/*'
                        className='hidden'
                        name={name}
                        onBlur={onBlur}
                        ref={(el) => {
                          fileInputRef.current = el;
                          ref(el);
                        }}
                        onChange={(e) => {
                          handleFileInputChange(e);
                          onChange(e.target.files?.[0]);
                        }}
                        disabled={inputId === 'url'}
                      />
                    </FormControl>
                    <div className='flex flex-col items-center space-y-4'>
                      <Upload className='text-muted-foreground' size='40' />
                      <div className='space-y-2'>
                        {fileValue ? (
                          <div className='flex items-center justify-center gap-2'>
                            <p className='max-w-xs truncate text-sm font-medium'>
                              {fileValue.name}
                            </p>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 rounded-full p-0'
                              onClick={clearFile}
                              disabled={inputId === 'url'}
                            >
                              <X className='h-4 w-4' />
                            </Button>
                          </div>
                        ) : (
                          <p className='text-sm font-medium'>여기에 파일을 끌어다 놓거나</p>
                        )}
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => fileInputRef.current?.click()}
                          disabled={inputId === 'url'}
                        >
                          파일 선택
                        </Button>
                      </div>
                      <p className='text-muted-foreground text-xs'>
                        영상 파일만 업로드할 수 있습니다. (최대 100MB)
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex items-center'>
              <Separator className='flex-1' />
              <span className='text-muted-foreground px-4 text-sm'>또는</span>
              <Separator className='flex-1' />
            </div>

            <FormField
              control={form.control}
              name='videoUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='video-url' className='flex items-center gap-2'>
                    <Link className='h-4 w-4' />
                    비디오 URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      id='video-url'
                      placeholder='https://example.com/video.mp4'
                      className='flex-1'
                      {...field}
                      disabled={inputId === 'file'}
                      onChange={handleUrlInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                className='px-8'
                disabled={
                  !form.formState.isValid ||
                  (inputId === 'url' && !videoUrlValue) ||
                  (inputId === 'file' && !fileValue)
                }
              >
                업로드
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectVideoDialog;
