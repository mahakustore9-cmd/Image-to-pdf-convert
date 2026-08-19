export type SupportedImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export type PageSizeOption = 'a4' | 'letter' | 'original';
export type OrientationOption = 'portrait' | 'landscape' | 'auto';
export type MarginOption = 'none' | 'small' | 'medium' | 'large';
export type ImageFitOption = 'fit' | 'fill';
export type ImageQualityOption = 'standard' | 'high' | 'maximum';

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  width: number;
  height: number;
  aspectRatio: number;
  rotation: number; // 0, 90, 180, 270
}

export interface PdfSettings {
  pageSize: PageSizeOption;
  orientation: OrientationOption;
  margin: MarginOption;
  imageFit: ImageFitOption;
  imageQuality: ImageQualityOption;
  filename: string;
}

export type ConversionStatus = 'idle' | 'processing' | 'success' | 'error';

export interface ConversionState {
  status: ConversionStatus;
  progressPercentage: number;
  currentStep: number;
  totalSteps: number;
  currentFileName: string;
  pdfBlob: Blob | null;
  pdfBlobUrl: string | null;
  pdfFileSize: number;
  pageCount: number;
  errorMessage: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RouteMeta {
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  acceptedFormatsText: string;
  targetFormat?: 'all' | 'jpg' | 'png' | 'photo';
  faqs: FaqItem[];
  introTitle: string;
  introDescription: string;
}
