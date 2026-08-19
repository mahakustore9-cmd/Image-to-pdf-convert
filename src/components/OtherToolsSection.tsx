import React from 'react';
import {
  FileImage,
  FileType2,
  Camera,
  Layers,
  FileCode,
  Minimize2,
  FileArchive,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface OtherToolsSectionProps {
  onNavigate: (path: string) => void;
}

interface ToolCardItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'coming_soon';
  path?: string;
}

export const OtherToolsSection: React.FC<OtherToolsSectionProps> = ({ onNavigate }) => {
  const tools: ToolCardItem[] = [
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      description: 'Convert JPG / JPEG photos into portable, high-definition PDF pages.',
      icon: <FileType2 className="w-5 h-5 text-blue-600" />,
      status: 'active',
      path: '/jpg-to-pdf',
    },
    {
      id: 'png-to-pdf',
      name: 'PNG to PDF',
      description: 'Transform PNG graphics and logos into crisp, clean white-background PDFs.',
      icon: <FileImage className="w-5 h-5 text-indigo-600" />,
      status: 'active',
      path: '/png-to-pdf',
    },
    {
      id: 'photo-to-pdf',
      name: 'Photo to PDF',
      description: 'Turn camera roll snapshots and mobile document scans into one PDF.',
      icon: <Camera className="w-5 h-5 text-sky-600" />,
      status: 'active',
      path: '/photo-to-pdf',
    },
    {
      id: 'images-to-pdf',
      name: 'Batch Images to PDF',
      description: 'Merge multiple mixed-format picture collections into one organized PDF.',
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      status: 'active',
      path: '/images-to-pdf',
    },
    {
      id: 'pdf-to-jpg',
      name: 'PDF to JPG',
      description: 'Extract and convert PDF pages into high-resolution JPG images.',
      icon: <FileCode className="w-5 h-5 text-slate-400" />,
      status: 'coming_soon',
    },
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Reduce image file size while keeping high visual quality.',
      icon: <Minimize2 className="w-5 h-5 text-slate-400" />,
      status: 'coming_soon',
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Shrink large PDF documents for quick email sending and sharing.',
      icon: <FileArchive className="w-5 h-5 text-slate-400" />,
      status: 'coming_soon',
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple existing PDF files into a single unified document.',
      icon: <Layers className="w-5 h-5 text-slate-400" />,
      status: 'coming_soon',
    },
  ];

  return (
    <section className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Tool Suite
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Other Free Document & Image Tools
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Discover our growing family of fast, privacy-friendly online utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const isActive = tool.status === 'active';

          return (
            <div
              key={tool.id}
              onClick={() => {
                if (isActive && tool.path) {
                  onNavigate(tool.path);
                }
              }}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer group'
                  : 'bg-slate-50/70 border-slate-200/60 opacity-80 cursor-default'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-blue-50/80 border border-blue-100' : 'bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {tool.icon}
                  </div>
                  {isActive ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200/70 text-slate-600 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3
                  className={`text-base font-bold mb-1 ${
                    isActive ? 'text-slate-900 group-hover:text-blue-600 transition-colors' : 'text-slate-700'
                  }`}
                >
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                {isActive ? (
                  <span className="text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Use Tool <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-slate-400">In Development</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
