import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, ShieldCheck, Plus, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormatsText?: string;
  isProcessing?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFilesSelected,
  acceptedFormatsText = 'JPG, JPEG, PNG, WEBP',
  isProcessing = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global paste handler to allow pasting images directly from clipboard (e.g. screenshots)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      const imageFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) imageFiles.push(file);
        }
      }

      if (imageFiles.length > 0) {
        onFilesSelected(imageFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles: File[] = [];
      const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        if (acceptedTypes.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name)) {
          validFiles.push(file);
        }
      }

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      // Reset input value so re-uploading the same file works
      e.target.value = '';
    }
  };

  const triggerFileDialog = () => {
    if (!isProcessing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileInputChange}
        className="hidden"
        id="image-file-input"
        aria-label="Upload image files"
      />

      {/* Main Drag & Drop Zone */}
      <div
        id="dropzone-container"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileDialog}
        className={`relative cursor-pointer group rounded-2xl border-2 border-dashed transition-all duration-200 p-6 sm:p-10 flex flex-col items-center justify-center text-center ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/70 scale-[1.008] shadow-md'
            : 'border-blue-300/80 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/60 hover:border-blue-500 hover:bg-blue-50/30 shadow-xs'
        }`}
      >
        {/* Floating icon with animated ring */}
        <div className="relative mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:bg-blue-700 transition-all">
            {isDragOver ? (
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            ) : (
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* Primary Headline & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">
          Drop your images here
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mb-5 max-w-md">
          or tap below to browse from your device or camera
        </p>

        {/* Big Action Button */}
        <button
          id="select-images-button"
          type="button"
          disabled={isProcessing}
          onClick={(e) => {
            e.stopPropagation();
            triggerFileDialog();
          }}
          className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2.5 touch-manipulation"
        >
          <UploadCloud className="w-5 h-5" />
          <span>Select Images</span>
        </button>

        {/* Format Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">Supported formats:</span>
          {acceptedFormatsText.split(',').map((fmt) => (
            <span
              key={fmt.trim()}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[11px] shadow-2xs"
            >
              {fmt.trim()}
            </span>
          ))}
          <span className="hidden sm:inline-block text-slate-400">• Multi-select allowed</span>
        </div>
      </div>

      {/* Strict Privacy Statement Required By User Spec */}
      <div className="mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-xl border border-slate-200/70">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-center">
          <strong>Privacy Guarantee:</strong> Your images are processed locally in your browser and are not uploaded to our server.
        </span>
      </div>
    </div>
  );
};
