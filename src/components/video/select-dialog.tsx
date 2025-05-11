import { useRef } from 'react';
import { Upload, Link, Video } from 'lucide-react';
import { DndContext } from '@dnd-kit/core';
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
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const SelectVideoDialog = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
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
        <DndContext>
          <div className='space-y-4 rounded-md border-2 border-dashed p-8 text-center'>
            <input type='file' ref={fileInputRef} accept='video/*' className='hidden' />
            <div className='flex flex-col items-center space-y-4'>
              <Upload className='text-muted-foreground' size='40' />
              <div className='space-y-2'>
                <p className='text-sm font-medium'>여기에 파일을 끌어다 놓거나</p>
                <Button variant='outline'>파일 선택</Button>
              </div>
              <p className='text-muted-foreground text-xs'>
                영상 파일만 업로드할 수 있습니다. (최대 100MB)
              </p>
            </div>
          </div>
        </DndContext>

        <div className='flex items-center'>
          <Separator className='flex-1' />
          <span className='text-muted-foreground px-4 text-sm'>또는</span>
          <Separator className='flex-1' />
        </div>

        <form className='space-y-2'>
          <Label htmlFor='video-url' className='flex items-center gap-2'>
            <Link className='h-4 w-4' />
            비디오 URL
          </Label>
          <div className='flex gap-2'>
            <Input id='video-url' placeholder='https://example.com/video.mp4' className='flex-1' />
          </div>
        </form>
        <DialogFooter>
          <Button className='px-8' disabled>
            업로드
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectVideoDialog;
