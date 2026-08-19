# Image to PDF Converter 🚀

A fast, privacy-focused, and mobile-first **Image to PDF Converter** web application. It converts JPG, JPEG, PNG, and WEBP images into high-quality PDF documents entirely inside the user's browser without uploading any files to external servers.

---

## ✨ Features

- **100% Client-Side Privacy**: Zero cloud uploads. Images are processed directly within the browser's local sandbox using Web APIs.
- **Multi-Format Support**: Seamlessly combine JPG, JPEG, PNG, and WEBP pictures into a single multi-page PDF.
- **Visual Reordering**: Drag-and-drop cards or use one-tap touch controls to arrange PDF page order.
- **Full Customization**:
  - **Page Size**: A4, US Letter, Original Image Size
  - **Orientation**: Auto (smart per-page detection), Portrait, Landscape
  - **Margins**: None, Small, Medium, Large
  - **Image Fit**: Fit (preserve aspect ratio) or Fill (stretch/cover)
  - **Quality**: Standard, High, Maximum
  - **Custom Filename**: Configurable PDF file names
- **Mobile First**: Built with responsive layout, large tap targets, and touch-friendly controls.
- **SEO & Social Metadata**: Dedicated SEO routes (`/`, `/image-to-pdf`, `/jpg-to-pdf`, `/png-to-pdf`, `/photo-to-pdf`, `/images-to-pdf`), OpenGraph, Twitter tags, `sitemap.xml`, `robots.txt`, and JSON-LD structured data.
- **Adsterra Ready**: Built-in responsive ad slots (`AdBanner`, `AdNative`, `AdFooter`) with zero layout shifts or errors when keys are not configured.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** (Lightning-fast build tool)
- **Tailwind CSS v4**
- **jsPDF** (Standard client-side PDF generation)
- **Lucide Icons**
- **Canvas-Confetti**

---

## 🚀 Deploying to Vercel

This repository is pre-configured and ready for one-click deployment on [Vercel](https://vercel.com).

### Step-by-Step Vercel Deployment:

1. Push this project to your GitHub, GitLab, or Bitbucket repository.
2. Log into **Vercel** and click **"Add New Project"**.
3. Import your repository.
4. Verify the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. *(Optional)* Add Environment Variables in the Vercel Dashboard:
   - `VITE_ADSTERRA_BANNER_CODE`: Your Adsterra banner script/code (optional)
   - `VITE_ADSTERRA_NATIVE_CODE`: Your Adsterra native script/code (optional)
6. Click **"Deploy"**.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or use `.env.example` as a template):

```env
# Optional Adsterra integration (Leave blank if not using ads)
VITE_ADSTERRA_BANNER_CODE=""
VITE_ADSTERRA_NATIVE_CODE=""
```

*Note: If no Adsterra variables are configured, ad components cleanly collapse with zero errors, broken frames, or empty spaces.*

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

MIT License. Free for commercial and personal use.
