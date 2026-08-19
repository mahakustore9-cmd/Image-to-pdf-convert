import { ImageFileItem } from '../types';

/**
 * Reads a File object and extracts its preview URL and pixel dimensions
 */
export async function processSelectedFile(file: File): Promise<ImageFileItem> {
  const previewUrl = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      const aspectRatio = height > 0 ? width / height : 1;

      resolve({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl,
        width,
        height,
        aspectRatio,
        rotation: 0,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error(`Failed to load image "${file.name}". The file may be corrupted.`));
    };

    img.src = previewUrl;
  });
}

/**
 * Renders an image into a canvas with rotation, optional background fill for transparent PNGs,
 * and exports as JPEG/PNG base64 data URL according to quality settings.
 */
export async function prepareImageCanvas(
  item: ImageFileItem,
  quality: 'standard' | 'high' | 'maximum'
): Promise<{ dataUrl: string; width: number; height: number; format: 'JPEG' | 'PNG' }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const isRotated90or270 = item.rotation % 180 !== 0;
        const sourceWidth = img.naturalWidth || img.width;
        const sourceHeight = img.naturalHeight || img.height;

        const targetWidth = isRotated90or270 ? sourceHeight : sourceWidth;
        const targetHeight = isRotated90or270 ? sourceWidth : sourceHeight;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        // Fill background with solid white to eliminate dark/black artifacts from transparent PNGs in PDF
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Apply rotation around center
        ctx.save();
        ctx.translate(targetWidth / 2, targetHeight / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.drawImage(img, -sourceWidth / 2, -sourceHeight / 2);
        ctx.restore();

        let qualityFactor = 0.85;
        if (quality === 'high') qualityFactor = 0.94;
        if (quality === 'maximum') qualityFactor = 0.98;

        const dataUrl = canvas.toDataURL('image/jpeg', qualityFactor);
        resolve({
          dataUrl,
          width: targetWidth,
          height: targetHeight,
          format: 'JPEG',
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to process image "${item.name}" for PDF rendering.`));
    };

    img.src = item.previewUrl;
  });
}
