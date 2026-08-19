import React from 'react';
import { ImageFileItem } from '../types';
import { formatBytes } from '../utils/formatters';
import { Trash2, RotateCw, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

interface ImageCardProps {
  item: ImageFileItem;
  index: number;
  total: number;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  isDragging?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  item,
  index,
  total,
  onRemove,
  onRotate,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging = false,
}) => {
  return (
    <div
      id={`image-card-${item.id}`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`group relative bg-white rounded-xl border transition-all duration-150 flex flex-col overflow-hidden shadow-xs hover:shadow-md ${
        isDragging
          ? 'opacity-40 border-blue-500 scale-95 ring-2 ring-blue-400'
          : 'border-slate-200 hover:border-blue-300'
      }`}
    >
      {/* Top Header with Page Badge & Action Buttons */}
      <div className="p-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div
            className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60"
            title="Drag to reorder"
            aria-label="Drag handle"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            Page {index + 1}
          </span>
        </div>

        {/* Mobile Reorder Arrows + Rotate + Delete */}
        <div className="flex items-center gap-1">
          {/* Move Up / Left */}
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            className="p-1 rounded-md text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Move earlier"
            aria-label="Move page up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Move Down / Right */}
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMoveDown(index)}
            className="p-1 rounded-md text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Move later"
            aria-label="Move page down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Rotate 90 deg */}
          <button
            type="button"
            onClick={() => onRotate(item.id)}
            className="p-1 rounded-md text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            title="Rotate 90° clockwise"
            aria-label="Rotate image"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Delete Image */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Remove image"
            aria-label="Delete image"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Thumbnail Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100/80 flex items-center justify-center p-2 overflow-hidden select-none">
        <img
          src={item.previewUrl}
          alt={item.name}
          className="max-h-full max-w-full object-contain rounded-sm transition-transform duration-200 shadow-2xs"
          style={{ transform: `rotate(${item.rotation}deg)` }}
          loading="lazy"
        />

        {item.rotation > 0 && (
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-sm">
            {item.rotation}°
          </span>
        )}
      </div>

      {/* Image Details Footer */}
      <div className="p-2.5 text-left flex flex-col gap-0.5 bg-white">
        <p className="text-xs font-semibold text-slate-800 truncate" title={item.name}>
          {item.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{formatBytes(item.size)}</span>
          <span className="font-mono">
            {item.width} × {item.height} px
          </span>
        </div>
      </div>
    </div>
  );
};
