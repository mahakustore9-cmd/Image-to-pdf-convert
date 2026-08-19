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
- **Complete Adsterra & Monetization Suite**: Built-in slots for Top Banner, Middle Native Ad, High-CTR Result Ad (below download button), Sticky Bottom Floating Mobile Banner, Desktop Sidebars, and Social Bar / Popunder scripts. All slots safely collapse when unconfigured.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** (Lightning-fast build tool)
- **Tailwind CSS v4**
- **jsPDF** (Standard client-side PDF generation)
- **Lucide Icons**
- **Canvas-Confetti**

---

## ⚙️ Monetization & Ad Slots Configuration

Create a `.env` file in the root directory (or use `.env.example` as a template):

```env
# 1. Top Banner Ad (728x90 or 320x50 banner placed above converter)
VITE_ADSTERRA_BANNER_CODE=""

# 2. Native Feed Ad (Widget placed mid-page between converter and SEO guide)
VITE_ADSTERRA_NATIVE_CODE=""

# 3. Post-Conversion Result Ad (High-CTR ad shown inside PDF Ready / Download screen)
VITE_ADSTERRA_RESULT_CODE=""

# 4. Sticky Bottom Banner (Floating anchor bar on mobile & desktop with close button)
VITE_ADSTERRA_STICKY_BOTTOM_CODE=""

# 5. Desktop Skyscraper Sidebars (160x600 floating ads on ultra-wide desktop screens)
VITE_ADSTERRA_SIDEBAR_CODE=""

# 6. Adsterra Social Bar Script (High-performing push/bar format)
VITE_ADSTERRA_SOCIAL_BAR_CODE=""

# 7. Adsterra Popunder Script (Background tab monetization)
VITE_ADSTERRA_POPUNDER_CODE=""
```

*Note: All ad slots are completely optional. If any variable is left blank, the app operates cleanly with zero errors or empty boxes.*

---

## 🚀 Deploying to Vercel

1. Push this project to your GitHub, GitLab, or Bitbucket repository.
2. Log into **Vercel** and click **"Add New Project"**.
3. Import your repository.
4. Verify the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add your desired Adsterra environment variables under **Project Settings -> Environment Variables**.
6. Click **"Deploy"**.

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
