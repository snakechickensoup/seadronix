import { useCallback, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type VideoFormValues = {
  file?: File;
  videoUrl?: string;
};

export const useVideoInput = (form: UseFormReturn<VideoFormValues>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputId, setInputId] = useState<'url' | 'file' | null>(null);
  const { setValue } = form;

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer?.files?.[0];
      if (droppedFile) {
        setValue('file', droppedFile);
        setValue('videoUrl', '');
        setInputId('file');
      }
    },
    [setValue, setInputId]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) {
        setValue('file', selected);
        setValue('videoUrl', '');
        setInputId('file');
      }
    },
    [setValue, setInputId]
  );

  const handleUrlInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      setValue('videoUrl', url);
      if (url) {
        setValue('file', undefined);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setInputId('url');
      } else {
        setInputId(null);
      }
    },
    [setValue, setInputId, fileInputRef]
  );

  const clearFile = useCallback(() => {
    setValue('file', undefined);
    setValue('videoUrl', '');
    setInputId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    return null;
  }, [setValue, fileInputRef, setInputId]);

  return {
    fileInputRef,
    inputId,
    handleDrop,
    handleDragOver,
    handleFileInputChange,
    handleUrlInputChange,
    clearFile
  };
};
