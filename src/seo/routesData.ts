import { RouteMeta } from '../types';

export const ROUTES_DATA: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'Image to PDF Converter – Free Online JPG, PNG to PDF',
    metaDescription: 'Convert JPG, PNG and WEBP images to PDF online for free. Combine multiple images into one PDF, reorder pages and download your PDF instantly.',
    h1: 'Convert Images to PDF Online',
    subtitle: 'Free, fast and secure image to PDF conversion. Your images stay on your device and are processed locally.',
    acceptedFormatsText: 'JPG, PNG, WEBP, JPEG',
    targetFormat: 'all',
    introTitle: 'Fast, Free & Private Image to PDF Tool',
    introDescription: 'Turn your pictures, scans, photos, and digital graphics into a clean, portable PDF document in seconds. No file uploads to cloud servers, no account registration required, and no limits on file conversions.',
    faqs: [
      {
        question: 'What image formats are supported?',
        answer: 'Our converter supports JPG, JPEG, PNG, and WEBP image files. You can mix and match different formats in a single batch to combine them into one unified PDF.'
      },
      {
        question: 'Can I convert multiple images into one PDF?',
        answer: 'Yes! You can select and combine as many images as you need into a single multi-page PDF document. Each image will become an individual page in your chosen sequence.'
      },
      {
        question: 'Can I reorder images before generating the PDF?',
        answer: 'Absolutely. You can drag and drop thumbnails to reorder them on desktop, or use the touch-friendly move controls on mobile. The resulting PDF pages will follow your exact order.'
      },
      {
        question: 'Are my images uploaded to your server?',
        answer: 'No. All image processing and PDF compilation happens 100% locally inside your browser using client-side JavaScript. Your files never leave your device or reach any remote servers.'
      },
      {
        question: 'Can I use this converter on Android and iPhone?',
        answer: 'Yes, the interface is completely mobile-first and responsive. You can select photos directly from your camera roll or photo library on Android, iPhone, iPad, and desktop computers.'
      },
      {
        question: 'Is the image to PDF converter completely free?',
        answer: 'Yes, it is 100% free with no hidden paywalls, no watermark additions, and no sign-up requirements.'
      }
    ]
  },
  '/image-to-pdf': {
    path: '/image-to-pdf',
    title: 'Image to PDF Converter – Combine Photos into PDF Online',
    metaDescription: 'Turn any image into high-resolution PDF pages in your browser. Reorder pictures, configure A4 or Letter sizes, and download immediately.',
    h1: 'Image to PDF Converter',
    subtitle: 'Convert JPG, PNG and WEBP images into PDF quickly and securely without uploading to external servers.',
    acceptedFormatsText: 'JPG, PNG, WEBP',
    targetFormat: 'all',
    introTitle: 'Universal Image to PDF Conversion',
    introDescription: 'Whether you are submitting documents, preparing portfolio pages, or archiving receipts, our tool converts your image files into crisp, standardized PDF documents with zero hassle.',
    faqs: [
      {
        question: 'How do I combine mixed image types into a single PDF?',
        answer: 'Simply upload or drag all your JPG, PNG, and WEBP files at once. You can freely arrange their order and our tool handles format normalization automatically.'
      },
      {
        question: 'What page sizes can I choose?',
        answer: 'You can choose between standard A4, US Letter, or Original Image Size (which preserves your picture’s exact aspect ratio and dimensions).'
      },
      {
        question: 'Does the converter add any watermarks?',
        answer: 'No. We generate clean, watermark-free PDF files suitable for professional, educational, and personal use.'
      }
    ]
  },
  '/jpg-to-pdf': {
    path: '/jpg-to-pdf',
    title: 'JPG to PDF Converter – Free Online JPG & JPEG to PDF',
    metaDescription: 'Convert JPG and JPEG pictures into PDF documents online. Fast, high-quality client-side conversion with customizable orientation and margins.',
    h1: 'JPG to PDF Converter',
    subtitle: 'Quickly merge your JPG & JPEG photos into a clean PDF document without losing image clarity.',
    acceptedFormatsText: 'JPG, JPEG',
    targetFormat: 'jpg',
    introTitle: 'Convert JPG / JPEG Photos to PDF Instantly',
    introDescription: 'JPG is the most common photo format. Our JPG to PDF converter lets you assemble camera photos, scanned certificates, and invoices into an easy-to-share PDF document right on your device.',
    faqs: [
      {
        question: 'Are JPEG and JPG files handled the same way?',
        answer: 'Yes. Both .jpg and .jpeg files share the same compression algorithm and are seamlessly converted into high-definition PDF pages.'
      },
      {
        question: 'Can I adjust the page margins for JPG documents?',
        answer: 'Yes. You can choose None (full bleed), Small, Medium, or Large margins to frame your images perfectly.'
      },
      {
        question: 'Will image quality be preserved during conversion?',
        answer: 'Yes. You can select High or Maximum quality settings to ensure that your photographs remain sharp and legible.'
      }
    ]
  },
  '/png-to-pdf': {
    path: '/png-to-pdf',
    title: 'PNG to PDF Converter – Convert PNG Images to PDF Online',
    metaDescription: 'Convert PNG graphics, transparent logos, and screenshots into PDF documents with clean white background handling.',
    h1: 'PNG to PDF Converter',
    subtitle: 'Transform transparent PNGs and screenshots into high-definition PDF files with accurate color rendering.',
    acceptedFormatsText: 'PNG',
    targetFormat: 'png',
    introTitle: 'Crisp PNG Graphics to PDF Conversion',
    introDescription: 'PNG files often feature transparency or detailed typography. Our engine cleans up transparency by rendering it cleanly on a crisp white backdrop, preventing black box glitches in PDF readers.',
    faqs: [
      {
        question: 'How are transparent PNG backgrounds handled?',
        answer: 'Our converter renders transparent areas onto a solid, clean white background, ensuring standard PDF readers display your logos and vector graphics properly.'
      },
      {
        question: 'Can I convert screenshots into a PDF report?',
        answer: 'Yes! Upload all your desktop or mobile screenshots, reorder them sequentially, and download a single tidy report.'
      },
      {
        question: 'Is there a file size limit for PNG uploads?',
        answer: 'Because processing happens directly on your device, you are only limited by your browser’s available memory.'
      }
    ]
  },
  '/photo-to-pdf': {
    path: '/photo-to-pdf',
    title: 'Photo to PDF Converter – Turn Camera Photos into PDF',
    metaDescription: 'Convert camera photos, mobile gallery shots, and picture albums into organized PDF files directly from your smartphone or PC.',
    h1: 'Photo to PDF Converter',
    subtitle: 'Organize your mobile camera snapshots and digital photos into a portable PDF album in seconds.',
    acceptedFormatsText: 'Camera Photos (JPG, PNG, WEBP)',
    targetFormat: 'photo',
    introTitle: 'Turn Smartphone Photos into Documents',
    introDescription: 'Take snapshots of notes, whiteboards, assignment pages, or holiday memories and convert them directly into an easily viewable PDF with one click.',
    faqs: [
      {
        question: 'Can I take photos directly from my phone camera and convert them?',
        answer: 'Yes! On Android and iOS, tapping "Select Images" allows you to open your camera or photo gallery directly.'
      },
      {
        question: 'Can I rotate photos that were taken sideways?',
        answer: 'Yes. Each image preview card includes a rotation button so you can orient your photos correctly before compiling.'
      },
      {
        question: 'Does auto-orientation work with portrait and landscape photos?',
        answer: 'Yes! When Auto Orientation is selected, each page automatically adjusts its orientation to match the orientation of the photo on that page.'
      }
    ]
  },
  '/images-to-pdf': {
    path: '/images-to-pdf',
    title: 'Images to PDF Converter – Batch Convert Multiple Images',
    metaDescription: 'Batch convert dozens of images into a single consolidated PDF document. Fast client-side bulk processing with page reordering.',
    h1: 'Batch Images to PDF Converter',
    subtitle: 'Merge bulk photo collections into an organized multi-page document with zero server delay.',
    acceptedFormatsText: 'JPG, JPEG, PNG, WEBP',
    targetFormat: 'all',
    introTitle: 'Bulk Image Conversion Without Limits',
    introDescription: 'Quickly organize large batches of images into a unified PDF file. Reorder pages with ease, fine-tune paper settings, and download your finished document instantly.',
    faqs: [
      {
        question: 'Is there a limit on how many images I can convert at once?',
        answer: 'You can convert dozens of images in one go. For massive batches (e.g. 50+ high-res images), we recommend processing in smaller sets for optimal browser speed.'
      },
      {
        question: 'Can I name the output PDF file?',
        answer: 'Yes! You can type any custom filename in the settings panel before generating your PDF.'
      }
    ]
  }
};

export function getRouteMeta(pathname: string): RouteMeta {
  const normalized = pathname.toLowerCase().replace(/\/$/, '') || '/';
  return ROUTES_DATA[normalized] || ROUTES_DATA['/'];
}
