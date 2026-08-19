import { jsPDF } from 'jspdf';
import { ImageFileItem, PdfSettings } from '../types';
import { prepareImageCanvas } from './imageProcessor';

export interface GeneratePdfProgressCallback {
  (currentStep: number, totalSteps: number, currentFileName: string, percentage: number): void;
}

export async function generatePdfFromImages(
  images: ImageFileItem[],
  settings: PdfSettings,
  onProgress?: GeneratePdfProgressCallback
): Promise<{ blob: Blob; url: string; size: number; pageCount: number }> {
  if (!images || images.length === 0) {
    throw new Error('No images selected. Please choose at least one image.');
  }

  const totalSteps = images.length;
  let pdf: jsPDF | null = null;

  for (let i = 0; i < images.length; i++) {
    const item = images[i];

    if (onProgress) {
      const percentage = Math.round(((i + 0.1) / totalSteps) * 100);
      onProgress(i + 1, totalSteps, item.name, percentage);
    }

    // Yield control to UI thread for smooth rendering and progress animation
    await new Promise((resolve) => setTimeout(resolve, 15));

    // Prepare rotated & transparent-proof canvas data URL
    const processed = await prepareImageCanvas(item, settings.imageQuality);

    // Determine dimensions and orientation for this page
    let isLandscape = false;
    if (settings.orientation === 'landscape') {
      isLandscape = true;
    } else if (settings.orientation === 'portrait') {
      isLandscape = false;
    } else {
      // Auto: based on image dimensions
      isLandscape = processed.width > processed.height;
    }

    let pageWidth = 595.28; // Standard A4 in points
    let pageHeight = 841.89;

    if (settings.pageSize === 'letter') {
      pageWidth = isLandscape ? 792 : 612;
      pageHeight = isLandscape ? 612 : 792;
    } else if (settings.pageSize === 'a4') {
      pageWidth = isLandscape ? 841.89 : 595.28;
      pageHeight = isLandscape ? 595.28 : 841.89;
    } else if (settings.pageSize === 'original') {
      // Original size: scale high-res pixels down to reasonable points (e.g. 72 DPI or 96 DPI points)
      // To keep it standard 72 pt/inch: 1 pixel ~ 0.75 pt
      const scaleFactor = 0.75;
      pageWidth = Math.max(100, processed.width * scaleFactor);
      pageHeight = Math.max(100, processed.height * scaleFactor);
    }

    // Determine margin in points
    let marginPt = 0;
    if (settings.margin === 'small') {
      marginPt = Math.min(pageWidth, pageHeight) * 0.035; // ~20pt
    } else if (settings.margin === 'medium') {
      marginPt = Math.min(pageWidth, pageHeight) * 0.065; // ~36pt
    } else if (settings.margin === 'large') {
      marginPt = Math.min(pageWidth, pageHeight) * 0.1; // ~54pt
    }

    const printableWidth = pageWidth - marginPt * 2;
    const printableHeight = pageHeight - marginPt * 2;

    // Calculate image placement within the page
    let drawWidth = printableWidth;
    let drawHeight = printableHeight;
    let drawX = marginPt;
    let drawY = marginPt;

    const imgAspect = processed.width / processed.height;
    const printableAspect = printableWidth / printableHeight;

    if (settings.imageFit === 'fit') {
      if (imgAspect > printableAspect) {
        // Image is wider than printable area
        drawWidth = printableWidth;
        drawHeight = printableWidth / imgAspect;
        drawX = marginPt;
        drawY = marginPt + (printableHeight - drawHeight) / 2;
      } else {
        // Image is taller than printable area
        drawHeight = printableHeight;
        drawWidth = printableHeight * imgAspect;
        drawX = marginPt + (printableWidth - drawWidth) / 2;
        drawY = marginPt;
      }
    } else {
      // Fill: stretch or cover printable area
      drawWidth = printableWidth;
      drawHeight = printableHeight;
      drawX = marginPt;
      drawY = marginPt;
    }

    // Initialize or add page to jsPDF instance
    if (i === 0) {
      pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'pt',
        format: settings.pageSize === 'original' ? [pageWidth, pageHeight] : (settings.pageSize === 'letter' ? 'letter' : 'a4'),
        compress: true,
      });
      // Override default page size for custom original sizing
      if (settings.pageSize === 'original') {
        pdf.deletePage(1);
        pdf.addPage([pageWidth, pageHeight], isLandscape ? 'landscape' : 'portrait');
      }
    } else if (pdf) {
      if (settings.pageSize === 'original') {
        pdf.addPage([pageWidth, pageHeight], isLandscape ? 'landscape' : 'portrait');
      } else {
        pdf.addPage(settings.pageSize === 'letter' ? 'letter' : 'a4', isLandscape ? 'landscape' : 'portrait');
      }
    }

    if (pdf) {
      pdf.addImage(
        processed.dataUrl,
        processed.format,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
        undefined,
        'FAST'
      );
    }

    if (onProgress) {
      const stepFinishedPercentage = Math.round(((i + 1) / totalSteps) * 100);
      onProgress(i + 1, totalSteps, item.name, stepFinishedPercentage);
    }
  }

  if (!pdf) {
    throw new Error('PDF generation encountered an unexpected error.');
  }

  // Generate output blob
  const pdfBlob = pdf.output('blob');
  const url = URL.createObjectURL(pdfBlob);

  return {
    blob: pdfBlob,
    url,
    size: pdfBlob.size,
    pageCount: images.length,
  };
}
