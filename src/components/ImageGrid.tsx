import React, { useState, useRef } from 'react';
import { ImageFileItem } from '../types';
import { ImageCard } from './ImageCard';
import { formatBytes } from '../utils/formatters';
import { Plus, Trash, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

interface ImageGridProps {
  images: ImageFileItem[];
  onImagesChange: (newImages: ImageFileItem[]) => void;
  onAddMoreFiles: (files: File[]) => void;
  onClearAll: () => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImagesChange,
  onAddMoreFiles,
  onClearAll,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const addFileInputRef = useRef<HTMLInputElement>(null);

  const totalBytes = images.reduce((acc, curr) => acc + curr.size, 0);

  const handleRemove = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  const handleRotate = (id: string) => {
    onImagesChange(
      images.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onImagesChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= images.length - 1) return;
    const updated = [...images];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onImagesChange(updated);
  };

  const handleDragStart = (_e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...images];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    onImagesChange(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddMoreFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden file input for Add More */}
      <input
        ref={addFileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleAddFileInputChange}
        className="hidden"
      />

      {/* Header bar with count and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm sm:text-base">
            {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-medium">Total {formatBytes(totalBytes)}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Add More Button */}
          <button
            type="button"
            onClick={() => addFileInputRef.current?.click()}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg border border-blue-200 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add More</span>
          </button>

          {/* Clear All Button */}
          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-1.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-700 font-medium text-xs rounded-lg border border-slate-200 hover:border-red-200 flex items-center gap-1.5 transition-colors"
          >
            <Trash className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Reorder hint for users */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
          <span>Drag cards or use arrows to rearrange PDF page sequence.</span>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {images.map((item, index) => (
          <ImageCard
            key={item.id}
            item={item}
            index={index}
            total={images.length}
            onRemove={handleRemove}
            onRotate={handleRotate}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            isDragging={draggedIndex === index}
          />
        ))}

        {/* Add More Tile */}
        <button
          type="button"
          onClick={() => addFileInputRef.current?.click()}
          className="aspect-4/3 min-h-[140px] rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/40 text-slate-500 hover:text-blue-700 flex flex-col items-center justify-center gap-2 transition-all group"
        >
          <div className="w-9 h-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-300 flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-2xs">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold">Add More</span>
        </button>
      </div>
    </div>
  );
};
